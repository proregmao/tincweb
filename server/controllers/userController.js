import { getDb } from '../db.js';

export const listUsers = async (req, res) => {
  const db = await getDb();
  const users = await db.all('SELECT id, username, role, created_at FROM users');
  res.json(users);
};
