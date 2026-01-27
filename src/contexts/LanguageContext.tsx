import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '../lib/i18n/translations';

interface LanguageContextType {
       language: Language;
       setLanguage: (lang: Language) => void;
       t: (key: TranslationKey) => string;
       toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
       const [language, setLanguage] = useState<Language>('zh');

       const t = (key: TranslationKey) => {
              return translations[language][key] || key;
       };

       const toggleLanguage = () => {
              setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
       };

       return (
              <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
                     {children}
              </LanguageContext.Provider>
       );
};

export const useLanguage = () => {
       const context = useContext(LanguageContext);
       if (context === undefined) {
              throw new Error('useLanguage must be used within a LanguageProvider');
       }
       return context;
};
