/**
 * @file sarkariJobs.js
 * @description Pure Schema Blueprint for Sarkari Recruitment & Exam Alerts.
 * Real notification data and official updates are dynamically loaded from onlineDataService.
 */

export const SARKARI_SCHEMA = {
  id: '',
  title: '',
  org: '',
  posts: '',
  salary: '',
  link: '',
  isLive: true
};

export const SARKARI_BLUEPRINT = [
  { id: "ssc-cgl-2026", query: "Staff Selection Commission", title: "SSC CGL 2026 Tier 2 Result", org: "Staff Selection Commission", link: "https://ssc.gov.in" },
  { id: "upsc-cse-2026", query: "Union Public Service Commission", title: "UPSC Civil Services 2026", org: "Union Public Service Commission", link: "https://upsc.gov.in" },
  { id: "railway-rrb-2026", query: "Railway Recruitment Control Board", title: "Railway RRB NTPC & ALP", org: "Railway Recruitment Board", link: "https://indianrailways.gov.in" }
];

export const QUICK_LINKS = [
  { label: "SSC Official Portal", url: "https://ssc.gov.in", badge: "Live" },
  { label: "UPSC Portal", url: "https://upsc.gov.in", badge: "Official" },
  { label: "NTA Portal", url: "https://nta.ac.in", badge: "Exams" }
];

export const SARKARI_JOBS = SARKARI_BLUEPRINT.map(j => ({
  ...j,
  badge: "VERIFIED ALERT",
  badgeType: "live",
  posts: "Official Quota",
  category: "Central Govt",
  salary: "Pay Matrix L4-L10",
  cta: "Official Portal →"
}));
