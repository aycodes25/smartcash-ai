import { BankDetectionService } from '../services/bankDetection.service';
import { CategorizationService } from '../services/categorization.service';
import { SummaryService } from '../services/summary.service';
import { InsightService } from '../services/insight.service';
import { DataQualityService } from '../services/dataQuality.service';
import { ExportService } from '../services/export.service';
import { Bank } from '../constants/bank.enum';
import { Transaction } from '../types/transaction.interface';

describe('SmartCash AI Core Pipeline Unit Tests', () => {
  const bankDetector = new BankDetectionService();
  const categorizer = new CategorizationService();
  const summaryEngine = new SummaryService();
  const insightGen = new InsightService();
  const qualityEngine = new DataQualityService();
  const exporter = new ExportService();

  describe('TODO 3: Bank Detection Engine', () => {
    it('should detect GTBank from GTBank statement header rows', () => {
      const gtBankRows = [
        ['GUARANTY TRUST BANK PLC', 'STATEMENT OF ACCOUNT'],
        ['Account Number:', '0123456789'],
        ['Trans Date', 'Remarks', 'Debit', 'Credit', 'Balance'],
        ['2024-01-10', 'TRF FROM JOHN DOE', '', '50,000.00', '150,000.00']
      ];
      const result = bankDetector.detect(gtBankRows);
      expect(result.bank).toBe(Bank.GTBANK);
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should detect Moniepoint from Moniepoint statement headers', () => {
      const moniepointRows = [
        ['MONIEPOINT MICROFINANCE BANK', 'ACCOUNT STATEMENT'],
        ['Date', 'Narration', 'Debit (NGN)', 'Credit (NGN)', 'Balance (NGN)'],
        ['2024-01-11', 'POS PAYMENT RECEIVED', '0.00', '25,000.00', '25,000.00']
      ];
      const result = bankDetector.detect(moniepointRows);
      expect(result.bank).toBe(Bank.MONIEPOINT);
      expect(result.confidence).toBeGreaterThan(0);
    });
  });

  describe('TODO 5: Rule-Based Categorization', () => {
    it('should categorize Bank Charges correctly', () => {
      const cat = categorizer.categorizeTransaction('SMS NOTIFICATION FEE FOR JAN', 0, 100);
      expect(cat).toBe('Bank Charges');
    });

    it('should categorize Salary correctly', () => {
      const cat = categorizer.categorizeTransaction('STAFF SALARY PAYMENT JAN 2024', 0, 250000);
      expect(cat).toBe('Salary');
    });

    it('should categorize POS payments correctly', () => {
      const cat = categorizer.categorizeTransaction('POS MERCH PURCHASE SUPERMARKET', 12000, 0);
      expect(cat).toBe('POS');
    });
  });

  describe('TODO 6 & 7: Financial Summary & Insight Engine', () => {
    const mockTx: Transaction[] = [
      { date: '2024-01-01', description: 'OPENING', debit: 0, credit: 100000, balance: 100000, category: 'Transfer' },
      { date: '2024-01-02', description: 'AIRTIME', debit: 2000, credit: 0, balance: 98000, category: 'Utilities' },
      { date: '2024-01-03', description: 'SALARY PAY', debit: 0, credit: 300000, balance: 398000, category: 'Salary' }
    ];

    it('should calculate accurate financial metrics', () => {
      const summary = summaryEngine.calculateSummary(mockTx);
      expect(summary.totalIncome).toBe(400000);
      expect(summary.totalExpense).toBe(2000);
      expect(summary.netCashflow).toBe(398000);
      expect(summary.largestCredit).toBe(300000);
      expect(summary.openingBalance).toBe(100000);
      expect(summary.closingBalance).toBe(398000);
    });

    it('should generate human-readable insights', () => {
      const summary = summaryEngine.calculateSummary(mockTx);
      const res = insightGen.generateInsights(mockTx, summary);
      expect(res.insights.length).toBeGreaterThan(0);
      expect(res.insights[0]).toContain('exceeded expenses');
    });
  });

  describe('TODO 13: Data Quality & Statement Correction Engine', () => {
    it('should merge multi-line broken descriptions and format values cleanly', () => {
      const dirtyTx: Transaction[] = [
        { date: '10/01/2024', description: 'TRANSFER FROM ALICE', debit: 0, credit: 50000, balance: 50000 },
        { date: '', description: 'REF: 99881234 NIP REASON', debit: 0, credit: 0, balance: 0 }
      ];

      const cleaned = qualityEngine.cleanAndCorrectTransactions(dirtyTx);
      expect(cleaned.length).toBe(1);
      expect(cleaned[0].description).toBe('TRANSFER FROM ALICE REF: 99881234 NIP REASON');
      expect(cleaned[0].status).toBe('Corrected');
      expect(cleaned[0].date).toBe('2024-01-10');
    });
  });

  describe('TODO 9: Excel Export Buffer Generation', () => {
    it('should generate a valid binary Excel buffer', async () => {
      const mockTx: Transaction[] = [
        { date: '2024-01-01', description: 'TEST PAYMENT', debit: 0, credit: 5000, balance: 5000, category: 'Sales', status: 'Valid' }
      ];

      const buffer = await exporter.generateExcelBuffer(mockTx);
      expect(Buffer.isBuffer(buffer)).toBe(true);
      expect(buffer.length).toBeGreaterThan(0);
    });
  });
});
