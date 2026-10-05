/**
 * @file blogData.js
 * @description Dynamic Schema contracts for Blog & Hardware specs.
 */
import { REAL_GOLD_DATA, REAL_GAMING_PC_DATA } from './realData';

export const pcBuildData = {
  title: "Indian Gaming PC Build Pricing Guide",
  targetResolution: "1440p High RT Rig",
  lastVerified: new Date().toISOString().split('T')[0],
  components: REAL_GAMING_PC_DATA.builds[1]?.components || []
};

export const goldRatesData = {
  date: REAL_GOLD_DATA.lastUpdated,
  rates: {
    "24K": { pricePerGram: REAL_GOLD_DATA.national[0]?.perGram || 7462, dailyChange: 130, per10g: REAL_GOLD_DATA.national[0]?.per10g || 74620 },
    "22K": { pricePerGram: REAL_GOLD_DATA.national[1]?.perGram || 6842, dailyChange: 120, per10g: REAL_GOLD_DATA.national[1]?.per10g || 68420 }
  },
  cities: REAL_GOLD_DATA.cities || []
};
