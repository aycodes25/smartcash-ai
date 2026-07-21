export enum Bank {
  HUB360 = 'Hub360',
  UBA = 'UBA',
  ACCESS = 'Access',
  ZENITH = 'Zenith',
  FIRST_BANK = 'First Bank',
  GTBANK = 'GTBank',
  FIDELITY = 'Fidelity',
  FCMB = 'FCMB',
  STERLING = 'Sterling',
  WEMA = 'Wema',
  OPAY = 'Opay',
  PALMPAY = 'PalmPay',
  MONIEPOINT = 'Moniepoint',
  UNKNOWN = 'Unknown'
}

export type Category =
  | 'Sales'
  | 'Transfer'
  | 'Bank Charges'
  | 'Salary'
  | 'Loan'
  | 'POS'
  | 'ATM'
  | 'Utilities'
  | 'Investment'
  | 'Bills'
  | 'Tax'
  | 'Cash Withdrawal'
  | 'Refund'
  | 'Reversal'
  | 'Other';
