import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import profile_image from "@/assets/profile-image.png";
import { Search } from "./Search";
import { BiMenu } from "react-icons/bi";
import { ReactComponent as Notification } from "@/assets/notification-icon.svg";
import { ReactComponent as Moon } from "@/assets/night-mode-icon.svg";
import { ReactComponent as Sun } from "@/assets/light-mode-icon.svg";

interface TopBarProps {
  toggleTheme: () => void;
  theme: string;
}

export const TopBar = ({ toggleTheme, theme }: TopBarProps) => {
  const location = useLocation();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const iconAnimationVariants = {
    initial: (hasMounted: boolean) => ({
      opacity: hasMounted ? 0 : 1,
      rotate: hasMounted ? -90 : 0,
    }),
    animate: {
      opacity: 1,
      rotate: 0,
    },
    exit: {
      opacity: 0,
      rotate: 90,
    },
  };

  const transition = {
    duration: 0.3,
  };

  const formatPathName = (pathname: string) => {
    if (pathname === "/") return "Dashboard";
    const formattedPathname = pathname.replace("/", "");
    return (
      formattedPathname.charAt(0).toUpperCase() + formattedPathname.slice(1)
    );
  };

  return (
    <>
      <div className="flex flex-row w-full min-h-[72px] bg-background px-8 items-center justify-between">
        <div className="block sm:hidden">
          <BiMenu
            size="28px"
            fill="var(--third-color)"
            className="hover:fill-main-color"
          />
        </div>
        <div className="hidden sm:block flex-col pt-3 p-2">
          <h3 className="text-[12px] text-sixth-color font-normal">
            Pages / {formatPathName(location.pathname)}
          </h3>
          <h1 className="text-[18px] text-main-color font-semibold">
            {formatPathName(location.pathname)}
          </h1>
        </div>
        <div className="flex flex-row justify-center items-center space-x-[1.5rem]">
          <Search />

          <div className="flex flex-row justify-center items-center space-x-[1.2rem]">
            <Notification
              fill="var(--third-color)"
              className="cursor-pointer w-[20px] h-[20px] hover:fill-main-color"
            />

            <AnimatePresence mode="wait">
              {theme === "light" ? (
                <motion.div
                  key="moon"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={iconAnimationVariants}
                  custom={hasMounted}
                  transition={transition}
                >
                  <Moon
                    onClick={toggleTheme}
                    fill="var(--third-color)"
                    className="cursor-pointer w-[18px] h-[18px] hover:fill-main-color"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={iconAnimationVariants}
                  custom={hasMounted}
                  transition={transition}
                >
                  <Sun
                    onClick={toggleTheme}
                    fill="var(--third-color)"
                    className="cursor-pointer w-[18px] h-[18px] hover:fill-main-color"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <img
            src={profile_image}
            alt="profile-image"
            className="w-[2.2rem] h-[2.2rem] rounded-full"
          />
        </div>
      </div>
    </>
  );
};
