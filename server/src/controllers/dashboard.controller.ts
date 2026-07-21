import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/analytics.service';
import { summaryService } from '../services/summary.service';
import { Transaction } from '../types/transaction.interface';

export class DashboardController {
  public async getAnalytics(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { transactions } = req.body as { transactions: Transaction[] };

      if (!transactions || !Array.isArray(transactions)) {
        res.status(400).json({ success: false, error: 'Transactions array is required.' });
        return;
      }

      const summary = summaryService.calculateSummary(transactions);
      const analytics = analyticsService.generateDashboardAnalytics(transactions, summary);

      res.status(200).json({
        success: true,
        analytics
      });
    } catch (err) {
      next(err);
    }
  }
}

export const dashboardController = new DashboardController();
