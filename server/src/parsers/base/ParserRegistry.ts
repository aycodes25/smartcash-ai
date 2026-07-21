import { Bank } from '../../constants/bank.enum';
import { IParser, ParserScoreResult } from '../../types/parser.interface';

export class ParserRegistry {
  private static instance: ParserRegistry;
  private parsers: Map<Bank, IParser> = new Map();

  private constructor() {}

  public static getInstance(): ParserRegistry {
    if (!ParserRegistry.instance) {
      ParserRegistry.instance = new ParserRegistry();
    }
    return ParserRegistry.instance;
  }

  public registerParser(parser: IParser): void {
    this.parsers.set(parser.bank, parser);
  }

  public getParser(bank: Bank): IParser | undefined {
    return this.parsers.get(bank);
  }

  public getAllParsers(): IParser[] {
    return Array.from(this.parsers.values());
  }

  public detectBank(rows: any[][]): { bank: Bank; confidence: number; parser: IParser } {
    let bestParser: IParser | undefined;
    let highestScore = 0;

    for (const parser of this.parsers.values()) {
      const score = parser.score(rows);
      if (score > highestScore) {
        highestScore = score;
        bestParser = parser;
      }
    }

    if (!bestParser || highestScore === 0) {
      // Return a default fallback parser (e.g., Hub360 or Generic)
      const defaultParser = Array.from(this.parsers.values())[0];
      return {
        bank: Bank.UNKNOWN,
        confidence: 0,
        parser: defaultParser
      };
    }

    return {
      bank: bestParser.bank,
      confidence: highestScore,
      parser: bestParser
    };
  }
}
