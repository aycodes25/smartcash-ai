import XLSX from "xlsx";

export function parseExcel(
  filePath: string
) {
  const workbook =
    XLSX.readFile(filePath);

  const firstSheetName =
    workbook.SheetNames[0];

  const worksheet =
    workbook.Sheets[firstSheetName];

  const data =
    XLSX.utils.sheet_to_json(
      worksheet,
      {
        range: 4,
        defval: "",
      }
    );

  return data;
}