import { Command } from "cmdk";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  Wallet,
  LineChart,
  ArrowRightLeft,
  Shield,
  Plus,
  Settings,
  LogOut,
  HeartHandshake,
} from "lucide-react";

export const CommandMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 bg-stone-950/50"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-lg shadow-xl border-border-color border overflow-hidden w-[90%] max-w-lg mx-auto mt-20 lg:mt-12"
      >
        <Command.Input
          value={value}
          onValueChange={setValue}
          placeholder="What do you need?"
          className="bg-background relative border-b border-border-color p-3 text-lg w-full text-text-color placeholder:text-text-color focus:outline-none"
        />
        <Command.List className="p-3">
          <Command.Empty className="text-text-color text-[15px]">
            No results found for{" "}
            <span className="text-main-color">"{value}"</span>
          </Command.Empty>

          <Command.Group
            heading="Trading Hub"
            className="text-sm mb-3 text-sixth-color"
          >
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-text-color hover:bg-hover-color rounded items-center gap-2 mt-1">
              <LineChart color="var(--third-color)" className="h-4 w-4" />
              Live Markets
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-text-color hover:bg-hover-color rounded items-center gap-2">
              <ArrowRightLeft color="var(--third-color)" className="h-4 w-4" />
              Quick Swap
            </Command.Item>
          </Command.Group>

          <Command.Group
            heading="Wallet & Profile"
            className="text-sm text-sixth-color mb-3"
          >
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-text-color hover:bg-hover-color rounded items-center gap-2 mt-1">
              <Wallet color="var(--third-color)" className="h-4 w-4" />
              My Portfolio
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-text-color hover:bg-hover-color rounded items-center gap-2">
              <Plus color="var(--third-color)" className="h-4 w-4" />
              Add Assets
            </Command.Item>
          </Command.Group>

          <Command.Group
            heading="Settings & Support"
            className="text-sm text-sixth-color mb-3"
          >
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-text-color hover:bg-hover-color rounded items-center gap-2 mt-1">
              <Shield color="var(--third-color)" className="h-4 w-4" />
              Security Center
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-text-color hover:bg-hover-color rounded items-center gap-2">
              <Settings color="var(--third-color)" className="h-4 w-4" />
              Preferences
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-text-color hover:bg-hover-color rounded items-center gap-2">
              <HeartHandshake color="var(--third-color)" className="h-4 w-4" />
              Support
            </Command.Item>
          </Command.Group>

          <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-background hover:bg-sixth-color bg-main-color rounded items-center gap-2">
            <LogOut color="var(--background)" className="h-4 w-4 ml-[1px]" />
            Log Out
          </Command.Item>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};

export default CommandMenu;
