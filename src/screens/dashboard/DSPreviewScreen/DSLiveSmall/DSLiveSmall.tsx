import React, {FunctionComponent, useEffect, useRef} from 'react';
import {ImageBackground, Text, TextInput, TouchableNativeFeedback, View} from "react-native";
import styles from "./styles";
import {useDashboardFunc} from "../../../../contexts/DashboardFuncContext";
import PlayIcon from "../../../../assets/icons/material/play.svg"
import PauseIcon from "../../../../assets/icons/material/pause.svg"
import FullscreenIcon from "../../../../assets/icons/material/fullscreen.svg"
import DefTheme from "../../../../styles/DefTheme";
import {CameraInfoOnline} from "../../../../data/camera";
import ProgressLoader from "../../../../components/progress/ProgressLoader";
import {useStreamContext} from "../../../../contexts/StreamContext";
import {NavigationProp, useNavigation} from "@react-navigation/native";

interface LiveProps {
}

const controlsIconsSize = 24;
const DSLiveSmall: FunctionComponent = () => {
    const {selectedCamera, cameraInfo, streaming, setStreaming} = useDashboardFunc();
    const {loading, liveFrameRef, onFpsEvent} = useStreamContext();
    const fpsTextRef = useRef<TextInput | null>(null);
    const navigation: NavigationProp<any> = useNavigation();

    useEffect(() => {
        setStreaming(null);
    }, [])

    onFpsEvent((fps) => {
        const text = fpsTextRef.current;
        if (text) {
            text.setNativeProps({title: fps + "fps"})
        }
    })


    if (!selectedCamera) {
        return null
    }

    const toggleFullscreen = () => {
        navigation.navigate("Fullscreen")
    }

    return (
        <View style={styles.box}>
            <View style={styles.boxInner}>
                <ImageBackground fadeDuration={0} style={styles.stream}
                                 source={require("../../../../assets/images/camera_preview.jpg")} imageRef={(image) => {
                    liveFrameRef.current = image
                }}>
                    {streaming ? <TextInput style={styles.fpsCounter} ref={fpsTextRef} pointerEvents={"none"}
                                            editable={false}></TextInput> : null}
                    <ProgressLoader show={loading} size={64} color={DefTheme.colors.secondary5}/>
                </ImageBackground>
                <View style={styles.controls}>
                    <TouchableNativeFeedback onPress={() => {
                        setStreaming(!streaming)
                    }}>
                        {streaming ?
                            <PauseIcon style={styles.icon} width={controlsIconsSize} height={controlsIconsSize}
                                       fill={DefTheme.colors.secondary5}/>
                            :
                            <PlayIcon style={styles.icon} width={controlsIconsSize} height={controlsIconsSize}
                                      fill={DefTheme.colors.secondary5}/>}
                    </TouchableNativeFeedback>

                    <View style={styles.qualityBox}>
                        <Text
                            style={styles.qualityText}>{cameraInfo instanceof CameraInfoOnline ? cameraInfo.format : null}</Text>
                    </View>
                    <TouchableNativeFeedback onPress={() => toggleFullscreen()}>
                        <FullscreenIcon style={styles.icon} width={controlsIconsSize - 4} height={controlsIconsSize - 4}
                                        fill={DefTheme.colors.secondary5}/>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View>
    );
};

export default DSLiveSmall;
