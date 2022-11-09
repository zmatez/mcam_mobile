import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";
import LightIcon from "../../../../../assets/icons/material/theme_light.svg"
import DarkIcon from "../../../../../assets/icons/material/theme_dark.svg"
import SystemIcon from "../../../../../assets/icons/material/theme_system.svg"

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
                <TouchableOpacity onPress={() => setTheme("light")}><LightIcon width={size} height={size}
                                                                               fill={"#000000"}
                                                                               style={styles.icon}/></TouchableOpacity>
                <TouchableOpacity onPress={() => setTheme("dark")}><DarkIcon width={size} height={size} fill={"#000000"}
                                                                             style={styles.icon}/></TouchableOpacity>
                <TouchableOpacity onPress={() => setTheme("system")}><SystemIcon width={size} height={size}
                                                                                 fill={"#000000"} style={styles.icon}/></TouchableOpacity>
            </View>
        </View>
    );
};

export default AccountThemeChooser;
