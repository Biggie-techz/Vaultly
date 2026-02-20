export const getCoinPrices = async (coinIds: string[]) => {
  const ids = coinIds.join(",");
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );
  return response.json();
};
