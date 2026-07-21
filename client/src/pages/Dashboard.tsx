import React from 'react';
import { useStatement } from '../context/StatementContext';
import { SummaryCards } from '../components/Summary/SummaryCards';
import { ChartsSection } from '../components/Charts/ChartsSection';
import { TransactionsTable } from '../components/Transactions/TransactionsTable';
import { AIInsightsPanel } from '../components/AI/AIInsightsPanel';
import { BankDetectionCard } from '../components/dashboard/BankDetectionCard';
import { ExportButton } from '../components/Export/ExportButton';
import { Upload, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { data, uploadedFileName } = useStatement();
  const navigate = useNavigate();

  if (!data || !data.success) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">No Active Bank Statement</h2>
        <p className="text-xs text-slate-400">
          Please upload an Excel or CSV statement to generate analytics, financial summary, and AI insights.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs inline-flex items-center gap-2 transition"
        >
          <Upload className="w-4 h-4" />
          Upload Statement Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Bar Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Financial Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Real-time multi-bank normalization & executive cashflow overview
          </p>
        </div>

        <ExportButton transactions={data.transactions} />
      </div>

      {/* Bank Detection Card */}
      <BankDetectionCard
        bank={data.bank}
        confidence={data.confidence}
        totalRows={data.totalRows}
        fileName={uploadedFileName}
      />

      {/* Summary Metrics */}
      <SummaryCards summary={data.summary} totalTransactions={data.totalRows} />

      {/* Recharts Analytics Section */}
      <ChartsSection analytics={data.analytics} />

      {/* AI Insights & Observations */}
      <AIInsightsPanel aiEnhancements={data.aiEnhancements} insights={data.insights} />

      {/* Transactions Table */}
      <TransactionsTable transactions={data.transactions} />
    </div>
  );
};
