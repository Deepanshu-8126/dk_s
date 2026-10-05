// Central Dynamic Calculation Engine for UniqueDigit Portal (2026)
// Eliminates all hardcoded math bugs, static pricing errors, and string concatenation issues.

/**
 * Calculates the total cost of a PC build dynamically from its components
 * @param {Object} build - Object containing components array
 * @returns {number} Sum total in INR
 */
export function calculatePCTotal(build) {
  if (!build || !Array.isArray(build.components)) return 0;
  return build.components.reduce((sum, item) => {
    let val = 0;
    if (typeof item.price === 'number') {
      val = item.price;
    } else if (typeof item.price === 'string') {
      val = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
    }
    return sum + val;
  }, 0);
}

/**
 * Calculates gold rate total for specified grams without string prepending bugs
 * @param {number|string} ratePerGram - Price per 1 gram
 * @param {number|string} grams - Weight in grams (default: 10)
 * @returns {number} Accurate multiplication total
 */
export function calculateGoldTotal(ratePerGram, grams = 10) {
  const numRate = typeof ratePerGram === 'string' 
    ? parseFloat(ratePerGram.replace(/[^0-9.]/g, '')) 
    : Number(ratePerGram);
  const numGrams = Number(grams);

  if (isNaN(numRate) || isNaN(numGrams) || numRate <= 0 || numGrams <= 0) {
    return 0;
  }
  return Math.round(numRate * numGrams);
}

/**
 * Dynamically calculates true discount percentage
 * Prevents fake discount badges when MRP and selling price are equal
 * @param {number|string} mrp - Maximum Retail Price (originalPrice)
 * @param {number|string} sellingPrice - Discounted / Current Price
 * @returns {number} Discount percentage integer (0 if no discount or invalid)
 */
export function calculateDiscount(mrp, sellingPrice) {
  const numMrp = typeof mrp === 'string' ? parseFloat(mrp.replace(/[^0-9.]/g, '')) : Number(mrp);
  const numPrice = typeof sellingPrice === 'string' ? parseFloat(sellingPrice.replace(/[^0-9.]/g, '')) : Number(sellingPrice);

  if (isNaN(numMrp) || isNaN(numPrice) || numMrp <= 0 || numPrice <= 0) {
    return 0;
  }
  if (numMrp <= numPrice) {
    return 0;
  }
  const discount = ((numMrp - numPrice) / numMrp) * 100;
  return Math.round(discount);
}

/**
 * Formats a numeric price into standard Indian numbering format (e.g., ₹1,19,900)
 * @param {number|string} amount
 * @returns {string} Formatted Indian Rupee string
 */
export function formatPriceINR(amount) {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.]/g, '')) : Number(amount);
  if (isNaN(num)) return '₹0';
  return `₹${Math.round(num).toLocaleString('en-IN')}`;
}
