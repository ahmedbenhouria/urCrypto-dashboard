import { useCallback, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface CryptoTickerData {
  s: string; // Symbol
  c: string; // Current Price
  P: string; // Price Change Percentage
  q: string; // Market Cap
}

interface GeckoData {
  id: string;
  symbol: string;
  name: string;
}

const STORAGE_KEY = "binance_assets_cache";

const useBinanceWebSocket = () => {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);

  // Add function to load cached data
  const loadCachedData = useCallback(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsedData = JSON.parse(cached);
      queryClient.setQueryData(["binancePrices"], parsedData);
      return parsedData;
    }
    return [];
  }, [queryClient]);

  const setupWebSocket = useCallback(() => {
    return new Promise<CryptoTickerData[]>((resolve) => {
      // Load cached data first
      const cachedData = loadCachedData();
      if (cachedData.length > 0) {
        resolve(cachedData);
      }

      if (!wsRef.current) {
        wsRef.current = new WebSocket(
          "wss://stream.binance.com:9443/ws/!ticker@arr"
        );

        wsRef.current.onmessage = (event) => {
          const data: CryptoTickerData[] = JSON.parse(event.data);
          const filteredData = data
            .filter((asset) => asset.s.endsWith("USDT"))
            .sort((a, b) => parseFloat(b.q) - parseFloat(a.q))
            .slice(0, 30);

          // Update cache only if values changed
          queryClient.setQueryData(
            ["binancePrices"],
            (oldData: CryptoTickerData[] | undefined) => {
              if (!oldData) return filteredData;

              const updatedData = filteredData.map((newAsset) => {
                const oldAsset = oldData.find((old) => old.s === newAsset.s);
                if (!oldAsset) return newAsset;

                if (oldAsset.c === newAsset.c && oldAsset.P === newAsset.P) {
                  return oldAsset;
                }

                return newAsset;
              });

              // Save to localStorage
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
              return updatedData;
            }
          );

          resolve(filteredData);
        };

        wsRef.current.onerror = (error) => {
          console.error("WebSocket Error:", error);
        };

        wsRef.current.onclose = () => {
          console.log("WebSocket disconnected");
          wsRef.current = null;
        };
      }
    });
  }, [queryClient, loadCachedData]);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  return useQuery({
    queryKey: ["binancePrices"],
    queryFn: setupWebSocket,
    refetchInterval: 3000,
    staleTime: 1000, // Consider data stale after 1 second
    gcTime: 1000 * 60 * 5, // Keep inactive data for 5 minutes
    initialData: loadCachedData, // Add initial data from cache
  });
};

const CRYPTO_NAMES_CACHE_KEY = "crypto_names_cache";

// Separate API functions
const fetchCryptoNames = async () => {
  // Try to load from cache first
  const cached = localStorage.getItem(CRYPTO_NAMES_CACHE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }

  // If no cache, fetch from API
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 250,
          page: 1,
          sparkline: false,
        },
      }
    );

    const formattedData = data.reduce(
      (acc: { [key: string]: string }, coin: GeckoData) => {
        acc[coin.symbol.toUpperCase() + "USDT"] = coin.name;
        return acc;
      },
      {}
    );

    // Save to cache
    localStorage.setItem(CRYPTO_NAMES_CACHE_KEY, JSON.stringify(formattedData));
    return formattedData;
  } catch (error) {
    // If API call fails, try to return cached data as fallback
    const cachedFallback = localStorage.getItem(CRYPTO_NAMES_CACHE_KEY);
    if (cachedFallback) {
      return JSON.parse(cachedFallback);
    }
    throw error; // If no cache available, throw the error
  }
};

export const BinanceAssets = () => {
  // Query for crypto names
  const {
    status,
    error,
    data: cryptoNames,
  } = useQuery({
    queryKey: ["cryptoNames"],
    queryFn: fetchCryptoNames,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - crypto names rarely change
    gcTime: 1000 * 60 * 60 * 48, // 48 hours - keep in cache for 2 days
    initialData: () => {
      const cached = localStorage.getItem(CRYPTO_NAMES_CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
      return undefined;
    },
  });

  // Query for WebSocket data
  const { data: assets = [] } = useBinanceWebSocket();

  const hasCachedData = () => {
    return (
      localStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem(CRYPTO_NAMES_CACHE_KEY)
    );
  };

  if (status == "error") {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  if (!cryptoNames && !assets.length && !hasCachedData()) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-second-color animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-auto w-full">
      <div className="flex flex-col h-[18rem] px-1 overflow-y-auto overflow-x-auto">
        {assets.map((asset: CryptoTickerData) => (
          <div
            key={asset.s}
            className="flex flex-row justify-between items-center border-b-[0.1px] last:border-b-0 border-border-color px-2 py-3 gap-4"
          >
            <div className="w-1/4 text-[13px] text-text-color font-bold truncate">
              {asset.s.length > 10
                ? `${asset.s.replace("USDT", "").slice(0, 10)}...`
                : asset.s.replace("USDT", "")}
            </div>
            <div className="w-1/4 text-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-start text-[#5E6E78] font-semibold">
              {cryptoNames?.[asset.s] || asset.s.replace("USDT", "")}
            </div>
            <div className="w-1/4 text-[13px] text-text-color font-semibold text-right">
              $
              {parseFloat(asset.c).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="w-1/4 text-right">
              <span
                className={`text-[12px] font-semibold bg-opacity-[20%] px-[9px] py-[4px] rounded-[15px] ${
                  parseFloat(asset.P) >= 0
                    ? "text-[#219653] bg-[#219653]"
                    : "text-[#EB5757] bg-[#EB5757]"
                }`}
              >
                {parseFloat(asset.P) >= 0 ? "+" : ""}
                {parseFloat(asset.P).toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
