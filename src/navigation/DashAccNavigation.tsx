import React, {FunctionComponent} from 'react';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createDrawerNavigator} from '@react-navigation/drawer';
import DashAccDrawer from "./DashboardDrawer/DashAccDrawer";
import DashboardNavigation from "./DashboardNavigation";
import DashboardContext from "../contexts/DashboardContext";
import DashboardFuncContext from "../contexts/DashboardFuncContext";
import AccountScreen from "../screens/account/AccountScreen/AccountScreen";
import AddCameraContext from "../contexts/AddCameraContext";

interface OwnProps {
}

type Props = OwnProps;

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator()
const iconSize = 20;

const DashAccNavigation: FunctionComponent<Props> = (props) => {
    return (
        <DashboardContext>
            <DashboardFuncContext>
                <AddCameraContext>
                    <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName={"Dashboard"}
                                      drawerContent={props => <DashAccDrawer {...props} />}>
                        <Drawer.Screen name={"Dashboard"} component={DashboardNavigation}/>
                        <Drawer.Screen name={"Account"} component={AccountScreen} options={{swipeEnabled: false}}/>
                    </Drawer.Navigator>
                </AddCameraContext>
            </DashboardFuncContext>
        </DashboardContext>
    );
};

export default DashAccNavigation;
