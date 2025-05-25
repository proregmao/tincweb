import { getAllClients, createClient } from '../models/clients.js';
import { getDb } from '../db.js';

export const listClients = async (req, res) => {
  const clients = await getAllClients();
  res.json(clients);
};

export const addClient = async (req, res) => {
  const client = await createClient(req.body);
  res.json(client);
};

export const ping = async (req, res) => {
  const db = await getDb();
  const { client_id, mac, ip, loadavg } = req.body;
  await db.run('INSERT INTO client_status (client_id, ip, loadavg, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', client_id, ip, JSON.stringify(loadavg));
  res.json({ ok: true });
};

export const getConfig = async (req, res) => {
  const db = await getDb();
  const row = await db.get('SELECT content FROM config_files WHERE client_id = ?', req.params.id);
  if (!row) return res.status(404).end();
  res.json({ content: row.content });
};
