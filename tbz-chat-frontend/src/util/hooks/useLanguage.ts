import { useCallback, useContext } from 'react';
import LanguageContext from '../../components/context/LanguageContext';
import dictionary from '../../dictionary';

type Dictionary = typeof dictionary;

type Key = keyof Dictionary;

const useLanguage = () => {
    const {language} = useContext(LanguageContext);

    const getString = useCallback((key: Key, ...args: string[]) => {
        const languageItem = dictionary[key];

        if(languageItem) {
            let itemValue = languageItem[language];

            if(itemValue) {
                args.forEach(arg => itemValue = itemValue.replace("{}", arg));

                return itemValue
            }
        }

        return `??${key}??`
    }, [language]);

    return getString
}

export default useLanguage;