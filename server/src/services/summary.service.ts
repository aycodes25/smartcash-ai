import { Transaction } from '../types/transaction.interface';
import { FinancialSummary } from '../types/summary.interface';

export class SummaryService {
  /**
   * Calculate complete financial summary metrics from transactions list
   */
  public calculateSummary(transactions: Transaction[]): FinancialSummary {
    if (!transactions || transactions.length === 0) {
      return {
        openingBalance: 0,
        closingBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        netCashflow: 0,
        largestCredit: 0,
        largestDebit: 0,
        averageCredit: 0,
        averageDebit: 0,
        totalCredits: 0,
        totalDebits: 0,
        dailyAverage: 0,
        monthlyAverage: 0,
        highestTransaction: null,
        lowestTransaction: null
      };
    }

    let totalIncome = 0;
    let totalExpense = 0;
    let totalCreditsCount = 0;
    let totalDebitsCount = 0;
    let largestCredit = 0;
    let largestDebit = 0;

    let highestTx: Transaction | null = null;
    let lowestTx: Transaction | null = null;

    const uniqueDates = new Set<string>();

    for (const tx of transactions) {
      if (tx.date) uniqueDates.add(tx.date);

      if (tx.credit > 0) {
        totalIncome += tx.credit;
        totalCreditsCount++;
        if (tx.credit > largestCredit) largestCredit = tx.credit;
      }

      if (tx.debit > 0) {
        totalExpense += tx.debit;
        totalDebitsCount++;
        if (tx.debit > largestDebit) largestDebit = tx.debit;
      }

      const txAmount = Math.max(tx.credit, tx.debit);
      if (!highestTx || txAmount > Math.max(highestTx.credit, highestTx.debit)) {
        highestTx = tx;
      }
      if (!lowestTx || (txAmount > 0 && txAmount < Math.max(lowestTx.credit, lowestTx.debit))) {
        lowestTx = tx;
      }
    }

    const netCashflow = totalIncome - totalExpense;
    const averageCredit = totalCreditsCount > 0 ? totalIncome / totalCreditsCount : 0;
    const averageDebit = totalDebitsCount > 0 ? totalExpense / totalDebitsCount : 0;

    const daysCount = Math.max(uniqueDates.size, 1);
    const dailyAverage = netCashflow / daysCount;

    const monthsCount = Math.max(Math.ceil(daysCount / 30), 1);
    const monthlyAverage = netCashflow / monthsCount;

    const openingBalance = transactions[0]?.balance ?? 0;
    const closingBalance = transactions[transactions.length - 1]?.balance ?? 0;

    return {
      openingBalance,
      closingBalance,
      totalIncome,
      totalExpense,
      netCashflow,
      largestCredit,
      largestDebit,
      averageCredit,
      averageDebit,
      totalCredits: totalCreditsCount,
      totalDebits: totalDebitsCount,
      dailyAverage,
      monthlyAverage,
      highestTransaction: highestTx,
      lowestTransaction: lowestTx
    };
  }
}

export const summaryService = new SummaryService();
