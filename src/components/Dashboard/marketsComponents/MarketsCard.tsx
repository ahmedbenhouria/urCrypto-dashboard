import { useState } from "react";
import { BinanceAssets } from "@/components/Dashboard/marketsComponents/BinanceAssets";

export const MarketsCard = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const tabs: string[] = ["All", "Metaverse", "Gaming", "Defi", "NFT"];

  return (
    <div className="flex flex-col bg-background rounded-lg p-3 sm:p-5 w-full h-full space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 px-2 pt-1">
        <h1 className="text-text-color font-semibold text-[18px] sm:text-[19px]">
          Markets
        </h1>
        <div className="w-full sm:w-auto">
          <div className="flex overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <div className="flex gap-2 min-w-min">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`text-[11px] sm:text-[12.5px] font-semibold px-[8px] py-1 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "bg-fifth-color text-second-color"
                      : "bg-hover-color text-text-color hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BinanceAssets />
      <div className="w-full text-end pr-3 pt-1">
        <span className="text-[12px] rounded-lg border-[1px] border-border-color px-3 py-[5px] text-fourth-color font-semibold hover:bg-hover-color cursor-pointer hover:text-text-color">
          View All
        </span>
      </div>
    </div>
  );
};
