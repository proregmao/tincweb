import { Router } from 'express';
import { listClients, addClient, ping, getConfig } from '../controllers/clientController.js';

const router = Router();
router.get('/', listClients);
router.post('/', addClient);
router.post('/ping', ping);
router.get('/config/:id', getConfig);
export default router;
