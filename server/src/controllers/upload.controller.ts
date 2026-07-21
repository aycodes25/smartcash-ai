import { Request, Response } from "express";
import { parseExcel } from "../parsers/excel.parser";

export const uploadFile = (
  req: Request,
  res: Response
) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const transactions =
    parseExcel(req.file.path);

  return res.json({
    success: true,
    totalRows:
      transactions.length,
    transactions,
  });
};