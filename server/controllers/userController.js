import { getDb } from '../db.js';
import bcrypt from 'bcrypt';
import { updatePassword } from '../models/users.js';

export const listUsers = async (req, res) => {
  const db = await getDb();
  const users = await db.all('SELECT id, username, role, created_at FROM users');
  res.json(users);
};

export const changePassword = async (req, res) => {
  const db = await getDb();
  const { oldPassword, newPassword } = req.body;
  const user = await db.get('SELECT * FROM users WHERE id = ?', req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(400).json({ message: 'Incorrect old password' });
  const hashed = await bcrypt.hash(newPassword, 10);
  await updatePassword(req.user.id, hashed);
  res.json({ message: 'Password updated' });
};
