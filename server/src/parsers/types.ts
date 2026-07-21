import { Transaction } from "../types/transaction";

export interface BankParser {
  name: string;
  canParse(rows: any[]): boolean;
  parse(rows: any[]): Transaction[];
}