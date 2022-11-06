import React, {FunctionComponent} from 'react';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import PreviewIcon from "../assets/icons/material/camera_indoor.svg"
import HistoryIcon from "../assets/icons/material/history.svg"
import SettingsIcon from "../assets/icons/material/settings.svg"
import ServerOfflineIcon from "../assets/icons/material/server_offline.svg"
import DSPreviewScreen from "../screens/dashboard/DSPreviewScreen/DSPreviewScreen";
import DefTheme from "../styles/DefTheme";
import {useDashboard} from "../contexts/DashboardContext";
import ProgressLoader from "../components/progress/ProgressLoader";
import {Text, View} from "react-native";
import MButton from "../components/forms/MButton";
import DashboardPreviewNav from "./DashboardPreviewNav";
import {NavigationProp} from "@react-navigation/native";

interface NavProps {
    navigation: NavigationProp<any>,
}

const Tab = createMaterialBottomTabNavigator();
const iconSize = 22;

const DashboardNavigation: FunctionComponent<NavProps> = ({navigation}) => {
    const {isConnected, isDead, reconnect} = useDashboard();

    if (isDead) {
        return (
            <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ServerOfflineIcon width={64} height={64} fill={DefTheme.colors.secondary0}/>
                <Text style={{fontFamily: "URWGeometric-700", fontSize: 20}}>Brak połączenia z serwerem</Text>
                <MButton style={{marginTop: 10}} text={"Spróbuj ponownie"} onClick={() => {
                    console.log("Reconnecting");
                    reconnect()
                }}/>
            </View>
        )
    }
    if (!isConnected) {
        return (
            <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ProgressLoader show={true} size={64}/>
            </View>
        )
    }

    return (
        <Tab.Navigator
            initialRouteName="DSPreview"
            labeled={false}
            barStyle={{
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 0,
                paddingHorizontal: 20,
                height: 60,
                elevation: 0,
                display: "flex"
            }}
            activeColor={DefTheme.colors.primary1}
            inactiveColor={DefTheme.colors.secondary1}

        >
            <Tab.Screen
                name="DSPreview"
                component={DashboardPreviewNav}
                options={{
                    tabBarLabel: 'Podgląd',
                    tabBarIcon: ({color}) => (
                        <PreviewIcon fill={color} width={iconSize} height={iconSize}/>
                    ),

                }}
            />
            <Tab.Screen
                name="DSHistory"
                component={DSPreviewScreen}
                options={{
                    tabBarLabel: 'Historia',
                    tabBarIcon: ({color}) => (
                        <HistoryIcon fill={color} width={iconSize} height={iconSize}/>
                    ),
                }}
            />
            <Tab.Screen
                name="DSSettings"
                component={DSPreviewScreen}
                options={{
                    tabBarLabel: 'Ustawienia',
                    tabBarIcon: ({color}) => (
                        <SettingsIcon fill={color} width={iconSize} height={iconSize}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default DashboardNavigation;
