import React, {FunctionComponent} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DSPreviewScreen from "../screens/dashboard/DSPreviewScreen/DSPreviewScreen";
import StreamContext from "../contexts/StreamContext";
import DSFullscreenScreen from "../screens/dashboard/DSFullscreenScreen/DSFullscreenScreen";

interface OwnProps {
}

type Props = OwnProps;

const {Navigator, Screen} = createNativeStackNavigator();


const DashboardPreviewNav: FunctionComponent<Props> = (props) => {
    return (
        <StreamContext>
            <Navigator initialRouteName={"Preview"} screenOptions={{headerShown: false}}>
                <Screen name={"Preview"} component={DSPreviewScreen}/>
                <Screen name={"Fullscreen"} component={DSFullscreenScreen} options={{orientation: "landscape"}}/>
            </Navigator>
        </StreamContext>
    );
};

export default DashboardPreviewNav;
