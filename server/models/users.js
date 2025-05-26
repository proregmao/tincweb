import { getDb } from '../db.js';

export const findByUsername = async (username) => {
  const db = await getDb();
  return db.get('SELECT * FROM users WHERE username = ?', username);
};

export const createUser = async (username, password, role='user') => {
  const db = await getDb();
  const { lastID } = await db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', username, password, role);
  return { id: lastID, username, role };
};

export const updatePassword = async (id, password) => {
  const db = await getDb();
  await db.run('UPDATE users SET password = ? WHERE id = ?', password, id);
};
