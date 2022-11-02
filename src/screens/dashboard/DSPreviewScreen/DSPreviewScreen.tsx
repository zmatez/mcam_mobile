import React, {FunctionComponent} from 'react';
import {NavigationProp} from "@react-navigation/native";
import DSTitleBar from "../DSTitle/DSTitleBar";
import DSCameraRequired from "../DSCameraRequired/DSCameraRequired";
import DSCameraTitle from "../DSCameraTitle/DSCameraTitle";
import DSLiveSmall from "./DSLiveSmall/DSLiveSmall";

interface LoginProps {
    navigation: NavigationProp<any>
}

const DSPreviewScreen: FunctionComponent<LoginProps> = ({navigation}) => {
    return (
        <DSTitleBar name={"Podgląd"} navigation={navigation}>
            <DSCameraRequired requiredOnline={false}>
                <DSCameraTitle/>
                <DSLiveSmall></DSLiveSmall>
            </DSCameraRequired>
        </DSTitleBar>
    );
};

export default DSPreviewScreen;
