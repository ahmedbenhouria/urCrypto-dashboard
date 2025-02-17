import { NavLink } from "react-router-dom";
import { SVGProps } from "react";
import { motion } from "framer-motion";

import { ReactComponent as Dashboard } from "@/assets/dashboard-icon.svg";
import { ReactComponent as Markets } from "@/assets/markets-icon.svg";
import { ReactComponent as Transactions } from "@/assets/transactions-icon.svg";
import { ReactComponent as Profile } from "@/assets/profile-icon.svg";
import { ReactComponent as Setting } from "@/assets/setting-icon.svg";
import { ReactComponent as Help } from "@/assets/help-icon.svg";
import { ReactComponent as LogOut } from "@/assets/log-out-icon.svg";

export const RouteSelect = () => {
  return (
    <>
      <div className="space-y-[3%]">
        <Route Icon={Dashboard} title="Dashboard" path="/" />
        <Route Icon={Markets} title="Markets" path="/markets" />
        <Route Icon={Transactions} title="Transactions" path="/transactions" />
        <Route Icon={Profile} title="Profile" path="/profile" />
        <Route Icon={Setting} title="Setting" path="/setting" />
      </div>
      <div className="h-[1.6px] bg-border-color mx-7 mt-7 mb-7 opacity-[77%]" />
      <div className="space-y-[3%]">
        <Route Icon={Help} title="Help" path="/help" />
        <Route Icon={LogOut} title="Log Out" path="/log-out" />
      </div>
    </>
  );
};

interface RouteProps {
  Icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
  path: string;
}

const Route = ({ Icon, title, path }: RouteProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center justify-center w-full py-[8.5px] text-[15px] font-medium relative transition-colors duration-200 ease-in-out ${
          isActive ? "bg-transparent" : "hover:bg-hover-color"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex pl-[18%] gap-[15px] px-4 w-full">
            <Icon
              fill={isActive ? "var(--second-color)" : "var(--third-color)"}
              className="w-[14.5px] pb-[1.5px]"
            />
            <span
              className={`text-[15px]
                ${
                  isActive
                    ? "text-main-color font-bold"
                    : "text-third-color font-normal"
                }`}
            >
              {title}
            </span>
          </div>
          <motion.div
            layout
            initial={{ height: 0 }}
            animate={{
              height: isActive ? 32 : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 60,
            }}
            className="absolute right-0 w-1 h-8 bg-second-color rounded-lg"
          />
        </>
      )}
    </NavLink>
  );
};
