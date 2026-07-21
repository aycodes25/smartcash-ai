import { ParserRegistry } from './base/ParserRegistry';
import {
  Hub360Parser,
  UBAParser,
  AccessParser,
  ZenithParser,
  FirstBankParser,
  GTBankParser,
  FidelityParser,
  FCMBParser,
  SterlingParser,
  WemaParser,
  OpayParser,
  PalmPayParser,
  MoniepointParser
} from './banks/allBankParsers';

export function initializeParsers(): ParserRegistry {
  const registry = ParserRegistry.getInstance();
  registry.registerParser(new Hub360Parser());
  registry.registerParser(new UBAParser());
  registry.registerParser(new AccessParser());
  registry.registerParser(new ZenithParser());
  registry.registerParser(new FirstBankParser());
  registry.registerParser(new GTBankParser());
  registry.registerParser(new FidelityParser());
  registry.registerParser(new FCMBParser());
  registry.registerParser(new SterlingParser());
  registry.registerParser(new WemaParser());
  registry.registerParser(new OpayParser());
  registry.registerParser(new PalmPayParser());
  registry.registerParser(new MoniepointParser());

  return registry;
}