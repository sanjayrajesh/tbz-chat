import { useCallback, useContext } from 'react';
import LanguageContext from '../../components/context/LanguageContext';
import dictionary from '../../dictionary';

type Dictionary = typeof dictionary;

type Key = keyof Dictionary;

const useLanguage = () => {
    const {language} = useContext(LanguageContext);

    const getString = useCallback((key: Key) => {
        const languageItem = dictionary[key];

        if(languageItem) {
            const itemValue = languageItem[language];

            if(itemValue) {
                return itemValue
            }
        }

        return `??${key}??`
    }, [language]);

    return getString
}

export default useLanguage;