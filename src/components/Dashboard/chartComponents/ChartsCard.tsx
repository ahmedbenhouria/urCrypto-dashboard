import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { Loader2 } from "lucide-react";
import { ReactComponent as ArrowDown } from "@/assets/arrow-down-icon.svg";
import axios from "axios";

interface CryptoNames {
  [key: string]: string;
}

interface CandleData {
  x: number;
  y: [number, number, number, number];
}

interface TimeInterval {
  label: string;
  value: string;
  hours: number;
}

const timeIntervals: TimeInterval[] = [
  { label: "1H", value: "1h", hours: 42 },
  { label: "4H", value: "4h", hours: 24 * 7 },
  { label: "6H", value: "6h", hours: 24 * 7 },
  { label: "1D", value: "1d", hours: 24 * 30 },
  { label: "1W", value: "1w", hours: 24 * 90 },
  { label: "1M", value: "1M", hours: 24 * 200 },
];

const getDateFormat = (interval: string): string => {
  switch (interval) {
    case "1h":
    case "4h":
    case "6h":
      return "MMM dd HH:mm";
    case "1d":
    case "1w":
      return "MMM dd";
    case "1M":
      return "MMM yyyy";
    default:
      return "MMM dd HH:mm";
  }
};

const fetchCandleData = async (
  symbol: string,
  interval: string
): Promise<CandleData[]> => {
  const now = Date.now();
  const timeInterval = timeIntervals.find((t) => t.value === interval);
  if (!timeInterval) return [];

  const maxAllowedTime = 200 * 24 * 60 * 60 * 1000;
  const requestedTime = timeInterval.hours * 60 * 60 * 1000;
  const timeRange = Math.min(requestedTime, maxAllowedTime);
  const startTime = now - timeRange;

  const { data } = await axios.get(`https://api.binance.com/api/v3/klines`, {
    params: {
      symbol,
      interval,
      startTime,
      endTime: now,
      limit: 500,
    },
  });

  return data
    .filter((candle: any[]) => candle.length >= 5)
    .map((candle: any[]) => ({
      x: candle[0],
      y: [
        parseFloat(candle[1]),
        parseFloat(candle[2]),
        parseFloat(candle[3]),
        parseFloat(candle[4]),
      ],
    }));
};

export const useGetFetchQuery = (name: string[]) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(name);
};

export const ChartsCard = () => {
  const [selectedInterval, setSelectedInterval] = useState<string>("1h");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState({
    symbol: "BTCUSDT",
    name: "Bitcoin",
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const theme = localStorage.getItem("theme") || "light";

  const { data = [], isLoading } = useQuery({
    queryKey: ["candleData", selectedCrypto, selectedInterval],
    queryFn: () => fetchCandleData(selectedCrypto.symbol, selectedInterval),
    refetchInterval: 60000,
  });

  const currentPrice = data.length > 0 ? data[data.length - 1].y[3] : null;

  const cryptoNamesData = useGetFetchQuery(["cryptoNames"]) as CryptoNames;
  console.log(cryptoNamesData);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 350,
      background: "transparent",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        speed: 500,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: { colors: "var(--fourth-color)" },
        datetimeUTC: false,
        rotate: 0,
        trim: true,
        minHeight: 40,
      },
      axisBorder: {
        show: true,
        color: "var(--border-color)",
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "var(--border-color)",
      },
      crosshairs: {
        show: true,
        width: 1,
        position: "back",
        opacity: 0.9,
        stroke: {
          color: "var(--fourth-color)",
          width: 1,
          dashArray: 2,
        },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "var(--fourth-color)" },
        formatter: (value: number) => {
          return value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
        },
      },
      tickAmount: 6,
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#3380FF",
          downward: "#C0D9FD",
        },
        wick: {
          useFillColor: true,
        },
      },
    },
    grid: {
      borderColor: "var(--border-color)",
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0,
      },
    },
    tooltip: {
      theme: theme === "light" ? "light" : "dark",
      enabled: true,
      shared: true,
      intersect: false,
      x: {
        show: true,
        format: getDateFormat(selectedInterval),
      },
      y: {
        formatter: (value: number) =>
          `$${value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
      },
    },
  };

  /*  const priceChange = calculatePriceChange(data);
   */

  return (
    <div className="h-full bg-background rounded-lg flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-6 pt-4 md:pt-6 gap-4 md:gap-0">
        <div className="relative w-full md:w-auto" ref={dropdownRef}>
          <div
            className={`flex items-center rounded-xl px-3 md:px-4 py-2 cursor-pointer ${
              theme === "light" ? "bg-[#f9f9fa]" : "bg-[#f9f9fa06]"
            }`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex justify-between md:justify-start space-x-2 lg:space-x-14 w-full">
              <div className="flex flex-col space-y-[1px]">
                <h2 className="text-[14px] md:text-[16px] text-text-color font-bold">
                  {selectedCrypto.symbol}
                </h2>
                <p className="text-[11px] md:text-[12px] font-medium text-fourth-color truncate max-w-[80px] md:max-w-[100px]">
                  {selectedCrypto.name}
                </p>
              </div>
              {currentPrice && (
                <div className="justify-center items-center">
                  <p className="text-[14px] md:text-[16px] font-bold text-text-color">
                    $
                    {currentPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              )}
            </div>
            <ArrowDown
              fill="var(--text-color)"
              className={`w-[10px] md:w-[12px] ml-2 md:ml-3 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && cryptoNamesData && (
            <div className="absolute top-full left-0 mt-2 w-[100%] max-h-[300px] overflow-y-auto bg-background border border-border-color rounded-lg shadow-lg z-50">
              {Object.entries(cryptoNamesData)
                .slice(0, 30)
                .map(([symbol, name]) => (
                  <div
                    key={symbol}
                    className="flex items-center px-3 md:px-4 py-3 hover:bg-hover-color cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedCrypto({ symbol, name });
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="text-[13px] md:text-[14px] font-semibold text-text-color">
                        {symbol}
                      </span>
                      <span className="text-[11px] md:text-[12px] text-fourth-color">
                        {name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="flex gap-1.5 md:gap-2 pb-2 lg:pb-8 w-full md:w-auto overflow-x-auto">
          {timeIntervals.map(({ label, value }) => (
            <button
              key={value}
              className={`text-[10px] sm:text-[11px] md:text-[12.5px] font-semibold px-[8px] md:px-[10px] py-1 rounded-lg whitespace-nowrap transition-colors ${
                selectedInterval === value
                  ? "bg-fifth-color text-second-color"
                  : "bg-hover-color text-text-color hover:text-gray-700"
              }`}
              onClick={() => setSelectedInterval(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full mt-2 md:mt-4">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 md:h-8 md:w-8 text-second-color animate-spin" />
          </div>
        ) : (
          <ReactApexChart
            options={options}
            series={[{ data }]}
            type="candlestick"
            height="97%"
          />
        )}
      </div>
    </div>
  );
};
