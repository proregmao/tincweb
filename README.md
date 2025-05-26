# Tincweb

Minimal prototype of the Tinc VPN management system.

## Server

Install dependencies and start the Node.js backend:

```bash
cd server
npm install
npm run start
```

This will start the API server on port 3000. The SQLite database `tincweb.db` will
be created automatically. You can initialize the schema manually with:

```bash
node scripts/init-db.js
```

## Agent

Run the Python agent to report status to the server:

```bash
python3 agent/agent.py
```

Set `SERVER_URL`, `AGENT_TOKEN` and `CLIENT_ID` environment variables as needed.
