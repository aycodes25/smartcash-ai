import { Router } from 'express';
import { parseController } from '../controllers/parse.controller';
import { upload } from '../middleware/upload.middleware';

const router = Router();

router.post('/parse', upload.single('file'), (req, res, next) => {
  parseController.parseExcel(req, res, next);
});

export default router;
