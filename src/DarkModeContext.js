import React, { createContext, useState } from "react";

export const DarkModeContext = createContext(false);

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <div className={`header-space ${isDarkMode && "dark"}`}>{children}</div>
    </DarkModeContext.Provider>
  );
};
