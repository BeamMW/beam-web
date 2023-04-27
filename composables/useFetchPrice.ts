interface CoinGeckoAPIResponse {
  beam: { usd: number; usd_24h_change: number };
}

type PriceResponse = { usd: number; change: number };

const CACHE_MAX_AGE = 20; // In seconds

let cache: PriceResponse | null = null;
let lastFetchedAt: number | null = null;

async function fetchPrice(): Promise<PriceResponse> {
  const response: CoinGeckoAPIResponse = await $fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=beam&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false&precision=5"
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

export const useFetchPrice: () => Promise<PriceResponse> = async () => {
  const currentTime = Date.now();

  if (
    !cache ||
    !lastFetchedAt ||
    currentTime - lastFetchedAt > CACHE_MAX_AGE * 1000
  ) {
    try {
      cache = await fetchPrice();
      lastFetchedAt = currentTime;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching price:", error);
      throw error;
    }
  }

  return cache;
};
