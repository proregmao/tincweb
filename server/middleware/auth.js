import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret-key';

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
