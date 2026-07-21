import { Transaction } from "../types/transaction";
import {
  cleanDescription,
  excelDateToString,
  toNumber,
} from "./utils";

export interface ParserFields {
  date: string[];
  description: string[];
  debit: string[];
  credit: string[];
  balance: string[];
}

export abstract class BaseParser {
  protected abstract fields: ParserFields;

  protected getValue(
    row: any,
    keys: string[]
  ) {
    for (const key of keys) {
      if (
        row[key] !== undefined &&
        row[key] !== null &&
        row[key] !== ""
      ) {
        return row[key];
      }
    }

    return undefined;
  }

  parse(rows: any[]): Transaction[] {
    return rows
      .filter((row) => {
        const description = this.getValue(
          row,
          this.fields.description
        );

        if (!description) {
          return false;
        }

        const text = String(description)
          .trim()
          .toUpperCase();

        return (
          text !== "OPENING BALANCE" &&
          text !== "REMARKS"
        );
      })
      .map((row) => ({
        date: excelDateToString(
          this.getValue(row, this.fields.date)
        ),

        description: cleanDescription(
          this.getValue(row, this.fields.description)
        ),

        debit: toNumber(
          this.getValue(row, this.fields.debit)
        ),

        credit: toNumber(
          this.getValue(row, this.fields.credit)
        ),

        balance: toNumber(
          this.getValue(row, this.fields.balance)
        ),
      }));
  }
}