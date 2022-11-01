import React, {FunctionComponent} from 'react';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createDrawerNavigator} from '@react-navigation/drawer';
import DashAccDrawer from "./DashboardDrawer/DashAccDrawer";
import DashboardNavigation from "./DashboardNavigation";
import DashboardContext from "../contexts/DashboardContext";
import DashboardFuncContext from "../contexts/DashboardFuncContext";

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
                <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName={"Dashboard"}
                                  drawerContent={props => <DashAccDrawer {...props} />}>
                    <Drawer.Screen name={"Dashboard"} component={DashboardNavigation}/>
                    <Drawer.Screen name={"Account"} component={DashboardNavigation}/>
                    {/*todo account screen*/}
                </Drawer.Navigator>
            </DashboardFuncContext>
        </DashboardContext>
    );
};

export default DashAccNavigation;
