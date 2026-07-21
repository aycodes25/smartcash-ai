import { Request, Response, NextFunction } from 'express';
import * as xlsx from 'xlsx';
import { bankDetectionService } from '../services/bankDetection.service';
import { dataQualityService } from '../services/dataQuality.service';
import { categorizationService } from '../services/categorization.service';
import { summaryService } from '../services/summary.service';
import { insightService } from '../services/insight.service';
import { aiService } from '../services/ai.service';
import { analyticsService } from '../services/analytics.service';

export class ParseController {
  public async parseExcel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, error: 'No Excel file provided in request.' });
        return;
      }

      // Read Excel Workbook
      const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
      if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        res.status(400).json({ success: false, error: 'Excel workbook contains no sheets.' });
        return;
      }

      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];
      const rawRows: any[][] = xlsx.utils.sheet_to_json(sheet, { header: 1 });

      if (!rawRows || rawRows.length === 0) {
        res.status(400).json({ success: false, error: 'Uploaded Excel file is empty.' });
        return;
      }

      // 1. Detect Bank & Select Parser
      const { bank, confidence, parser } = bankDetectionService.detect(rawRows);

      // 2. Parse Raw Transactions
      const initialTransactions = parser.parse(rawRows);

      // 3. AI Statement Correction & Data Quality normalization (TODO 13)
      const cleanTransactions = dataQualityService.cleanAndCorrectTransactions(initialTransactions);

      // 4. Rule-Based Categorization (TODO 5)
      const categorizedTransactions = categorizationService.categorizeAll(cleanTransactions);

      // 5. Calculate Financial Summary (TODO 6)
      const summary = summaryService.calculateSummary(categorizedTransactions);

      // 6. Generate Rule-Based Insights (TODO 7)
      const insightResult = insightService.generateInsights(categorizedTransactions, summary);

      // 7. AI Enhancement (TODO 8 - OpenAI with fallback)
      const aiEnhancements = await aiService.analyze(
        categorizedTransactions,
        summary,
        insightResult.insights
      );

      // 8. Generate Dashboard Analytics JSON (TODO 10)
      const analytics = analyticsService.generateDashboardAnalytics(
        categorizedTransactions,
        summary
      );

      res.status(200).json({
        success: true,
        bank,
        confidence,
        currency: 'NGN',
        totalRows: categorizedTransactions.length,
        summary,
        insights: insightResult.insights,
        aiEnhancements,
        analytics,
        transactions: categorizedTransactions
      });
    } catch (err) {
      next(err);
    }
  }
}

export const parseController = new ParseController();
