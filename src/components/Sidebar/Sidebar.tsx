import { RouteSelect } from "./RouteSelect";
import { ReactComponent as AppLogo } from "@/assets/urCrypto-logo.svg";

export const Sidebar = () => {
  return (
    <div className="hidden md:block bg-background sticky top-0 left-0 h-[100vh] border-r-[1.5px] border-border-color">
      <div className="flex justify-center pb-12 pt-6">
        <a href="/">
          <AppLogo fill="var(--text-color)" className="w-40" />
        </a>
      </div>
      <RouteSelect />
    </div>
  );
};
