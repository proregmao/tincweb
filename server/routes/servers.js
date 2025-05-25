import { Router } from 'express';
import { listServers, addServer } from '../controllers/serverController.js';

const router = Router();
router.get('/', listServers);
router.post('/', addServer);
export default router;
