import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {Animated, LayoutRectangle, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import LightIcon from "../../../../../assets/icons/material/theme_light.svg"
import DarkIcon from "../../../../../assets/icons/material/theme_dark.svg"
import SystemIcon from "../../../../../assets/icons/material/theme_system.svg"
import {Theme, useThemeContext} from "../../../../../contexts/ThemeContext";
import DefTheme from "../../../../../styles/DefTheme";

interface ExpandProps {

}

const size = 16;
const AccountThemeChooser: FunctionComponent<ExpandProps> = ({}) => {
    const {theme, setTheme} = useThemeContext();
    const [layout, setLayout] = useState<({ [theme: string]: LayoutRectangle })>({});
    const firstRef = useRef(false);
    const translation = useRef(new Animated.Value(0)).current;

    const onLayout = (theme: Theme, layoutRect: LayoutRectangle) => {
        layout[theme] = layoutRect;
        setLayout(layout);
    }

    useEffect(() => {
        const currLayout = layout[theme];
        if (!currLayout) {
            return
        }
        Animated.timing(translation, {
            toValue: currLayout.x,
            duration: firstRef.current ? 150 : 0,
            useNativeDriver: true,
        }).start();
        firstRef.current = true;
    }, [layout, theme])

    return (
        <View style={[styles.box]}>
            <View style={[styles.inner]}>
                <Animated.View style={[styles.circle, {transform: [{translateX: translation}]}]}/>
                <TouchableOpacity onLayout={(e) => {
                    onLayout("light", e.nativeEvent.layout)
                }} onPress={() => setTheme("light")}><LightIcon width={size} height={size}
                                                                fill={theme == "light" ? DefTheme.colors.flash : DefTheme.colors.secondary1}
                                                                style={styles.icon}/></TouchableOpacity>
                <TouchableOpacity onLayout={(e) => {
                    onLayout("dark", e.nativeEvent.layout)
                }} onPress={() => setTheme("dark")}><DarkIcon width={size} height={size} fill={theme == "dark" ? DefTheme.colors.flash : DefTheme.colors.secondary1}
                                                              style={styles.icon}/></TouchableOpacity>
                <TouchableOpacity onLayout={(e) => {
                    onLayout("system", e.nativeEvent.layout)
                }} onPress={() => setTheme("system")}><SystemIcon width={size} height={size}
                                                                  fill={theme == "system" ? DefTheme.colors.flash : DefTheme.colors.secondary1} style={styles.icon}
                /></TouchableOpacity>
            </View>
        </View>
    );
};

export default AccountThemeChooser;
