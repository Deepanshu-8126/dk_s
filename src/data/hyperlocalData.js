/**
 * Hyperlocal & High-CPC Earning Data Registry
 * Fuel Rates, Mandi Bhav, Credit Cards & Govt Schemes
 */

export const FUEL_DATA = {
  lastUpdated: 'Today, 6:00 AM (IOCL / HPCL Feed)',
  cities: [
    { city: 'Aligarh', petrol: '₹96.48', diesel: '₹89.64', cng: '₹87.50', lpg: '₹803' },
    { city: 'Lucknow', petrol: '₹96.57', diesel: '₹89.76', cng: '₹89.00', lpg: '₹805' },
    { city: 'Agra', petrol: '₹96.35', diesel: '₹89.52', cng: '₹86.20', lpg: '₹803' },
    { city: 'Kanpur', petrol: '₹96.63', diesel: '₹89.81', cng: '₹88.50', lpg: '₹805' },
    { city: 'Delhi', petrol: '₹94.72', diesel: '₹87.62', cng: '₹75.09', lpg: '₹803' },
    { city: 'Mumbai', petrol: '₹104.21', diesel: '₹92.15', cng: '₹76.00', lpg: '₹802' },
  ],
};

export const MANDI_BHAV = {
  lastUpdated: 'Today Morning Auction Rates',
  items: [
    { crop: 'Gehu (Wheat)', mandi: 'Aligarh Mandi', rate: '₹2,420 - ₹2,550 / Qtl', trend: 'up' },
    { crop: 'Sarson (Mustard)', mandi: 'Agra Mandi', rate: '₹5,600 - ₹5,850 / Qtl', trend: 'up' },
    { crop: 'Basmati Paddy', mandi: 'Hathras Mandi', rate: '₹3,200 - ₹3,450 / Qtl', trend: 'stable' },
    { crop: 'Makka (Maize)', mandi: 'Mathura Mandi', rate: '₹2,100 - ₹2,280 / Qtl', trend: 'down' },
    { crop: 'Aloo (Potato)', mandi: 'Farrukhabad Mandi', rate: '₹1,250 - ₹1,400 / Qtl', trend: 'stable' },
  ],
};

export const CREDIT_CARDS_DATA = [
  {
    name: 'HDFC Tata Neu Infinity',
    category: 'UPI & RuPay Cashback',
    cashback: '5% NeuCoins on Neu & Bill Payments',
    annualFee: '₹1,499 (Waived on ₹3L spend)',
    highlight: 'Best for Daily UPI Payments & Groceries',
    cpcTier: 'High (Avg payout ₹2,200/card)',
    applyUrl: 'https://www.hdfcbank.com',
  },
  {
    name: 'Axis Bank Airtel Credit Card',
    category: 'Utility & Mobile Recharge',
    cashback: '25% on Airtel DTH/Mobile, 10% on Swiggy & Zomato',
    annualFee: '₹500 (Waived on ₹12k spend)',
    highlight: 'Saves ₹500/month on Home Electricity Bills',
    cpcTier: 'High (Avg payout ₹1,800/card)',
    applyUrl: 'https://www.axisbank.com',
  },
  {
    name: 'SBI Cashback Credit Card',
    category: 'Universal Online Shopping',
    cashback: '5% Cashback on ALL Online Purchases',
    annualFee: '₹999 (Waived on ₹2L spend)',
    highlight: 'No merchant restrictions, direct statement credit',
    cpcTier: 'Maximum (Avg payout ₹2,500/card)',
    applyUrl: 'https://www.sbicard.com',
  },
  {
    name: 'Chase Sapphire Preferred (US Traffic)',
    category: 'Travel & Dining (Global)',
    cashback: '60,000 Bonus Points ($750 Value)',
    annualFee: '$95',
    highlight: 'Top 1 affiliate in USA with $150/lead payout',
    cpcTier: 'USA High ($4.50 CPC)',
    applyUrl: 'https://creditcards.chase.com',
  },
];

export const GOVT_SCHEMES_DATA = [
  {
    name: 'PM Kisan Samman Nidhi (19th Kist)',
    amount: '₹2,000 Direct Bank Transfer',
    status: 'Beneficiary List Live - eKYC Mandatory',
    portal: 'pmkisan.gov.in',
    urgency: 'Active Next Week',
  },
  {
    name: 'UP Scholarship 2026 Status Check',
    amount: 'Fee Reimbursement (Pre/Post Matric)',
    status: 'PFMS DBT Payment Tracking Active',
    portal: 'scholarship.up.gov.in',
    urgency: 'Verify Aadhar Seeding',
  },
  {
    name: 'Ladli Behna Yojana Monthly Payout',
    amount: '₹1,250 / Month',
    status: '10th of Every Month DBT Transfer',
    portal: 'cmladlibehna.mp.gov.in',
    urgency: 'Account Status Check',
  },
];
