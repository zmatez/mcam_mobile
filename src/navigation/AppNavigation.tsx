import React, {FunctionComponent} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MainScreen from "../screens/main/MainScreen/MainScreen";
import LoginScreen from "../screens/login/LoginScreen/LoginScreen";
import {useAuth} from "../contexts/AuthContext";
import DashAccNavigation from "./DashAccNavigation";

const {Navigator, Screen} = createNativeStackNavigator();

interface AppNavigationProps {
}

const AppNavigation: FunctionComponent<AppNavigationProps> = ({}) => {
    const {cookiesCache} = useAuth();

    return (
            <Navigator initialRouteName={cookiesCache ? "DashAcc" : "Home"} screenOptions={{headerShown:false}}>
                <Screen name={"Home"} component={MainScreen}/>
                <Screen name={"Login"} component={LoginScreen}/>
                <Screen name={"DashAcc"} component={DashAccNavigation}/>
            </Navigator>
    );
};

export default AppNavigation;
