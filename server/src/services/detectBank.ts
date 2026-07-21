import { parsers } from "../parsers";
import { BankParser } from "../parsers/types";

export function detectBank(
  rows: any[]
): BankParser | null {
  for (const parser of parsers) {
    if (parser.canParse(rows)) {
      return parser;
    }
  }

  return null;
}