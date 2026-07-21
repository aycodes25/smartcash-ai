import { Category } from '../constants/bank.enum';
import { FinancialSummary } from './summary.interface';
import { Transaction } from './transaction.interface';

export interface AIEnhancementResult {
  improvedTransactions: Transaction[];
  businessRecommendations: string[];
  fraudObservations: string[];
  cashflowAnalysis: string;
  riskAnalysis: string;
  profitabilityAnalysis: string;
}

export interface AIProvider {
  analyze(
    transactions: Transaction[],
    summary: FinancialSummary,
    insights: string[]
  ): Promise<AIEnhancementResult>;
}
