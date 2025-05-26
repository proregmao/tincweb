import { Router } from 'express';
import { listUsers, changePassword } from '../controllers/userController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();
router.get('/', requireAdmin, listUsers);
router.post('/change-password', changePassword);
export default router;
