/**
 * Central Single Source of Truth & Factory Accessor (UniqueDigit Portal)
 * 
 * Consolidates Gold, Gaming, AI Tools, and Sarkari data into a single module.
 */

// Import from realData, aiTools, sarkariJobs
export * from './realData';
export * from './gamingData';
export * from './aiTools';
export * from './sarkariJobs';
export * from './goldRates';

// Unified Factory Functions for Dynamic Niche Queries
import { REAL_GOLD_DATA } from './realData';
import { REAL_GTA_DATA, REAL_GAMING_PC_DATA } from './realData';
import { AI_TOOLS } from './aiTools';
import { SARKARI_JOBS } from './sarkariJobs';

/**
 * Get unified data for any niche
 */
export function getNicheData(niche) {
  switch (niche?.toLowerCase()) {
    case 'gold':
      return REAL_GOLD_DATA;
    case 'gaming':
      return { gta: REAL_GTA_DATA, pc: REAL_GAMING_PC_DATA };
    case 'ai':
      return AI_TOOLS;
    case 'sarkari':
      return SARKARI_JOBS;
    default:
      return {
        gold: REAL_GOLD_DATA,
        gaming: REAL_GTA_DATA,
        ai: AI_TOOLS,
        sarkari: SARKARI_JOBS,
      };
  }
}
