import requests
import json

SERVER_URL = 'http://localhost:8000'


def get_token(username, password):
    resp = requests.post(f'{SERVER_URL}/api/login', json={'username': username, 'password': password})
    resp.raise_for_status()
    return resp.json()['token']


def report_status(token, wan_ip, lan_ip):
    headers = {'Authorization': f'Bearer {token}'}
    data = {'wan_ip': wan_ip, 'lan_ip': lan_ip}
    resp = requests.post(f'{SERVER_URL}/api/report', json=data, headers=headers)
    resp.raise_for_status()
    return resp.status_code


if __name__ == '__main__':
    token = get_token('admin', 'admin')
    code = report_status(token, '1.2.3.4', '192.168.0.2')
    print('report status code', code)
