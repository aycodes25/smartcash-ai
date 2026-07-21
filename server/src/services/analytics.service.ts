import { Transaction } from '../types/transaction.interface';
import { FinancialSummary } from '../types/summary.interface';

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

export class AnalyticsService {
  public generateDashboardAnalytics(
    transactions: Transaction[],
    summary: FinancialSummary
  ): DashboardAnalyticsResponse {
    if (!transactions || transactions.length === 0) {
      return {
        summary,
        incomeVsExpenseChart: [],
        monthlyTotalsChart: [],
        categoryTotalsChart: [],
        cashflowTrendChart: [],
        top10Expenses: [],
        top10Income: [],
        largestTransfers: [],
        recentTransactions: []
      };
    }

    // 1. Daily Income vs Expense Chart & Cashflow Trend
    const dailyMap = new Map<string, { income: number; expense: number; balance: number }>();
    transactions.forEach(tx => {
      const dateKey = tx.date || 'Unknown';
      const existing = dailyMap.get(dateKey) || { income: 0, expense: 0, balance: tx.balance };
      existing.income += tx.credit;
      existing.expense += tx.debit;
      existing.balance = tx.balance; // take latest balance on day
      dailyMap.set(dateKey, existing);
    });

    const incomeVsExpenseChart = Array.from(dailyMap.entries()).map(([date, val]) => ({
      date,
      income: val.income,
      expense: val.expense
    }));

    const cashflowTrendChart = Array.from(dailyMap.entries()).map(([date, val]) => ({
      date,
      balance: val.balance
    }));

    // 2. Monthly Totals Chart
    const monthlyMap = new Map<string, { income: number; expense: number }>();
    transactions.forEach(tx => {
      const monthKey = tx.date ? tx.date.substring(0, 7) : 'Unknown';
      const existing = monthlyMap.get(monthKey) || { income: 0, expense: 0 };
      existing.income += tx.credit;
      existing.expense += tx.debit;
      monthlyMap.set(monthKey, existing);
    });

    const monthlyTotalsChart = Array.from(monthlyMap.entries()).map(([month, val]) => ({
      month,
      income: val.income,
      expense: val.expense
    }));

    // 3. Category Totals Breakdown Chart
    const categoryMap = new Map<string, number>();
    let totalCatAmount = 0;

    transactions.forEach(tx => {
      const cat = tx.category || 'Other';
      const amt = tx.credit + tx.debit;
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + amt);
      totalCatAmount += amt;
    });

    const categoryTotalsChart = Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
      percentage: totalCatAmount > 0 ? parseFloat(((amount / totalCatAmount) * 100).toFixed(1)) : 0
    }));

    // 4. Top 10 Expenses & Top 10 Income
    const top10Expenses = [...transactions]
      .filter(t => t.debit > 0)
      .sort((a, b) => b.debit - a.debit)
      .slice(0, 10);

    const top10Income = [...transactions]
      .filter(t => t.credit > 0)
      .sort((a, b) => b.credit - a.credit)
      .slice(0, 10);

    // 5. Largest Transfers & Recent Transactions
    const largestTransfers = [...transactions]
      .filter(t => t.category === 'Transfer')
      .sort((a, b) => Math.max(b.credit, b.debit) - Math.max(a.credit, a.debit))
      .slice(0, 10);

    const recentTransactions = [...transactions].slice(-10).reverse();

    return {
      summary,
      incomeVsExpenseChart,
      monthlyTotalsChart,
      categoryTotalsChart,
      cashflowTrendChart,
      top10Expenses,
      top10Income,
      largestTransfers,
      recentTransactions
    };
  }
}

export const analyticsService = new AnalyticsService();
