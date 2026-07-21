import { BaseParser } from '../base/BaseParser';
import { Bank } from '../../constants/bank.enum';

export class Hub360Parser extends BaseParser {
  bank = Bank.HUB360;
  keywords = ['hub360', 'hub 360', 'smartcash', 'hub360 technology'];
  headerKeywords = ['date', 'description', 'debit', 'credit', 'balance'];
}

export class UBAParser extends BaseParser {
  bank = Bank.UBA;
  keywords = ['united bank for africa', 'uba', 'ubagroup', 'afribank'];
  headerKeywords = ['transaction date', 'value date', 'narration', 'debit', 'credit', 'balance'];
}

export class AccessParser extends BaseParser {
  bank = Bank.ACCESS;
  keywords = ['access bank', 'accessbank', 'access plc', 'diamond bank'];
  headerKeywords = ['trans date', 'remarks', 'debit amount', 'credit amount', 'book balance'];
}

export class ZenithParser extends BaseParser {
  bank = Bank.ZENITH;
  keywords = ['zenith bank', 'zenithbank', 'zenith mobile'];
  headerKeywords = ['post date', 'value date', 'description', 'debit', 'credit', 'balance'];
}

export class FirstBankParser extends BaseParser {
  bank = Bank.FIRST_BANK;
  keywords = ['firstbank', 'first bank of nigeria', 'fbn', 'firstmonie'];
  headerKeywords = ['txn date', 'value date', 'narration', 'debit', 'credit', 'running balance'];
}

export class GTBankParser extends BaseParser {
  bank = Bank.GTBANK;
  keywords = ['guaranty trust', 'gtbank', 'gtb', 'gtco'];
  headerKeywords = ['trans date', 'remarks', 'debit', 'credit', 'balance'];
}

export class FidelityParser extends BaseParser {
  bank = Bank.FIDELITY;
  keywords = ['fidelity bank', 'fidelity', 'fidelitybank'];
  headerKeywords = ['date', 'narration', 'withdrawal', 'deposit', 'balance'];
}

export class FCMBParser extends BaseParser {
  bank = Bank.FCMB;
  keywords = ['fcmb', 'first city monument bank', 'monument bank'];
  headerKeywords = ['tran date', 'particulars', 'debit', 'credit', 'balance'];
}

export class SterlingParser extends BaseParser {
  bank = Bank.STERLING;
  keywords = ['sterling bank', 'sterling', 'onebank', 'sterling.ng'];
  headerKeywords = ['date', 'remarks', 'debit', 'credit', 'balance'];
}

export class WemaParser extends BaseParser {
  bank = Bank.WEMA;
  keywords = ['wema bank', 'wema', 'alat', 'alat by wema'];
  headerKeywords = ['date', 'description', 'debit', 'credit', 'balance'];
}

export class OpayParser extends BaseParser {
  bank = Bank.OPAY;
  keywords = ['opay', 'opay digital services', 'opay merchant'];
  headerKeywords = ['order date', 'transaction details', 'money out', 'money in', 'balance'];
}

export class PalmPayParser extends BaseParser {
  bank = Bank.PALMPAY;
  keywords = ['palmpay', 'palm pay', 'palmpay limited'];
  headerKeywords = ['transaction time', 'bill details', 'amount', 'type', 'balance'];
}

export class MoniepointParser extends BaseParser {
  bank = Bank.MONIEPOINT;
  keywords = ['moniepoint', 'monie point', 'teamapt', 'moniepoint microfinance'];
  headerKeywords = ['date', 'narration', 'debit (ngn)', 'credit (ngn)', 'balance (ngn)'];
}
