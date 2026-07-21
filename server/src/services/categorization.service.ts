import { Transaction } from '../types/transaction.interface';
import { Category } from '../constants/bank.enum';

export class CategorizationService {
  /**
   * Rule-based categorization of transactions using keywords
   */
  public categorizeTransaction(description: string, credit: number, debit: number): Category {
    const desc = (description || '').toLowerCase();

    // 1. Bank Charges
    if (
      desc.includes('charge') ||
      desc.includes('fee') ||
      desc.includes('stamp duty') ||
      desc.includes('vat') ||
      desc.includes('sms notification') ||
      desc.includes('maintenance') ||
      desc.includes('commission') ||
      desc.includes('cot')
    ) {
      return 'Bank Charges';
    }

    // 2. Salary
    if (
      desc.includes('salary') ||
      desc.includes('payroll') ||
      desc.includes('stipend') ||
      desc.includes('allowance') ||
      desc.includes('wages')
    ) {
      return 'Salary';
    }

    // 3. Tax
    if (
      desc.includes('tax') ||
      desc.includes('firs') ||
      desc.includes('lirs') ||
      desc.includes('withholding') ||
      desc.includes('wht')
    ) {
      return 'Tax';
    }

    // 4. Reversal / Refund
    if (desc.includes('reversal') || desc.includes('rvsl') || desc.includes('reversed')) {
      return 'Reversal';
    }
    if (desc.includes('refund') || desc.includes('cashback')) {
      return 'Refund';
    }

    // 5. Cash Withdrawal / ATM
    if (desc.includes('atm') || desc.includes('cash withdraw')) {
      return 'ATM';
    }
    if (desc.includes('withdrawal') || desc.includes('cash payout')) {
      return 'Cash Withdrawal';
    }

    // 6. POS
    if (desc.includes('pos ') || desc.includes('pos/')) {
      return 'POS';
    }

    // 7. Utilities & Bills
    if (
      desc.includes('electricity') ||
      desc.includes('nepa') ||
      desc.includes('ikedc') ||
      desc.includes('ekedc') ||
      desc.includes('water') ||
      desc.includes('dstv') ||
      desc.includes('gotv') ||
      desc.includes('airtime') ||
      desc.includes('data') ||
      desc.includes('mtn') ||
      desc.includes('airtel') ||
      desc.includes('glo')
    ) {
      return 'Utilities';
    }

    if (desc.includes('bill') || desc.includes('subscription')) {
      return 'Bills';
    }

    // 8. Loan & Investment
    if (desc.includes('loan') || desc.includes('credit facility') || desc.includes('lending')) {
      return 'Loan';
    }
    if (desc.includes('investment') || desc.includes('mutual fund') || desc.includes('treasury bill') || desc.includes('stocks')) {
      return 'Investment';
    }

    // 9. Sales vs Transfer
    if (credit > 0) {
      if (
        desc.includes('invoice') ||
        desc.includes('payment for') ||
        desc.includes('purchase') ||
        desc.includes('sales') ||
        desc.includes('deposit for')
      ) {
        return 'Sales';
      }
      return 'Transfer';
    }

    if (debit > 0) {
      if (desc.includes('trf') || desc.includes('transfer') || desc.includes('nip') || desc.includes('ft')) {
        return 'Transfer';
      }
    }

    return 'Other';
  }

  /**
   * Categorize list of transactions
   */
  public categorizeAll(transactions: Transaction[]): Transaction[] {
    return transactions.map(tx => ({
      ...tx,
      category: this.categorizeTransaction(tx.description, tx.credit, tx.debit)
    }));
  }
}

export const categorizationService = new CategorizationService();
