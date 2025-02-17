import { ReactComponent as BTC } from "@/assets/BTC-icon.svg";
import { ReactComponent as ETH } from "@/assets/ETH-icon.svg";
import { ReactComponent as SOL } from "@/assets/SOL-icon.svg";

import { EstimatedBalanceCard } from "@/components/Dashboard/walletComponents/EstimatedBalanceCard";
import { CryptoBalanceCard } from "@/components/Dashboard/walletComponents/CryptoBalanceCard";
import { MarketsCard } from "@/components/Dashboard/marketsComponents/MarketsCard";
import { ChartsCard } from "@/components/Dashboard/chartComponents/ChartsCard";
import { AssetsCard } from "@/components/Dashboard/assetsComponents/AssetsCard";

export const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full p-4 space-y-6">
      {/* Cards Section */}
      <div className="flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row gap-5 justify-center items-center">
        <EstimatedBalanceCard />
        <CryptoBalanceCard
          Icon={BTC}
          symbol="BTCUSDT"
          name="Bitcoin"
          balance="$23,738"
          priceChange="-$16.78"
          marketCap="+14.67%"
        />
        <CryptoBalanceCard
          Icon={ETH}
          symbol="ETHUSDT"
          name="Ethereum"
          balance="$23,738"
          priceChange="+$189.91"
          marketCap="+24.68%"
        />
        <CryptoBalanceCard
          Icon={SOL}
          symbol="SOLUSDT"
          name="Solana"
          balance="$23,738"
          priceChange="+$556.14"
          marketCap="+64.11%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-[_45rem,_1fr] gap-2 sm:gap-6 lg:gap-6 px-0 lg:px-4">
        <div className="w-full h-[28.5rem] sm:h-[24rem] md:h-[27rem]">
          <ChartsCard />
        </div>
        <div className="w-full h-[28.5rem] sm:h-[24rem] md:h-[27rem]">
          <MarketsCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[_19rem,_1fr] gap-2 sm:gap-6 lg:gap-6 px-0 lg:px-4">
        <div className="w-full h-[18rem] sm:h-[17rem] md:h-[18rem]">
          <AssetsCard />
        </div>
      </div>
    </div>
  );
};
