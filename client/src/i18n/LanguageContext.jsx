import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_LANGS, TRANSLATIONS } from './locales';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLangState] = useState(() => {
    try {
      return localStorage.getItem('waymate_global_lang') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  const setLanguage = (langCode) => {
    setCurrentLangState(langCode);
    try {
      localStorage.setItem('waymate_global_lang', langCode);
    } catch (e) {}
  };

  // Translation helper function
  const t = (key, fallback = '') => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    if (langDict && langDict[key]) return langDict[key];
    
    // Fallback to English if missing in current language
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) return enDict[key];

    return fallback || key;
  };

  const currentLangMeta = SUPPORTED_LANGS.find(l => l.code === currentLang) || SUPPORTED_LANGS[0];

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLanguage,
        t,
        currentLangMeta,
        supportedLangs: SUPPORTED_LANGS
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
