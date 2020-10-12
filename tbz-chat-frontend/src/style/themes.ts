import defaultTheme from "./defaultTheme";
import starWarsThemes from './starWarsThemes';

export type Variant = "light" | "dark";

const themes = {
    default: defaultTheme,
    starWarsDark: starWarsThemes.dark,
    starWarsLight: starWarsThemes.light
}

export default themes;