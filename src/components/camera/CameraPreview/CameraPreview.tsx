import React, {FunctionComponent} from 'react';
import {Camera} from "../../../data/camera";
import {ImageBackground, Text, TouchableNativeFeedback, View} from "react-native";
import styles from "./styles";
import {useDashboardFunc} from "../../../contexts/DashboardFuncContext";
import DefTheme from "../../../styles/DefTheme";
import {DrawerActions, useNavigation} from "@react-navigation/native";

interface CameraProps {
    camera: Camera
}

const CameraPreview: FunctionComponent<CameraProps> = ({camera}) => {
    const {selectedCamera, selectCamera} = useDashboardFunc();
    const navigation = useNavigation();

    return (
        <TouchableNativeFeedback onPress={() => {
            selectCamera(camera);
            navigation.dispatch(DrawerActions.closeDrawer());
        }}>
            <View style={[styles.box, (selectedCamera == camera ? {backgroundColor: DefTheme.colors.primary4} : null)]}>
                <ImageBackground source={require("../../../assets/images/camera_preview.jpg")} style={styles.image}/>
                <Text style={styles.title}>{camera.name}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

export default CameraPreview;
