import { findByUsername, createUser } from '../models/users.js';
import { generateToken } from '../middleware/auth.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findByUsername(username);
  if (!user) return res.status(401).json({ message: 'User not found' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Incorrect password' });
  const token = generateToken(user);
  res.json({ token });
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser(username, hashed);
  res.json(user);
};
