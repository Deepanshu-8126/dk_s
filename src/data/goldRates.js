// Re-exported from Central Single Source of Truth: src/data/realData.js
import { REAL_GOLD_DATA } from './realData';

export const GOLD_UPDATE = {
  date: REAL_GOLD_DATA.displayUpdated,
  time: "09:30 AM IST",
  source: "MCX India & Spot Live",
  lastUpdated: REAL_GOLD_DATA.lastUpdated
};

export const GOLD_RATES_NATIONAL = REAL_GOLD_DATA.national;
export const GOLD_RATES_CITIES = REAL_GOLD_DATA.cities;
export const GOLD_SPARKLINE = REAL_GOLD_DATA.sparkline;
export const NIFTY_DATA = REAL_GOLD_DATA.nifty;
export const SENSEX_DATA = REAL_GOLD_DATA.sensex;
export const GOLD_AFFILIATES = REAL_GOLD_DATA.affiliates;
