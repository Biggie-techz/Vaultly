export const calculateProfit = (amount: number, buyPrice: number, currentPrice: number) => {
  const currentValue = amount * currentPrice;
  const initialValue = amount * buyPrice;
  const profit = currentValue - initialValue;
  const profitPercent = ((currentPrice - buyPrice) / buyPrice) * 100;

  return {
    currentValue,
    profit,
    profitPercent
  };
};
