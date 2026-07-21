import { Category } from '../constants/bank.enum';

export interface Transaction {
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  category?: Category;
  status?: 'Valid' | 'Corrected' | 'Flagged';
  correctionReason?: string;
  notes?: string;
  reference?: string;
}

export interface ParseResult {
  success: boolean;
  bank: string;
  confidence: number;
  currency: string;
  totalRows: number;
  transactions: Transaction[];
  error?: string;
}
