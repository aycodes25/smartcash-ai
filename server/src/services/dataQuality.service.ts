import { Transaction } from '../types/transaction.interface';
import { formatDate, parseNumber, cleanText } from '../utils/parser.util';

export class DataQualityService {
  /**
   * Automatically fix broken/wrapped narrations, merge row splits, normalize dates & amounts, and flag suspicious transactions
   */
  public cleanAndCorrectTransactions(rawTransactions: Transaction[]): Transaction[] {
    if (!rawTransactions || rawTransactions.length === 0) return [];

    const cleaned: Transaction[] = [];

    for (let i = 0; i < rawTransactions.length; i++) {
      let tx = { ...rawTransactions[i] };

      // 1. Clean description & remove internal line breaks
      tx.description = cleanText(tx.description);
      tx.date = formatDate(tx.date);
      tx.debit = parseNumber(tx.debit);
      tx.credit = parseNumber(tx.credit);
      tx.balance = parseNumber(tx.balance);

      let status: 'Valid' | 'Corrected' | 'Flagged' = 'Valid';
      const reasons: string[] = [];

      // 2. Check for merged/split rows from previous line
      if (i > 0 && tx.debit === 0 && tx.credit === 0 && tx.description) {
        // Append description to previous transaction
        const prev = cleaned[cleaned.length - 1];
        if (prev) {
          prev.description = cleanText(`${prev.description} ${tx.description}`);
          prev.status = 'Corrected';
          prev.correctionReason = (prev.correctionReason ? `${prev.correctionReason}; ` : '') + 'Merged multi-line narration row';
          continue;
        }
      }

      // 3. Flags for data quality
      if (tx.debit === 0 && tx.credit === 0) {
        status = 'Flagged';
        reasons.push('Transaction amount is 0');
      }

      if (!tx.date || tx.date.includes('NaN')) {
        status = 'Flagged';
        reasons.push('Invalid transaction date');
      }

      // Balance mathematical consistency check (if previous transaction balance exists)
      if (cleaned.length > 0) {
        const prevTx = cleaned[cleaned.length - 1];
        if (prevTx.balance > 0 && tx.balance > 0) {
          const expectedBalance = prevTx.balance + tx.credit - tx.debit;
          if (Math.abs(expectedBalance - tx.balance) > 1.0) {
            status = 'Flagged';
            reasons.push(`Balance mismatch (Expected ~₦${expectedBalance.toFixed(2)}, Actual ₦${tx.balance.toFixed(2)})`);
          }
        }
      }

      tx.status = status;
      if (reasons.length > 0) {
        tx.correctionReason = reasons.join(' | ');
      }

      cleaned.push(tx);
    }

    return cleaned;
  }
}

export const dataQualityService = new DataQualityService();
