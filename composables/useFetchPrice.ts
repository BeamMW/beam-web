interface CoinGeckoAPIResponse {
  beam: { usd: number; usd_24h_change: number };
}

type PriceResponse = { usd: number; change: number };

export const CACHE_MAX_AGE = 20; // In seconds

async function fetchPrice(): Promise<PriceResponse> {
  const response: CoinGeckoAPIResponse = await $fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=beam&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false&precision=5&c=${Math.random()}`
  );

  if (
    !response ||
    !response.beam ||
    !response.beam.usd ||
    !response.beam.usd_24h_change
  ) {
    throw new Error("API temporarily unavailable");
  }

  return {
    usd: response.beam.usd,
    change: response.beam.usd_24h_change,
  };
}

export enum PriceStorageStructure {
  LAST_FETCHED_AT = "price.lastFetchedAt",
  USD = "price.usd",
  CHANGE = "price.change",
}

export const useFetchPrice: () => Promise<PriceResponse> = async () => {
  const localForage = (await import("localforage")).default;
  const lastFetchedAt = (await localForage.getItem(
    PriceStorageStructure.LAST_FETCHED_AT
  )) as number;
  const currentTime = Date.now();

  if (!lastFetchedAt || currentTime - lastFetchedAt > CACHE_MAX_AGE * 1000) {
    try {
      const { usd, change } = await fetchPrice();
      await localForage.setItem(PriceStorageStructure.USD, usd);
      await localForage.setItem(PriceStorageStructure.CHANGE, change);
      await localForage.setItem(
        PriceStorageStructure.LAST_FETCHED_AT,
        currentTime
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching price:", error);
      throw error;
    }
  }

  return {
    usd: parseFloat(
      (await localForage.getItem(PriceStorageStructure.USD)) as string
    ),
    change: parseFloat(
      (await localForage.getItem(PriceStorageStructure.CHANGE)) as string
    ),
  };
};
