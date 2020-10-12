import React, { createContext, ReactNode, useState } from 'react'
import { Language } from '../../language/language';

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

    const [language, setLanguage] = useState<Language>('en');

    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            {props.children}
        </LanguageContext.Provider>
    )
}

export default LanguageContext
