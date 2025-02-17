import { ReactComponent as Wallet } from "@/assets/wallet-icon.svg";
import { ReactComponent as Eye } from "@/assets/eye-icon.svg";

export const EstimatedBalanceCard = () => {
  return (
    <>
      <div className="bg-background rounded-lg p-5 w-full md:w-auto xl:w-[17.5rem] h-[9.2rem]">
        <div className="flex flex-col w-full justify-between space-y-3">
          <div className="flex flex-row space-x-5 justify-start items-center">
            <Wallet className="w-[2.3rem] h-[2.3rem]" />
            <h1 className="text-text-color font-bold text-[14.5px]">
              Estimated Balance
            </h1>
            <Eye
              stroke="var(--third-color)"
              className="w-[1.2rem] h-[1.2rem]"
            />
          </div>
          <div className="justify-start items-center">
            <h1 className="text-text-color font-bold text-[24px]">$123,987</h1>
          </div>
          <div className="flex flex-row w-full justify-between items-center text-[12px] font-medium">
            <div>
              <span className="text-fourth-color">Monthly Profit</span>
            </div>
            <div>
              <span className="text-[#219653]">+$2560.78</span>
            </div>
            <div>
              <span className="text-[#219653] bg-[#219653] bg-opacity-[20%] px-[9.5px] py-[4px] rounded-[15px]">
                +14.67%
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
