import { Router } from 'express';
const router = Router();
import { reportLostItem } from '../controllers/reportController.js';

const reportRoutes = router.post('/report/lost', reportLostItem);
// router.post('/report/found', reportController.reportFoundItem);

export default reportRoutes;