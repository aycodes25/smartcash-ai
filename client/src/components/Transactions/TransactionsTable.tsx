import React, { useState, useMemo } from 'react';
import type { Transaction } from '../../types';
import { formatCurrency, formatDateString } from '../../utils/formatters';
import { Search, Filter } from 'lucide-react';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const categories = useMemo(() => {
    const set = new Set<string>();
    transactions.forEach(t => { if (t.category) set.add(t.category); });
    return Array.from(set);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchSearch =
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.date.includes(searchTerm);
      const matchCat = selectedCategory === 'ALL' || tx.category === selectedCategory;
      const matchStatus = selectedStatus === 'ALL' || tx.status === selectedStatus;
      return matchSearch && matchCat && matchStatus;
    });
  }, [transactions, searchTerm, selectedCategory, selectedStatus]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, currentPage]);

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Transactions Analysis</h3>
          <p className="text-xs text-slate-400">
            {filteredTransactions.length} items parsed and corrected
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search narration..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Quality Status</option>
              <option value="Valid">Valid</option>
              <option value="Corrected">Corrected</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-800/60 text-slate-400 uppercase tracking-wider font-semibold">
            <tr>
              <th className="p-3.5">Date</th>
              <th className="p-3.5">Description / Narration</th>
              <th className="p-3.5 text-right">Debit (NGN)</th>
              <th className="p-3.5 text-right">Credit (NGN)</th>
              <th className="p-3.5 text-right">Balance (NGN)</th>
              <th className="p-3.5 text-center">Category</th>
              <th className="p-3.5 text-center">Quality Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  No matching transactions found.
                </td>
              </tr>
            ) : (
              paginatedRows.map((tx, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 whitespace-nowrap text-slate-300 font-mono">
                    {formatDateString(tx.date)}
                  </td>
                  <td className="p-3.5 max-w-xs truncate text-white" title={tx.description}>
                    {tx.description}
                    {tx.correctionReason && (
                      <span className="block text-[10px] text-amber-400 truncate">
                        {tx.correctionReason}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right font-medium text-rose-400">
                    {tx.debit > 0 ? formatCurrency(tx.debit) : '-'}
                  </td>
                  <td className="p-3.5 text-right font-medium text-emerald-400">
                    {tx.credit > 0 ? formatCurrency(tx.credit) : '-'}
                  </td>
                  <td className="p-3.5 text-right font-mono font-medium text-slate-200">
                    {formatCurrency(tx.balance)}
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {tx.category || 'Other'}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        tx.status === 'Corrected'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : tx.status === 'Flagged'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {tx.status || 'Valid'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
