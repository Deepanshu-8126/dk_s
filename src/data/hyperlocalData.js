/**
 * @file hyperlocalData.js
 * @description Pure Schema Blueprint for Hyperlocal Mandi, Fuel & Finance.
 * Hydrated dynamically online from onlineDataService.
 */

export const FUEL_DATA = {
  lastUpdated: 'Live Online IOCL/BPCL Feed',
  cities: [
    { city: 'Delhi', petrol: '₹94.72', diesel: '₹87.62', cng: '₹75.09', lpg: '₹803' },
    { city: 'Mumbai', petrol: '₹104.21', diesel: '₹92.15', cng: '₹76.00', lpg: '₹802' },
    { city: 'Bangalore', petrol: '₹102.86', diesel: '₹88.94', cng: '₹82.50', lpg: '₹805' },
    { city: 'Lucknow', petrol: '₹94.65', diesel: '₹87.76', cng: '₹81.50', lpg: '₹805' }
  ]
};

export const MANDI_BHAV = {
  lastUpdated: 'Live Agmarknet Auction Feed',
  items: [
    { crop: 'Gehu (Wheat)', mandi: 'Indore Mandi', rate: '₹2,950 / Qtl', trend: 'up' },
    { crop: 'Sarson (Mustard)', mandi: 'Jaipur Mandi', rate: '₹5,850 / Qtl', trend: 'up' },
    { crop: 'Basmati Paddy', mandi: 'Karnal Mandi', rate: '₹4,400 / Qtl', trend: 'up' }
  ]
};

export const CREDIT_CARDS_DATA = [
  {
    name: 'HDFC Tata Neu Infinity',
    category: 'UPI & RuPay Cashback',
    cashback: '5% NeuCoins on Neu & Bill Payments',
    annualFee: '₹1,499 (Waived on ₹3L)',
    highlight: 'Daily UPI Payments & Groceries',
    applyUrl: 'https://www.hdfcbank.com'
  },
  {
    name: 'SBI Cashback Credit Card',
    category: 'Universal Online Shopping',
    cashback: '5% Cashback on ALL Online Purchases',
    annualFee: '₹999 (Waived on ₹2L)',
    highlight: 'Direct statement credit on Amazon & Flipkart',
    applyUrl: 'https://www.sbicard.com'
  }
];

export const GOVT_SCHEMES_DATA = [
  {
    name: 'PM Kisan Samman Nidhi (19th Kist)',
    ministry: 'Ministry of Agriculture',
    benefit: '₹6,000/yr Direct Bank Transfer (DBT)',
    eligibility: 'All Indian Small & Marginal Landholder Farmers',
    officialUrl: 'https://pmkisan.gov.in'
  },
  {
    name: 'PM Surya Ghar: Muft Bijli Yojana',
    ministry: 'Ministry of New and Renewable Energy',
    benefit: 'Up to ₹78,000 Direct Solar Subsidy',
    eligibility: 'Any Residential Household with Roof Space',
    officialUrl: 'https://pmsuryaghar.gov.in'
  }
];
