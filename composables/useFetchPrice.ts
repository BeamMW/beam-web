import { LocalStorage } from "@/utils/localStorage";

export const CACHE_MAX_AGE = 20; // In seconds
const CACHE_NAMESPACE = "beam";
const CACHE_PRICE_NAME = "price";

interface CoinGeckoResponse {
  beam: {
    usd: number;
    usd_24h_change: number;
  };
}

interface PriceResponse {
  usd: number;
  change: number;
}

interface StoredPrice {
  lastFetchedAt: number;
  usd: string;
  change: string;
}

async function fetchPrice(): Promise<PriceResponse> {
  const response: CoinGeckoResponse = await $fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=beam&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false&precision=5&c=${Math.random()}`,
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

export const useFetchPrice = async (): Promise<PriceResponse> => {
  const price = LocalStorage.getItem<StoredPrice>(
    CACHE_PRICE_NAME,
    CACHE_NAMESPACE,
  );

  if (!price || Date.now() - price.lastFetchedAt > CACHE_MAX_AGE * 1000) {
    try {
      const { usd, change } = await fetchPrice();
      const storedPrice: StoredPrice = {
        lastFetchedAt: Date.now(),
        usd: usd.toString(),
        change: change.toString(),
      };
      LocalStorage.setItem(CACHE_PRICE_NAME, storedPrice, CACHE_NAMESPACE);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw error;
    }
  }

  const currentPrice = LocalStorage.getItem<StoredPrice>(
    CACHE_PRICE_NAME,
    CACHE_NAMESPACE,
  );
  if (currentPrice && currentPrice.usd && currentPrice.change) {
    return {
      usd: parseFloat(currentPrice.usd),
      change: parseFloat(currentPrice.change),
    };
  }

  throw new Error("Unable to fetch data");
};
