import { Transaction } from './transaction.interface';

export interface FinancialSummary {
  openingBalance: number;
  closingBalance: number;
  totalIncome: number;
  totalExpense: number;
  netCashflow: number;
  largestCredit: number;
  largestDebit: number;
  averageCredit: number;
  averageDebit: number;
  totalCredits: number;
  totalDebits: number;
  dailyAverage: number;
  monthlyAverage: number;
  highestTransaction: Transaction | null;
  lowestTransaction: Transaction | null;
}

export interface InsightResult {
  insights: string[];
}
