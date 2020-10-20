import { useCallback, useContext } from "react";
import LanguageContext from "../../components/context/LanguageContext";
import dictionary from "../../language/dictionary";

const useLanguage = () => {
    const { language } = useContext(LanguageContext);

    const getString = useCallback(
        (key: string, ...args: string[]) => {
            const langObject = dictionary[key];

            if (langObject) {
                let value: string;

                if (typeof langObject === "string") {
                    value = langObject;
                } else {
                    value = langObject[language];
                }

                if (value.length > 0) {
                    args.forEach(
                        (arg) => (value = value.replace("{}", arg))
                    );

                    return value;
                }
            }

            return `?${key}?`;
        },
        [language]
    );

    return getString;
};

export default useLanguage;
