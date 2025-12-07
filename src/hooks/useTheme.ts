import { useState, useEffect } from "react";

export type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved as Theme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
};
