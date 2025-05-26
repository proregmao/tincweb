# Tincweb

Prototype of a Tinc VPN management system.

## Server

Install dependencies and start the Node.js server:

```bash
cd server
npm install
node scripts/init-db.js    # create the SQLite database
npm start
```

The default `admin` user with password `admin` will be created during DB initialization.

## Agent

Run the Python agent to report status to the server:

```bash
python3 agent/agent.py
```
