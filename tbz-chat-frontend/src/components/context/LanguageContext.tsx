import React, { createContext, ReactNode, useState } from 'react'

type LanguageContextValue = {
    language: string,
    setLanguage: (language: string) => void
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

    const [language, setLanguage] = useState('en');

    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            {props.children}
        </LanguageContext.Provider>
    )
}

export default LanguageContext
