export function parseNumber(val: any): number {
  if (val === null || val === undefined) return 0;
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  if (typeof val === 'string') {
    const cleaned = val.replace(/,/g, '').replace(/₦/g, '').replace(/\$/g, '').trim();
    if (!cleaned || cleaned === '-' || cleaned === 'DR' || cleaned === 'CR') return 0;
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : Math.abs(num);
  }
  return 0;
}

export function formatDate(val: any): string {
  if (!val) return new Date().toISOString().split('T')[0];
  
  if (typeof val === 'number') {
    // Excel serial number date format conversion
    const dateObj = new Date(Math.round((val - 25569) * 86400 * 1000));
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toISOString().split('T')[0];
    }
  }

  const str = String(val).trim();
  if (!str) return new Date().toISOString().split('T')[0];

  // Try matching common Nigerian bank date formats
  // DD/MM/YYYY or DD-MM-YYYY or YYYY-MM-DD or DD-MMM-YYYY (e.g. 15-Jan-2024)
  const ddmmyyyy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (ddmmyyyy) {
    let day = parseInt(ddmmyyyy[1], 10);
    let month = parseInt(ddmmyyyy[2], 10);
    let year = parseInt(ddmmyyyy[3], 10);
    if (year < 100) year += 2000;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }

  return new Date().toISOString().split('T')[0];
}

export function cleanText(val: any): string {
  if (!val) return '';
  return String(val)
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
