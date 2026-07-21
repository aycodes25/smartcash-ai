import XLSX from "xlsx";
import { Transaction } from "../types/transaction";

function excelDateToString(value: any): string {
  if (value == null || value === "") {
    return "";
  }

  // Already a string (e.g. 31/01/2025)
  if (typeof value === "string") {
    return value.trim();
  }

  // Excel serial number
  if (typeof value === "number") {
    const date = XLSX.SSF.parse_date_code(value);

    if (!date) return "";

    return `${date.y}-${String(date.m).padStart(2, "0")}-${String(
      date.d
    ).padStart(2, "0")}`;
  }

  return String(value);
}

export function normalizeTransactions(
  rows: any[]
): Transaction[] {
  return rows
    .filter((row) => {
      const description =
        row.description ??
        row.Description ??
        row.Narration ??
        row.Details ??
        row.__EMPTY_1;

      if (!description) return false;

      const text = String(description).trim().toUpperCase();

      return (
        text !== "OPENING BALANCE" &&
        text !== "REMARKS"
      );
    })
    .map((row) => ({
      date: excelDateToString(
        row.date ??
          row.Date ??
          row.DATE ??
          row["Transaction Date"] ??
          row.ADDRESS
      ),

      description: (
        row.description ??
        row.Description ??
        row.Narration ??
        row.Details ??
        row.__EMPTY_1 ??
        ""
      )
        .toString()
        .replace(/\r?\n/g, " ")
        .trim(),

      debit: Number(
        row.debit ??
          row.Debit ??
          row.DR ??
          row.Withdrawals ??
          row.__EMPTY_2 ??
          0
      ),

      credit: Number(
        row.credit ??
          row.Credit ??
          row.CR ??
          row.Deposits ??
          row.__EMPTY_3 ??
          0
      ),

      balance: Number(
        row.balance ??
          row.Balance ??
          row.BAL ??
          row.__EMPTY_4 ??
          0
      ),
    }));
}