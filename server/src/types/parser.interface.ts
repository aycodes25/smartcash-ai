import { Transaction } from './transaction.interface';
import { Bank } from '../constants/bank.enum';

export interface ParserScoreResult {
  bank: Bank;
  score: number;
}

export interface IParser {
  bank: Bank;
  score(rows: any[][], metadata?: Record<string, any>): number;
  parse(rows: any[][]): Transaction[];
}
