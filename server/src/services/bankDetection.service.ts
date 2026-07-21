import { ParserRegistry } from '../parsers/base/ParserRegistry';
import { initializeParsers } from '../parsers';
import { Bank } from '../constants/bank.enum';
import { IParser } from '../types/parser.interface';

export class BankDetectionService {
  private registry: ParserRegistry;

  constructor() {
    this.registry = initializeParsers();
  }

  /**
   * Detect bank from workbook rows using metadata, worksheet names, headers, and keywords
   */
  public detect(rows: any[][]): { bank: Bank; confidence: number; parser: IParser } {
    return this.registry.detectBank(rows);
  }
}

export const bankDetectionService = new BankDetectionService();
