import React from 'react';
import { FileUploader } from '../components/Upload/FileUploader';
import { Sparkles, ShieldCheck, Zap, Layers } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          Next-Gen AI Statement Engine
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Smart Bank Statement <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Analysis & Automatic Parsing
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Upload statements from Hub360, UBA, Access, Zenith, First Bank, GTBank, Fidelity, FCMB, Sterling, Wema, Opay, PalmPay, or Moniepoint. Get instant AI insights & clean Excel exports.
        </p>
      </div>

      {/* Drag & Drop File Upload Component */}
      <FileUploader />

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800/80">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Auto Bank Detection</h3>
            <p className="text-xs text-slate-400 mt-1">
              Zero manual setup. Automatically detects bank format, headers & metadata.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Rule & AI Analysis</h3>
            <p className="text-xs text-slate-400 mt-1">
              Categorizes transfers, bank charges, salaries, utilities, and detects anomalies.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Clean Excel Export</h3>
            <p className="text-xs text-slate-400 mt-1">
              Corrects broken narrations and exports perfectly formatted .xlsx files.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
