import { useCallback, useContext } from 'react';
import LanguageContext from '../../components/context/LanguageContext';
import dictionary from '../../language/dictionary';

type Key = keyof typeof dictionary;

const useLanguage = () => {
    const {language} = useContext(LanguageContext);

    const getString = useCallback((key: Key, ...args: string[]) => {
        let value = dictionary[key][language];

        args.forEach(arg => value = value.replace("{}", arg));

        return value;
    }, [language]);

    return getString
}

export default useLanguage;