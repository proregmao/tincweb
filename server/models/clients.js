import { getDb } from '../db.js';

export const getAllClients = async () => {
  const db = await getDb();
  return db.all('SELECT * FROM clients');
};

export const createClient = async (data) => {
  const db = await getDb();
  const { lastID } = await db.run('INSERT INTO clients (name, private_ip, mac, public_key, private_key, status) VALUES (?, ?, ?, ?, ?, ?)',
    data.name, data.private_ip, data.mac, data.public_key, data.private_key, 'inactive');
  return { id: lastID, ...data };
};
