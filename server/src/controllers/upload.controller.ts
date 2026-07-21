import { Request, Response } from "express";

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

  return res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    file: req.file,
  });
};