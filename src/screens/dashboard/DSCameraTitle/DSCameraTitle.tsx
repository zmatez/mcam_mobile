import React, {FunctionComponent} from 'react';
import {useDashboardFunc} from "../../../contexts/DashboardFuncContext";
import {Text, View} from "react-native";
import CameraIcon from "../../../assets/icons/material/camera.svg"
import styles from "./styles";
import DefTheme from "../../../styles/DefTheme";

interface CameraTitleProps {
}

const DSCameraTitle: FunctionComponent<CameraTitleProps> = (props) => {
    const {selectedCamera} = useDashboardFunc();

    if(!selectedCamera) {
        return null;
    }

    return (
        <View style={styles.box}>
            <CameraIcon width={24} height={24} fill={DefTheme.colors.secondary0}/>
            <Text style={styles.title}>{selectedCamera.name}</Text>
            <Text
                style={[styles.status, {color: selectedCamera.online ? DefTheme.colors.primary1 : DefTheme.colors.secondary1}]}>{selectedCamera.online ? "online" : "offline"}</Text>
        </View>
    );
};

export default DSCameraTitle;
