export const formatIndianPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatIndianPriceCompact = (price: number): string => {
  if (price >= 10000000) { // 1 crore
    return `₹${(price / 10000000).toFixed(2)}Cr`;
  } else if (price >= 100000) { // 1 lakh
    return `₹${(price / 100000).toFixed(2)}L`;
  } else if (price >= 1000) { // 1 thousand
    return `₹${(price / 1000).toFixed(1)}K`;
  }
  return formatIndianPrice(price);
};
