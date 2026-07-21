import React from 'react';
import { Building2, CheckCircle2, ShieldCheck, FileSpreadsheet } from 'lucide-react';

interface BankDetectionCardProps {
  bank: string;
  confidence: number;
  totalRows: number;
  fileName?: string | null;
}

export const BankDetectionCard: React.FC<BankDetectionCardProps> = ({
  bank,
  confidence,
  totalRows,
  fileName
}) => {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
          <Building2 className="w-7 h-7" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">{bank} Statement</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verified Bank Engine
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-400" />
            File: {fileName || 'Uploaded Statement'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-between md:justify-start">
        <div>
          <span className="text-slate-400 block">Detection Score</span>
          <span className="text-base font-bold text-indigo-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            {confidence}% Confidence
          </span>
        </div>

        <div>
          <span className="text-slate-400 block">Parsed Lines</span>
          <span className="text-base font-bold text-white">{totalRows} Rows</span>
        </div>
      </div>
    </div>
  );
};
