import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { Language } from '../../language/language';

const LANGUAGE_KEY = "language";

type LanguageContextValue = {
    language: Language,
    setLanguage: (language: Language) => void
}

const initialValue: LanguageContextValue = {
    language: "en",
    setLanguage: undefined!
}

const LanguageContext = createContext(initialValue);

type LanguageContextProviderProps = {
    children: ReactNode
}

export const LanguageContextProvider = (props: LanguageContextProviderProps) => {

    const [language, setLanguage] = useState<Language>(() => localStorage.getItem(LANGUAGE_KEY) as Language || "en");

    useEffect(() => {
        localStorage.setItem(LANGUAGE_KEY, language);
        document.querySelector("html")!.lang = language;
    }, [language]);

    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            {props.children}
        </LanguageContext.Provider>
    )
}

export default LanguageContext
