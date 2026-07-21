import { Request, Response } from "express";
import { parseExcel } from "../parsers/excel.parser";
import { normalizeTransactions } from "../services/transaction-normalizer";

export const uploadFile = (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Read excel
    const rows = parseExcel(req.file.path);

    // Convert to standard format
    const transactions =
      normalizeTransactions(rows);

    console.log(transactions);

    return res.json({
      success: true,
      totalRows: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to process file",
    });
  }
};