import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("appLang") || "en-US",
  );

  useEffect(() => {
    localStorage.setItem("appLang", language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dir = language.startsWith("ar") ? "rtl" : "ltr";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
