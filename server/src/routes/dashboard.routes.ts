import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';

const router = Router();

router.post('/analytics', (req, res, next) => {
  dashboardController.getAnalytics(req, res, next);
});

export default router;
