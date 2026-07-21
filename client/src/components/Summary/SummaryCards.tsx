import React from 'react';
import type { FinancialSummary } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Scale,
  CreditCard,
  Receipt,
  TrendingUp,
  Activity
} from 'lucide-react';

interface SummaryCardsProps {
  summary: FinancialSummary | null;
  totalTransactions: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary, totalTransactions }) => {
  if (!summary) return null;

  const cards = [
    {
      title: 'Opening Balance',
      value: formatCurrency(summary.openingBalance),
      desc: 'Statement initial balance',
      icon: Wallet,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Closing Balance',
      value: formatCurrency(summary.closingBalance),
      desc: 'Statement final balance',
      icon: Scale,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Total Income',
      value: formatCurrency(summary.totalIncome),
      desc: `${summary.totalCredits} incoming credit transactions`,
      icon: ArrowDownLeft,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Total Expense',
      value: formatCurrency(summary.totalExpense),
      desc: `${summary.totalDebits} outgoing debit payments`,
      icon: ArrowUpRight,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    {
      title: 'Net Cash Flow',
      value: formatCurrency(summary.netCashflow),
      desc: summary.netCashflow >= 0 ? 'Surplus cash position' : 'Deficit cash position',
      icon: TrendingUp,
      color: summary.netCashflow >= 0 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    {
      title: 'Highest Income',
      value: formatCurrency(summary.largestCredit),
      desc: 'Single largest credit deposit',
      icon: CreditCard,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Highest Expense',
      value: formatCurrency(summary.largestDebit),
      desc: 'Single largest debit payout',
      icon: Receipt,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Total Transactions',
      value: totalTransactions.toString(),
      desc: 'Total normalized line items',
      icon: Activity,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl border ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{card.value}</h3>
              <p className="text-xs text-slate-400 mt-1">{card.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
