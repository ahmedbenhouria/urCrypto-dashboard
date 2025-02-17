import { useState } from "react";
import { CommandMenu } from "./CommandMenu";
import { ReactComponent as SearchIcon } from "@/assets/search-icon.svg";
import { ReactComponent as Cmdk } from "@/assets/cmdk-icon.svg";

export const Search = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <form className="hidden lg:flex relative items-center w-[13rem]">
        <div className="relative w-full">
          <input
            onFocus={(e) => {
              e.target.blur();
              setOpen(true);
            }}
            type="search"
            placeholder="Search"
            className="w-[13rem] h-[38px] rounded-full pl-10 text-[12px] font-normal placeholder-fourth-color text-fourth-color bg-fifth-color"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pr-4">
            <SearchIcon fill="var(--main-color)" className="w-[12px]" />
          </div>
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pr-4">
            <Cmdk fill="var(--main-color)" className="w-[20px]" />
          </div>
        </div>
      </form>
      <SearchIcon
        onClick={() => {
          setOpen(true);
        }}
        fill="var(--third-color)"
        className="block lg:hidden w-[18px] h-[18px] hover:fill-main-color"
      />
      <CommandMenu open={open} setOpen={setOpen} />
    </div>
  );
};
