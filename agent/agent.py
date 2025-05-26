import requests
import psutil
import json
import time
import uuid
import os

SERVER_URL = os.getenv('SERVER_URL', 'http://localhost:3000')
TOKEN = os.getenv('AGENT_TOKEN', '')
CLIENT_ID = os.getenv('CLIENT_ID', '1')

headers = {'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json'}

def get_status():
    return {
        'mac': ':'.join(['%02x' % ((uuid.getnode() >> ele) & 0xff) for ele in range(0,8*6,8)][::-1]),
        'ip': requests.get('https://api.ipify.org').text if SERVER_URL.startswith('http') else '0.0.0.0',
        'loadavg': os.getloadavg(),
    }

def main():
    while True:
        try:
            status = get_status()
            requests.post(f'{SERVER_URL}/api/clients/ping', headers=headers, data=json.dumps({'client_id': CLIENT_ID, **status}))
            resp = requests.get(f'{SERVER_URL}/api/clients/config/{CLIENT_ID}', headers=headers)
            if resp.status_code == 200:
                print('config fetched')
        except Exception as e:
            print('agent error', e)
        time.sleep(60)

if __name__ == '__main__':
    main()
