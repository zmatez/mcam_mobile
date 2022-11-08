import React, {FunctionComponent, ReactNode} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import SunIcon from "../../../../../assets/icons/material/weather_sun.svg"
import MoonIcon from "../../../../../assets/icons/material/weather_moon.svg"

interface ExpandProps {

}

const size = 20;
const AccountThemeChooser: FunctionComponent<ExpandProps> = ({}) => {
    const setTheme = (theme: "light" | "dark" | "system") => {

    }

    return (
        <View style={[styles.box]}>
            <View style={[styles.inner]}>
                <View style={styles.circle}/>
                <TouchableOpacity onPress={() => setTheme("light")}><SunIcon width={size} height={size} fill={"#000000"} style={styles.icon}/></TouchableOpacity>
                <TouchableOpacity onPress={() => setTheme("dark")}><MoonIcon width={size} height={size} fill={"#000000"} style={styles.icon}/></TouchableOpacity>
            </View>
        </View>
    );
};

export default AccountThemeChooser;
