import json
import sqlite3
import hashlib
import time
import base64
from wsgiref.simple_server import make_server

DB_PATH = 'tincweb/server/db.sqlite3'
SECRET = 'secret'


def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password_hash TEXT, role TEXT, created_at TEXT)')
    c.execute('CREATE TABLE IF NOT EXISTS client_status (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, wan_ip TEXT, lan_ip TEXT, last_seen TEXT)')
    conn.commit()
    c.execute('SELECT id FROM users WHERE username=?', ('admin',))
    if not c.fetchone():
        pwd = hashlib.sha256('admin'.encode()).hexdigest()
        c.execute('INSERT INTO users (username, password_hash, role, created_at) VALUES (?,?,?,?)',
                  ('admin', pwd, 'admin', time.strftime('%Y-%m-%d %H:%M:%S')))
        conn.commit()
    conn.close()


def generate_token(username):
    payload = json.dumps({'username': username, 'exp': time.time() + 3600})
    return base64.urlsafe_b64encode(payload.encode()).decode()


def verify_token(token):
    try:
        payload = json.loads(base64.urlsafe_b64decode(token.encode()).decode())
        if payload['exp'] < time.time():
            return None
        return payload['username']
    except Exception:
        return None


def read_body(environ):
    size = int(environ.get('CONTENT_LENGTH') or 0)
    if size:
        return environ['wsgi.input'].read(size).decode()
    return ''


def handle_login(environ, start_response):
    data = json.loads(read_body(environ) or '{}')
    username = data.get('username')
    password = data.get('password')
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT password_hash FROM users WHERE username=?', (username,))
    row = c.fetchone()
    conn.close()
    if row and row[0] == hashlib.sha256(password.encode()).hexdigest():
        token = generate_token(username)
        start_response('200 OK', [('Content-Type', 'application/json')])
        return [json.dumps({'token': token}).encode()]
    else:
        start_response('401 Unauthorized', [('Content-Type', 'application/json')])
        return [b'{}']


def handle_users(environ, start_response):
    token = environ.get('HTTP_AUTHORIZATION', '').replace('Bearer ', '')
    username = verify_token(token)
    if not username:
        start_response('401 Unauthorized', [('Content-Type', 'application/json')])
        return [b'{}']
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT id, username, role, created_at FROM users')
    users = [{'id': row[0], 'username': row[1], 'role': row[2], 'created_at': row[3]} for row in c.fetchall()]
    conn.close()
    start_response('200 OK', [('Content-Type', 'application/json')])
    return [json.dumps(users).encode()]


def handle_report(environ, start_response):
    token = environ.get('HTTP_AUTHORIZATION', '').replace('Bearer ', '')
    username = verify_token(token)
    if not username:
        start_response('401 Unauthorized', [('Content-Type', 'application/json')])
        return [b'{}']
    data = json.loads(read_body(environ) or '{}')
    wan_ip = data.get('wan_ip', '')
    lan_ip = data.get('lan_ip', '')
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('INSERT INTO client_status(username, wan_ip, lan_ip, last_seen) VALUES (?,?,?,?)',
              (username, wan_ip, lan_ip, time.strftime('%Y-%m-%d %H:%M:%S')))
    conn.commit()
    conn.close()
    start_response('200 OK', [('Content-Type', 'application/json')])
    return [b'{}']


def application(environ, start_response):
    path = environ['PATH_INFO']
    method = environ['REQUEST_METHOD']
    if path == '/api/login' and method == 'POST':
        return handle_login(environ, start_response)
    elif path == '/api/users' and method == 'GET':
        return handle_users(environ, start_response)
    elif path == '/api/report' and method == 'POST':
        return handle_report(environ, start_response)
    else:
        start_response('404 Not Found', [('Content-Type', 'text/plain')])
        return [b'Not Found']


if __name__ == '__main__':
    init_db()
    with make_server('', 8000, application) as httpd:
        print('Serving on port 8000')
        httpd.serve_forever()
