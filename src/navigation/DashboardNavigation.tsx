import React, {FunctionComponent} from 'react';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import PreviewIcon from "../assets/icons/material/camera_indoor.svg"
import HistoryIcon from "../assets/icons/material/history.svg"
import SettingsIcon from "../assets/icons/material/settings.svg"
import DSPreviewScreen from "../screens/dashboard/DSPreviewScreen/DSPreviewScreen";
import DefTheme from "../styles/DefTheme";

interface OwnProps {}

type Props = OwnProps;

const Tab = createMaterialBottomTabNavigator();
const iconSize = 22;

const DashboardNavigation: FunctionComponent<Props> = (props) => {
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
            elevation: 0
          }}
          activeColor={DefTheme.colors.primary1}
          inactiveColor={DefTheme.colors.secondary1}
      >
        <Tab.Screen
            name="DSPreview"
            component={DSPreviewScreen}
            options={{
              tabBarLabel: 'Podgląd',
              tabBarIcon: ({ color }) => (
                  <PreviewIcon fill={color} width={iconSize} height={iconSize}/>
              ),
            }}
        />
        <Tab.Screen
            name="DSHistory"
            component={DSPreviewScreen}
            options={{
              tabBarLabel: 'Historia',
              tabBarIcon: ({ color }) => (
                  <HistoryIcon fill={color} width={iconSize} height={iconSize}/>
              ),
            }}
        />
        <Tab.Screen
            name="DSSettings"
            component={DSPreviewScreen}
            options={{
              tabBarLabel: 'Ustawienia',
              tabBarIcon: ({ color }) => (
                  <SettingsIcon fill={color} width={iconSize} height={iconSize}/>
              ),
            }}
        />
      </Tab.Navigator>
  );
};

export default DashboardNavigation;
