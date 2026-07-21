import { Transaction } from '../types/transaction.interface';
import { FinancialSummary, InsightResult } from '../types/summary.interface';

export class InsightService {
  /**
   * Generate human-readable business insights using rule-based algorithms
   */
  public generateInsights(transactions: Transaction[], summary: FinancialSummary): InsightResult {
    const insights: string[] = [];

    if (!transactions || transactions.length === 0) {
      return { insights: ['No transactions recorded for analysis.'] };
    }

    // 1. Overall Cashflow Trend
    if (summary.totalIncome > summary.totalExpense) {
      insights.push(`Income (₦${summary.totalIncome.toLocaleString()}) exceeded expenses (₦${summary.totalExpense.toLocaleString()}) with a positive net cashflow of ₦${summary.netCashflow.toLocaleString()}.`);
    } else if (summary.totalExpense > summary.totalIncome) {
      insights.push(`Expenses (₦${summary.totalExpense.toLocaleString()}) exceeded income (₦${summary.totalIncome.toLocaleString()}), resulting in a deficit of ₦${Math.abs(summary.netCashflow).toLocaleString()}.`);
    } else {
      insights.push(`Cashflow remained neutral with equal income and expenses of ₦${summary.totalIncome.toLocaleString()}.`);
    }

    // 2. Transaction Volumes
    insights.push(`Recorded ${summary.totalCredits} credit inflows and ${summary.totalDebits} debit outflows.`);

    // 3. Bank Charges Summary
    const bankChargesTx = transactions.filter(t => t.category === 'Bank Charges');
    const totalBankCharges = bankChargesTx.reduce((sum, t) => sum + t.debit, 0);
    if (totalBankCharges > 0) {
      insights.push(`Bank charges and service fees totalled ₦${totalBankCharges.toLocaleString()}.`);
    }

    // 4. Largest Income & Highest Expense
    if (summary.largestCredit > 0) {
      const topCreditTx = transactions.find(t => t.credit === summary.largestCredit);
      insights.push(`Largest single income occurred on ${topCreditTx?.date || 'N/A'} for ₦${summary.largestCredit.toLocaleString()}.`);
    }

    if (summary.largestDebit > 0) {
      const topDebitTx = transactions.find(t => t.debit === summary.largestDebit);
      insights.push(`Highest single expense was ₦${summary.largestDebit.toLocaleString()} on ${topDebitTx?.date || 'N/A'}.`);
    }

    // 5. Daily Average Cashflow
    if (summary.dailyAverage !== 0) {
      insights.push(`Average daily cashflow stood at ₦${Math.round(summary.dailyAverage).toLocaleString()}/day.`);
    }

    return { insights };
  }
}

export const insightService = new InsightService();
