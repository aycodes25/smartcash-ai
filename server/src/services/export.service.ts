import ExcelJS from 'exceljs';
import { Transaction } from '../types/transaction.interface';

export class ExportService {
  /**
   * Generate clean, formatted downloadable Excel workbook (.xlsx)
   */
  public async generateExcelBuffer(transactions: Transaction[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'SmartCash AI';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Standardized Statement');

    // Define Columns
    worksheet.columns = [
      { header: 'Date', key: 'date', width: 14 },
      { header: 'Description', key: 'description', width: 45 },
      { header: 'Debit (NGN)', key: 'debit', width: 16 },
      { header: 'Credit (NGN)', key: 'credit', width: 16 },
      { header: 'Balance (NGN)', key: 'balance', width: 18 },
      { header: 'Category', key: 'category', width: 18 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Notes / Remarks', key: 'notes', width: 35 }
    ];

    // Style Header Row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '1E293B' } // Dark Slate
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 24;

    // Add Data Rows
    transactions.forEach(tx => {
      const row = worksheet.addRow({
        date: tx.date,
        description: tx.description,
        debit: tx.debit || 0,
        credit: tx.credit || 0,
        balance: tx.balance || 0,
        category: tx.category || 'Other',
        status: tx.status || 'Valid',
        notes: tx.correctionReason || tx.notes || ''
      });

      // Format currency cells
      row.getCell('debit').numFmt = '#,##0.00';
      row.getCell('credit').numFmt = '#,##0.00';
      row.getCell('balance').numFmt = '#,##0.00';

      // Alignment
      row.getCell('date').alignment = { horizontal: 'center' };
      row.getCell('status').alignment = { horizontal: 'center' };
      row.getCell('category').alignment = { horizontal: 'center' };
      row.getCell('debit').alignment = { horizontal: 'right' };
      row.getCell('credit').alignment = { horizontal: 'right' };
      row.getCell('balance').alignment = { horizontal: 'right' };
    });

    // Auto Column Width Tuning
    worksheet.columns.forEach(column => {
      let maxLen = 0;
      column.eachCell!({ includeEmpty: true }, cell => {
        const len = cell.value ? String(cell.value).length : 0;
        if (len > maxLen) maxLen = len;
      });
      column.width = Math.max(maxLen + 4, 12);
    });

    const uint8Array = await workbook.xlsx.writeBuffer();
    return Buffer.from(uint8Array);
  }
}

export const exportService = new ExportService();
