export function formatCurrency(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '₦0.00';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
}

export function formatDateString(dateStr: string | undefined | null): string {
  if (!dateStr) return 'N/A';
  return dateStr;
}

export function truncateText(text: string, maxLen = 40): string {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  return text.substring(0, maxLen) + '...';
}
