# Tincweb

Minimal prototype of Tinc VPN management system.

## Server

Run the simple Python server:

```bash
python3 tincweb/server/index.py
```

An initial `admin` user with password `admin` is created automatically.

## Agent

Run the Python agent to report status to the server:

```bash
python3 tincweb/agent/agent.py
```

