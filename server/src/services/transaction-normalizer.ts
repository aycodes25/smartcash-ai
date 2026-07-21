import { Transaction } from "../types/transaction";

export function normalizeTransactions(
  rows: any[]
): Transaction[] {

  return rows
    // Remove Opening Balance row
    .filter(
      (row) =>
        row.__EMPTY_1 &&
        row.__EMPTY_1 !== "Opening Balance"
    )

    .map((row) => ({
      date:
        row.Date ??
        row.DATE ??
        row["Transaction Date"] ??
        row.ADDRESS ??
        "",

      description:
        row.Description ??
        row.Narration ??
        row.Details ??
        row.__EMPTY_1 ??
        "",

      debit: Number(
        row.Debit ??
        row.DR ??
        row.Withdrawals ??
        row.__EMPTY_2 ??
        0
      ),

      credit: Number(
        row.Credit ??
        row.CR ??
        row.Deposits ??
        row.__EMPTY_3 ??
        0
      ),

      balance: Number(
        row.Balance ??
        row.BAL ??
        row.__EMPTY_4 ??
        0
      ),
    }));
}