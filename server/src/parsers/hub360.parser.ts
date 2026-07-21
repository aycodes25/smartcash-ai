import { BaseParser } from "./base.parser";
import { BankParser } from "./types";

class Hub360Parser
  extends BaseParser
  implements BankParser
{
  name = "hub360";

  protected fields = {
    date: [
      "date",
      "Date",
      "DATE",
      "Transaction Date",
      "ADDRESS",
    ],

    description: [
      "description",
      "Description",
      "Narration",
      "Details",
      "__EMPTY_1",
    ],

    debit: [
      "debit",
      "Debit",
      "DR",
      "Withdrawals",
      "__EMPTY_2",
    ],

    credit: [
      "credit",
      "Credit",
      "CR",
      "Deposits",
      "__EMPTY_3",
    ],

    balance: [
      "balance",
      "Balance",
      "BAL",
      "__EMPTY_4",
    ],
  };

  canParse(rows: any[]): boolean {
    if (!rows.length) {
      return false;
    }

    const text = JSON.stringify(rows).toUpperCase();

    if (text.includes("HUB360")) {
      return true;
    }

    const firstRow = rows[0];

    return (
      "__EMPTY_1" in firstRow &&
      "__EMPTY_2" in firstRow &&
      "__EMPTY_3" in firstRow &&
      "__EMPTY_4" in firstRow
    );
  }
}

export const hub360Parser =
  new Hub360Parser();