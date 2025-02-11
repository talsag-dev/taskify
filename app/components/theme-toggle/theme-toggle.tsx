"use client";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button
      className=" text-black dark:text-white py-2 px-4 rounded"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
