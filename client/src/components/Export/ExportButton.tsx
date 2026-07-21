import React, { useState } from 'react';
import type { Transaction } from '../../types';
import { exportApi } from '../../api/exportApi';
import { Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ExportButtonProps {
  transactions: Transaction[];
}

export const ExportButton: React.FC<ExportButtonProps> = ({ transactions }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!transactions || transactions.length === 0) {
      toast.error('No transactions available for export.');
      return;
    }

    setIsExporting(true);
    const toastId = toast.loading('Generating corrected Excel file...');

    try {
      const blob = await exportApi.exportExcel(transactions);
      
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'smartcash_corrected_statement.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      toast.success('Downloaded clean statement!', { id: toastId });
    } catch (err: any) {
      toast.error(err.message || 'Export failed', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium text-sm flex items-center gap-2 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Export Corrected Excel (.xlsx)
        </>
      )}
    </button>
  );
};
