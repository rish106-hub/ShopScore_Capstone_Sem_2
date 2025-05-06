const USD_TO_INR_RATE = 83.12;

/**
 * Convert USD to INR
 * @param {number} usdAmount - Amount in USD
 * @returns {number} Amount in INR
 */
export const convertUSDtoINR = (usdAmount) => {
  return usdAmount * USD_TO_INR_RATE;
};

/**
 * Format price in INR with ₹ symbol
 * @param {number} amount - Amount in INR
 * @returns {string} Formatted price string
 */
export const formatINR = (amount) => {
  return `₹${amount.toFixed(2)}`;
};

/**
 * Convert USD price to formatted INR string
 * @param {number} usdPrice - Price in USD
 * @returns {string} Formatted price in INR
 */
export const getFormattedINRPrice = (usdPrice) => {
  const inrAmount = convertUSDtoINR(usdPrice);
  return formatINR(inrAmount);
};