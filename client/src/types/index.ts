export type Bank =
  | 'Hub360'
  | 'UBA'
  | 'Access'
  | 'Zenith'
  | 'First Bank'
  | 'GTBank'
  | 'Fidelity'
  | 'FCMB'
  | 'Sterling'
  | 'Wema'
  | 'Opay'
  | 'PalmPay'
  | 'Moniepoint'
  | 'Unknown';

export type Category =
  | 'Sales'
  | 'Transfer'
  | 'Bank Charges'
  | 'Salary'
  | 'Loan'
  | 'POS'
  | 'ATM'
  | 'Utilities'
  | 'Investment'
  | 'Bills'
  | 'Tax'
  | 'Cash Withdrawal'
  | 'Refund'
  | 'Reversal'
  | 'Other';

export interface Transaction {
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  category?: Category;
  status?: 'Valid' | 'Corrected' | 'Flagged';
  correctionReason?: string;
  notes?: string;
  reference?: string;
}

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

export interface AIEnhancementResult {
  improvedTransactions: Transaction[];
  businessRecommendations: string[];
  fraudObservations: string[];
  cashflowAnalysis: string;
  riskAnalysis: string;
  profitabilityAnalysis: string;
}

export interface DashboardAnalyticsResponse {
  summary: FinancialSummary;
  incomeVsExpenseChart: { date: string; income: number; expense: number }[];
  monthlyTotalsChart: { month: string; income: number; expense: number }[];
  categoryTotalsChart: { category: string; amount: number; percentage: number }[];
  cashflowTrendChart: { date: string; balance: number }[];
  top10Expenses: Transaction[];
  top10Income: Transaction[];
  largestTransfers: Transaction[];
  recentTransactions: Transaction[];
}

export interface ParseResponse {
  success: boolean;
  bank: string;
  confidence: number;
  currency: string;
  totalRows: number;
  summary: FinancialSummary;
  insights: string[];
  aiEnhancements: AIEnhancementResult;
  analytics: DashboardAnalyticsResponse;
  transactions: Transaction[];
  error?: string;
}

export interface ApiError {
  success: false;
  error: string;
}
