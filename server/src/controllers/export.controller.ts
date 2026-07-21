import { Request, Response, NextFunction } from 'express';
import { exportService } from '../services/export.service';
import { Transaction } from '../types/transaction.interface';

export class ExportController {
  public async exportExcel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { transactions } = req.body as { transactions: Transaction[] };

      if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
        res.status(400).json({ success: false, error: 'No valid transactions provided for export.' });
        return;
      }

      const buffer = await exportService.generateExcelBuffer(transactions);

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="smartcash_corrected_statement.xlsx"');
      res.status(200).send(buffer);
    } catch (err) {
      next(err);
    }
  }
}

export const exportController = new ExportController();
