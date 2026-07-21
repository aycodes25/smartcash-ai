import XLSX from "xlsx";

export function excelDateToString(value: any): string {
  if (value == null || value === "") {
    return "";
  }

  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    const date = XLSX.SSF.parse_date_code(value);

    if (!date) {
      return "";
    }

    return `${date.y}-${String(date.m).padStart(2, "0")}-${String(
      date.d
    ).padStart(2, "0")}`;
  }

  return String(value);
}

/**
 * Cleans transaction descriptions by removing line breaks
 * and extra spaces.
 */
export function cleanDescription(value: any): string {
  if (value == null) {
    return "";
  }

  return String(value)
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Converts empty values into 0.
 */
export function toNumber(value: any): number {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return 0;
  }

  const num = Number(value);

  return Number.isNaN(num) ? 0 : num;
}