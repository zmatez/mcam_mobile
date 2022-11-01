import React, {FunctionComponent, ReactNode} from 'react';
import {Text, TouchableNativeFeedback, View} from "react-native";
import {DrawerActions, NavigationProp} from "@react-navigation/native";
import styles from "./styles";
import MenuIcon from "../../../assets/icons/material/menu.svg"
import {SafeAreaView} from "react-native-safe-area-context";
import DefTheme from "../../../styles/DefTheme";
import defTheme from "../../../styles/DefTheme";
import {useDashboard} from "../../../contexts/DashboardContext";
import ProgressLoader from "../../../components/progress/ProgressLoader";

interface DSTitleBarProps {
    name: string;
    children: ReactNode;
    navigation: NavigationProp<any>
}

const DSTitleBar: FunctionComponent<DSTitleBarProps> = ({name, children, navigation}) => {
    const {isConnected} = useDashboard();

    return (
        <SafeAreaView style={{flexGrow: 1, overflow: "hidden"}}>
            <View style={styles.titleView}>
                <TouchableNativeFeedback onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer());
                }}><MenuIcon style={styles.menu} fill={DefTheme.colors.primary0} width={24} height={24}/></TouchableNativeFeedback>
                <Text style={styles.title}>{name}<Text style={{color: DefTheme.colors.primary1}}>.</Text></Text>
                <View style={styles.iconsWrapper}>
                    <ProgressLoader size={36} color={defTheme.colors.primary1} show={!isConnected}/>
                </View>
            </View>
            <View style={{flexGrow: 1, overflow: "hidden", padding: 8}}>
                {children}
            </View>
        </SafeAreaView>
    );
};

export default DSTitleBar;
