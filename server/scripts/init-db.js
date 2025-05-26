import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./tincweb.db');

const sql = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS servers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    host TEXT,
    port INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    private_ip TEXT,
    mac TEXT,
    public_key TEXT,
    private_key TEXT,
    status TEXT DEFAULT 'inactive',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS config_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS client_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    ip TEXT,
    loadavg TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

db.exec(sql, (err) => {
  if (err) throw err;
  db.get("SELECT id FROM users WHERE username='admin'", (err2, row) => {
    if (err2) throw err2;
    if (!row) {
      db.run("INSERT INTO users (username, password, role) VALUES ('admin', '$2b$10$g9Ggq.xwq8fErM5LBQQxneMAu30mZ4fcK/R713N4QeZyjdrg0dpWm', 'admin')");
      console.log('Created default admin user');
    }
    console.log('✅ 数据库初始化完成');
    db.close();
  });
});
