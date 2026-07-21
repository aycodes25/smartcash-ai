import React from 'react';
import { Sparkles, Upload } from 'lucide-react';
import { useStatement } from '../../context/StatementContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  bankName?: string;
}

export const Header: React.FC<HeaderProps> = ({ bankName }) => {
  const { reset } = useStatement();
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-tight flex items-center gap-2">
            SmartCash AI
            <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              v1.0 Pro
            </span>
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            {bankName ? `Analyzing ${bankName} Bank Statement` : 'AI Bank Statement Intelligence'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => { reset(); navigate('/'); }}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2 transition border border-slate-700"
        >
          <Upload className="w-3.5 h-3.5 text-indigo-400" />
          Upload New File
        </button>
      </div>
    </header>
  );
};
