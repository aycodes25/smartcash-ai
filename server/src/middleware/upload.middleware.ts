import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20 MB max file size limit
  },
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype.includes('excel') ||
      file.mimetype.includes('spreadsheetml') ||
      file.mimetype.includes('csv') ||
      file.originalname.endsWith('.xlsx') ||
      file.originalname.endsWith('.xls') ||
      file.originalname.endsWith('.csv')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Please upload an Excel (.xlsx, .xls) or CSV file.'));
    }
  }
});