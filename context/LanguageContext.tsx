'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper pour définir le cookie avec une durée de validité (ex: 1 an)
const setLanguageCookie = (lang: Language) => {
  const maxAge = 365 * 24 * 60 * 60; // 1 an en secondes
  document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  // Charger la langue sauvegardée au premier chargement
  useEffect(() => {
    const savedLang = localStorage.getItem('horyzion_lang') as Language;
    if (savedLang === 'fr' || savedLang === 'en') {
      setLanguage(savedLang);
      // S'assurer que le cookie est aussi synchro au montage
      setLanguageCookie(savedLang);
    } else {
      // Si aucune langue enregistrée, poser le cookie par défaut
      setLanguageCookie('fr');
    }
  }, []);

  // Changer de langue et enregistrer dans localStorage ET cookie
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('horyzion_lang', lang);
    setLanguageCookie(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personnalisé pour consommer la langue dans n'importe quel composant client
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage doit être utilisé à l\'intérieur de LanguageProvider');
  }
  return context;
};