import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

const getinitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const storedDarkMode = localStorage.getItem("darkTheme");

  // se n tiver nada no localStorage ele pega a preferencia do usuário atraves do tema do navegador, se é  escuro ou claro
  if (storedDarkMode === null) {
    return prefersDarkMode;
  }

  return storedDarkMode === "true"; //transforma a string "true" em boolean true
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getinitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("cat");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);

    localStorage.setItem("darkTheme", newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
