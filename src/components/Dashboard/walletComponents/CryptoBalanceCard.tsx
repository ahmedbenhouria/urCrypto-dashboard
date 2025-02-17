import { SVGProps } from "react";

interface CryptoBalanceCardProps {
  Icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  symbol: string;
  name: string;
  balance: string;
  priceChange: string;
  marketCap: string;
}

export const CryptoBalanceCard = ({
  Icon,
  symbol,
  name,
  balance,
  priceChange,
  marketCap,
}: CryptoBalanceCardProps) => {
  const isPositive = priceChange.startsWith("+");

  return (
    <>
      <div className="bg-background rounded-lg p-5 w-full md:w-auto xl:w-[17.5rem] h-[9.2rem]">
        <div className="flex flex-col w-full justify-between space-y-4">
          <div className="flex flex-row space-x-3 justify-start items-center">
            <Icon className="w-[2.3rem] h-[2.3rem]" />
            <div className="flex-col justify-center items-start">
              <h1 className="text-text-color font-bold text-[14.5px]">
                {symbol}
              </h1>
              <h1 className="text-fourth-color font-medium text-[11px]">
                {name}
              </h1>
            </div>
          </div>
          <div className="justify-start items-center">
            <h1 className="text-text-color font-bold text-[18px]">{balance}</h1>
          </div>
          <div className="flex flex-row w-full justify-between items-center text-[12px] font-medium">
            <div>
              <span className="text-fourth-color">PNL Daily</span>
            </div>
            <span className={isPositive ? "text-[#219653]" : "text-[#EB5757]"}>
              {priceChange}
            </span>
            <div>
              <span className="text-[#219653] bg-[#219653] bg-opacity-[20%] px-[9.5px] py-[4px] rounded-[15px]">
                {marketCap}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
