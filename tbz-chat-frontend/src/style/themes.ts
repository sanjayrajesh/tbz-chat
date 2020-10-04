import { Theme } from "@material-ui/core";
import defaultTheme from "./defaultTheme";
import starWarsThemes from './starWarsThemes';

export type ThemeKey = 'starWarsLight' | 'starWarsDark' | 'default';

type Themes = {
    [key in ThemeKey]: Theme
}

const themes: Themes = {
    default: defaultTheme,
    starWarsDark: starWarsThemes.dark,
    starWarsLight: starWarsThemes.light
}

export default themes;