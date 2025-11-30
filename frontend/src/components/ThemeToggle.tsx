import React from "react";
import { useTheme } from "../hooks/useTheme";
import { FiSun, FiMoon } from "./Icons/Icons";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-full text-gray-700 dark:text-gray-200"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <FiSun className="w-5 h-5" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
