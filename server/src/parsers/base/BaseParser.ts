import { Bank } from '../../constants/bank.enum';
import { IParser } from '../../types/parser.interface';
import { Transaction } from '../../types/transaction.interface';
import { parseNumber, formatDate, cleanText } from '../../utils/parser.util';

export abstract class BaseParser implements IParser {
  abstract bank: Bank;
  abstract keywords: string[];
  abstract headerKeywords: string[];

  /**
   * Evaluate confidence score of this parser against sheet data
   */
  score(rows: any[][], metadata?: Record<string, any>): number {
    if (!rows || rows.length === 0) return 0;
    let totalScore = 0;

    const flattenedContent = rows
      .slice(0, 35)
      .map(row => (Array.isArray(row) ? row.join(' ') : String(row)))
      .join(' ')
      .toLowerCase();

    // Check bank-specific keywords
    for (const kw of this.keywords) {
      if (flattenedContent.includes(kw.toLowerCase())) {
        totalScore += 25;
      }
    }

    // Check table headers
    for (const row of rows.slice(0, 30)) {
      if (!Array.isArray(row)) continue;
      const rowStr = row.join(' ').toLowerCase();
      let headerMatches = 0;
      for (const hKw of this.headerKeywords) {
        if (rowStr.includes(hKw.toLowerCase())) {
          headerMatches++;
        }
      }
      if (headerMatches >= 2) {
        totalScore += headerMatches * 15;
        break;
      }
    }

    return Math.min(totalScore, 100);
  }

  /**
   * Helper to locate header row index dynamically
   */
  protected findHeaderRowIndex(rows: any[][]): number {
    for (let i = 0; i < Math.min(rows.length, 35); i++) {
      const row = rows[i];
      if (!Array.isArray(row)) continue;
      const line = row.map(c => String(c).toLowerCase()).join(' ');
      
      const dateMatch = line.includes('date') || line.includes('trans date') || line.includes('txn date') || line.includes('post date');
      const descMatch = line.includes('description') || line.includes('narration') || line.includes('particulars') || line.includes('details') || line.includes('remarks');
      const amountMatch = line.includes('debit') || line.includes('credit') || line.includes('amount') || line.includes('withdrawal') || line.includes('deposit');

      if ((dateMatch && descMatch) || (descMatch && amountMatch)) {
        return i;
      }
    }
    return 0; // Default to first row if not detected
  }

  /**
   * Default robust parser mapping logic
   */
  parse(rows: any[][]): Transaction[] {
    if (!rows || rows.length === 0) return [];
    
    const headerIdx = this.findHeaderRowIndex(rows);
    const headers = (rows[headerIdx] || []).map(h => (h !== null && h !== undefined ? String(h).trim().toLowerCase() : ''));

    const dateCol = headers.findIndex(h => typeof h === 'string' && (h.includes('date') || h.includes('time')));
    const descCol = headers.findIndex(h => typeof h === 'string' && (h.includes('description') || h.includes('narration') || h.includes('particular') || h.includes('remark') || h.includes('detail')));
    const debitCol = headers.findIndex(h => typeof h === 'string' && (h.includes('debit') || h.includes('withdrawal') || h.includes('dr')));
    const creditCol = headers.findIndex(h => typeof h === 'string' && (h.includes('credit') || h.includes('deposit') || h.includes('cr')));
    const amountCol = headers.findIndex(h => typeof h === 'string' && (h === 'amount' || h.includes('trans amount')));
    const balanceCol = headers.findIndex(h => typeof h === 'string' && (h.includes('balance') || h.includes('bal')));
    const typeCol = headers.findIndex(h => typeof h === 'string' && (h.includes('type') || h.includes('d/c') || h.includes('cr/dr')));

    const transactions: Transaction[] = [];

    for (let i = headerIdx + 1; i < rows.length; i++) {
      const row = rows[i];
      if (!Array.isArray(row) || row.every(c => c === null || c === undefined || String(c).trim() === '')) {
        continue;
      }

      const rowStr = row.join(' ').toLowerCase();

      // Skip non-transaction rows (Opening/Closing balance, totals, footers)
      if (
        rowStr.includes('opening balance') ||
        rowStr.includes('closing balance') ||
        rowStr.includes('brought forward') ||
        rowStr.includes('carried forward') ||
        rowStr.includes('total credit') ||
        rowStr.includes('total debit') ||
        rowStr.includes('page ') ||
        rowStr.includes('statement summary')
      ) {
        continue;
      }

      const rawDate = dateCol >= 0 ? row[dateCol] : row[0];
      const rawDesc = descCol >= 0 ? row[descCol] : (row[1] || row[2] || '');
      
      const description = cleanText(rawDesc);
      if (!description || description.toLowerCase() === 'description' || description.toLowerCase() === 'narration') {
        continue;
      }

      let debit = debitCol >= 0 ? parseNumber(row[debitCol]) : 0;
      let credit = creditCol >= 0 ? parseNumber(row[creditCol]) : 0;
      const balance = balanceCol >= 0 ? parseNumber(row[balanceCol]) : 0;

      // Handle single "Amount" column with "Type" column
      if (debit === 0 && credit === 0 && amountCol >= 0) {
        const amt = parseNumber(row[amountCol]);
        const typeVal = typeCol >= 0 ? String(row[typeCol]).toLowerCase() : '';
        if (typeVal.includes('dr') || typeVal.includes('debit') || typeVal.includes('w')) {
          debit = amt;
        } else {
          credit = amt;
        }
      }

      if (debit === 0 && credit === 0) {
        continue; // Ignore rows without monetary movement
      }

      transactions.push({
        date: formatDate(rawDate),
        description,
        debit,
        credit,
        balance
      });
    }

    return transactions;
  }
}
