import { getDb } from '../db.js';

export const getAllServers = async () => {
  const db = await getDb();
  return db.all('SELECT * FROM servers');
};

export const createServer = async (data) => {
  const db = await getDb();
  const { lastID } = await db.run('INSERT INTO servers (name, host, port) VALUES (?, ?, ?)', data.name, data.host, data.port);
  return { id: lastID, ...data };
};
