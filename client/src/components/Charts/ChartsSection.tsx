import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import type { DashboardAnalyticsResponse } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface ChartsProps {
  analytics: DashboardAnalyticsResponse | null;
}

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899', '#64748B'];

export const ChartsSection: React.FC<ChartsProps> = ({ analytics }) => {
  if (!analytics) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Income vs Expense Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        <h4 className="text-base font-semibold text-white mb-4">Monthly Income vs Expense</h4>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.monthlyTotalsChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(val) => `₦${val / 1000}k`} />
              <Tooltip
                formatter={(val: any) => [formatCurrency(Number(val)), '']}
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cashflow Trend Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        <h4 className="text-base font-semibold text-white mb-4">Account Cashflow Trend</h4>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.cashflowTrendChart}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(val) => `₦${val / 1000}k`} />
              <Tooltip
                formatter={(val: any) => [formatCurrency(Number(val)), 'Balance']}
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="balance" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#balanceGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown Donut Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 lg:col-span-2">
        <h4 className="text-base font-semibold text-white mb-4">Category Spending & Inflow Breakdown</h4>
        <div className="h-80 w-full flex flex-col md:flex-row items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analytics.categoryTotalsChart}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
              >
                {analytics.categoryTotalsChart.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: any) => [formatCurrency(Number(val)), 'Volume']}
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
