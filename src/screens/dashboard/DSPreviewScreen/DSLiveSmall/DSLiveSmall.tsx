import React, {FunctionComponent} from 'react';
import {ImageBackground, View} from "react-native";
import styles from "./styles";
import {useDashboardFunc} from "../../../../contexts/DashboardFuncContext";
import PlayIcon from "../../../../assets/icons/material/play.svg"
import PauseIcon from "../../../../assets/icons/material/play.svg"
import DefTheme from "../../../../styles/DefTheme";

interface LiveProps {
}

const controlsIconsSize = 20;
const DSLiveSmall: FunctionComponent = () => {
    const {selectedCamera} = useDashboardFunc();

    if(!selectedCamera) {
        return null
    }

    return (
        <View style={styles.box}>
            <View style={styles.boxInner}>
                <ImageBackground style={styles.stream} source={require("../../../../assets/images/camera_preview.jpg")}>

                </ImageBackground>
                <View style={styles.controls}>
                    <PlayIcon width={controlsIconsSize} height={controlsIconsSize} fill={DefTheme.colors.secondary5}/>
                </View>
            </View>
        </View>
    );
};

export default DSLiveSmall;
