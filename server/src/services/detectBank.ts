import { bankDetectionService } from "./bankDetection.service";

export function detectBank(rows: any[]): any {
  const result = bankDetectionService.detect(rows);
  return result.parser;
}