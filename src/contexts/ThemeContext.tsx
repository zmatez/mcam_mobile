import React, {
    createContext,
    FunctionComponent,
    MutableRefObject,
    ReactNode,
    useContext,
    useRef,
    useState
} from 'react';
import {View, ViewStyle} from "react-native";

interface ThemeContextProviderProps {
    children: ReactNode
}

type Props = ThemeContextProviderProps;

export type Theme = "light" | "dark" | "system";

export interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    userAccent: boolean;
    setUserAccent: (userAccent: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export function useThemeContext() {
    return useContext(ThemeContext) || {} as ThemeContextProps;
}

const ThemeContextProvider: FunctionComponent<Props> = ({children}) => {
    const [theme, _setTheme] = useState<Theme>("light");
    const [userAccent, _setUserAccent] = useState<boolean>(false);

    const setTheme = (theme: Theme) => {
        _setTheme(theme);
    }
    const setUserAccent = (userAccent: boolean) => {
        _setUserAccent(userAccent);
    }

    const contextProps: ThemeContextProps = {
        theme,
        setTheme,
        userAccent,
        setUserAccent
    }

    return (
        <ThemeContext.Provider value={contextProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
