import { Router } from 'express';
import { exportController } from '../controllers/export.controller';

const router = Router();

router.post('/export', (req, res, next) => {
  exportController.exportExcel(req, res, next);
});

export default router;
