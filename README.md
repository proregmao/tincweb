# Tincweb

Simple web management system for Tinc VPN.

## Setup

```bash
cd server
npm install # install dependencies (requires network access)
node scripts/init-db.js # initialize the SQLite database
npm start
```

## Agent

Run the Python agent to report status to the server:

```bash
python3 agent/agent.py
```

