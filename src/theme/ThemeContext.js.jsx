import { createContext, useContext, useEffect, useState } from "react";

const storageKey = "theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem(storageKey) || "light";
};

const applyTheme = (mode) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(mode);
};

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
