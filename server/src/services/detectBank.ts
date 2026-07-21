export type SupportedBank =
  | "hub360"
  | "uba"
  | "access"
  | "opay"
  | "zenith"
  | "firstbank"
  | "unknown";

export function detectBank(rows: any[]): SupportedBank {
  if (!rows.length) {
    return "unknown";
  }

  const text = JSON.stringify(rows).toUpperCase();

  if (text.includes("HUB360")) return "hub360";

  if (text.includes("UNITED BANK FOR AFRICA")) return "uba";

  if (text.includes("ACCESS BANK")) return "access";

  if (text.includes("OPAY")) return "opay";

  if (text.includes("ZENITH BANK")) return "zenith";

  if (text.includes("FIRST BANK")) return "firstbank";

  return "unknown";
}