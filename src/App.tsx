import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Dashboard } from "@/pages/Dashboard";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { TopBar } from "@/components/TopBar/TopBar";
import { Markets } from "@/pages/Markets";
import { Transactions } from "@/pages/Transactions";
import { Profile } from "@/pages/Profile";
import { Setting } from "@/pages/Setting";

function App() {
  const initialState = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState<string>(initialState);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px,_1fr] text-text-color bg-fifth-color w-full h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex flex-col">
        <TopBar toggleTheme={toggleTheme} theme={theme} />
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/markets" element={<Markets />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  );
};
