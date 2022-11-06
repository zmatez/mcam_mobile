import React, {FunctionComponent, useEffect, useState} from 'react';
import {NavigationProp} from "@react-navigation/native";
import DSTitleBar from "../DSTitle/DSTitleBar";
import DSCameraRequired from "../DSCameraRequired/DSCameraRequired";
import DSCameraTitle from "../DSCameraTitle/DSCameraTitle";
import DSLiveSmall from "./DSLiveSmall/DSLiveSmall";
import DSExpandableInfo from "../DSExpandableInfo/DSExpandableInfo";
import StreamIcon from "../../../assets/icons/material/stream.svg"
import ConnectionIcon from "../../../assets/icons/material/connection.svg"
import PingIcon from "../../../assets/icons/material/ping.svg"
import PowerIcon from "../../../assets/icons/material/power.svg"
import LampIcon from "../../../assets/icons/material/light.svg"
import TakePicIcon from "../../../assets/icons/material/take_picture.svg"
import PhotoIcon from "../../../assets/icons/material/image.svg"
import LinkIcon from "../../../assets/icons/material/link.svg"
import TemperatureIcon from "../../../assets/icons/material/temperature.svg"
import {useDashboardFunc} from "../../../contexts/DashboardFuncContext";
import ProgressLoader from "../../../components/progress/ProgressLoader";
import {ScrollView, Text, View} from "react-native";
import {CameraInfoOffline, CameraInfoOnline} from "../../../data/camera";
import DefTheme from "../../../styles/DefTheme";
import styles from "./styles";
import DSInfoBlock from "./DSInfoBlock/DSInfoBlock";
import dayjs from "dayjs";
import {useDashboard} from "../../../contexts/DashboardContext";
import {Messages} from "../../../data/messages";
import DSTemperatureInfo from "./DSTemperatureInfo/DSTemperatureInfo";
import Collapsible from "react-native-collapsible";
import {picNameToDate} from "../../../util/utils";

interface LoginProps {
    navigation: NavigationProp<any>
}

const previewIconSize = 24;
const DSPreviewScreen: FunctionComponent<LoginProps> = ({navigation}) => {
    const {send} = useDashboard();
    const {cameraInfo, selectedCamera} = useDashboardFunc();
    const [connType, setConnType] = useState<"ping" | "rssi">("ping");
    const [flashLoading, setFlashLoading] = useState(false);

    useEffect(() => {
        if (!selectedCamera) {
            return
        }

        setFlashLoading(false);
    }, [cameraInfo])

    let pingColor = "#000000";
    let rssiColor = "#000000";
    let connColor = "#000000";

    if (cameraInfo instanceof CameraInfoOnline) {
        connColor = (cameraInfo.ping < 100 ? "#7BC370" : (cameraInfo.ping < 300 ? "#A5C372" : (cameraInfo.ping < 600 ? "#C2AE78" : cameraInfo.ping < 1000 ? "#C48B6A" : "#C36F6F")));
        pingColor = (cameraInfo.ping < 100 ? "#33df1e" : (cameraInfo.ping < 300 ? "#A4D318" : (cameraInfo.ping < 600 ? "#dfa81e" : cameraInfo.ping < 1000 ? "#df511e" : "#df1e1e")));
        rssiColor = (cameraInfo.rssi === undefined ? DefTheme.colors.secondary1 : (cameraInfo.rssi >= -55 ? "#33df1e" : (cameraInfo.rssi >= -65 ? "#A4D318" : (cameraInfo.rssi >= -75 ? "#dfa81e" : cameraInfo.rssi < -85 ? "#df511e" : "#df1e1e"))))
    }

    const toggleFlash = () => {
        if (flashLoading || !selectedCamera) {
            return
        }
        setFlashLoading(true)
        send(Messages.REQUEST_LED, {
            camera_id: selectedCamera.id,
            state: cameraInfo instanceof CameraInfoOnline ? !cameraInfo.flash : false
        });
    }

    const workTimeReadable = cameraInfo ? (cameraInfo.lastLog && cameraInfo.lastLog.type === 'login') ? dayjs(cameraInfo.lastLog.date).fromNow(true) : "Od niedawna" : null;
    const lastPicDate = cameraInfo instanceof CameraInfoOnline ? (picNameToDate(cameraInfo.lastPictures[0])) : null;
    return (
        <DSTitleBar name={"Podgląd"} navigation={navigation}>
            <DSCameraRequired requiredOnline={false}>
                <ScrollView>
                    <DSCameraTitle/>
                    <DSLiveSmall></DSLiveSmall>
                    {cameraInfo instanceof CameraInfoOnline ? (
                        <>
                            <Collapsible collapsed={!lastPicDate || new Date().getTime() > lastPicDate.getTime()}>
                                <DSInfoBlock icon={PhotoIcon} title={"Ostatnie zdjęcie"} clickable={true}
                                             onClick={() => {/*todo recent photo navigation*/
                                             }} style={{backgroundColor: DefTheme.colors.primary5}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text style={styles.dataText}>{dayjs(lastPicDate).fromNow()}</Text>
                                        <LinkIcon width={16} height={16} fill={DefTheme.colors.secondary1}
                                                  style={{marginLeft: 8}}/>
                                    </View>
                                </DSInfoBlock>
                            </Collapsible>
                            <DSExpandableInfo title={"Wiadomości"} icons={<View style={styles.expandableIcons}>
                                <StreamIcon style={styles.expandableIcon} width={previewIconSize}
                                            height={previewIconSize}
                                            fill={cameraInfo.watchers > 0 ? DefTheme.colors.stream : DefTheme.colors.secondary1}/>
                                <ConnectionIcon style={styles.expandableIcon} width={previewIconSize - 1}
                                                height={previewIconSize - 1} fill={connColor}/>
                            </View>}>
                                <>
                                    <DSInfoBlock icon={PingIcon} title={"Połączenie"} clickable={true}
                                                 onClick={() => setConnType(connType == "ping" ? "rssi" : "ping")}>
                                        {connType == "ping" ?
                                            (<Text
                                                style={[styles.dataText, {color: pingColor}]}>{cameraInfo.ping + "ms"}</Text>)
                                            :
                                            (<Text style={[styles.dataText, {color: rssiColor}]}>
                                                {(cameraInfo.rssi === undefined ? "" : (cameraInfo.rssi >= -55 ? "Bardzo szybkie" : (cameraInfo.rssi >= -65 ? "Szybkie" : (cameraInfo.rssi >= -75 ? "Średnie" : cameraInfo.rssi < -85 ? "Wolne" : "Bardzo wolne"))))}
                                            </Text>)}
                                    </DSInfoBlock>
                                    <DSInfoBlock icon={StreamIcon} title={"Transmisja"}>
                                        <Text
                                            style={styles.dataText}>{cameraInfo.watchers == 0 ? "Brak oglądających" : cameraInfo.watchers + " oglądający"}</Text>
                                    </DSInfoBlock>
                                    <DSInfoBlock icon={PowerIcon} title={"Czas pracy"}>
                                        <Text style={styles.dataText}>{workTimeReadable}</Text>
                                    </DSInfoBlock>
                                </>
                            </DSExpandableInfo>
                            <DSExpandableInfo title={"Akcje"} icons={<View style={styles.expandableIcons}>
                                <LampIcon style={styles.expandableIcon} width={previewIconSize}
                                          height={previewIconSize}
                                          fill={cameraInfo.flash ? DefTheme.colors.flash : DefTheme.colors.secondary1}/>
                            </View>}>

                                <View style={styles.actions}>
                                    <DSInfoBlock icon={LampIcon} title={"Dioda"} style={{
                                        flexGrow: 1,
                                        marginRight: 4,
                                        backgroundColor: DefTheme.colors.primary5
                                    }} clickable={true} onClick={() => {
                                        toggleFlash()
                                    }} highlighted={cameraInfo.flash}>
                                        <Text
                                            style={[styles.dataText, cameraInfo.flash ? {color: DefTheme.colors.flash} : null]}>{flashLoading ? (
                                            <ProgressLoader size={16}
                                                            show={true}/>) : (cameraInfo.flash ? "Wł" : "Wył")}</Text>
                                    </DSInfoBlock>
                                    <DSInfoBlock icon={TakePicIcon} title={"Zrób zdjęcie"} style={{
                                        flexGrow: 1,
                                        marginLeft: 4,
                                        backgroundColor: DefTheme.colors.primary5
                                    }} clickable={true} onClick={() => {/*todo take a pic*/
                                    }}>
                                        <></>
                                    </DSInfoBlock>
                                </View>
                            </DSExpandableInfo>
                            <DSExpandableInfo title={"Temperatura"} icons={<View style={styles.expandableIcons}>
                                <Text style={styles.tempText}>{cameraInfo.temperature.toFixed(1)}°C</Text>
                                <TemperatureIcon style={styles.expandableIcon} width={previewIconSize}
                                                 height={previewIconSize}
                                                 fill={DefTheme.colors.secondary1}/>
                            </View>}>

                                <DSTemperatureInfo/>
                            </DSExpandableInfo>
                        </>
                    ) : (cameraInfo instanceof CameraInfoOffline ? (
                                <>
                                    <DSInfoBlock icon={ConnectionIcon} title={"Ostatnie połączenie"}>
                                        <Text
                                            style={styles.dataText}>{cameraInfo && cameraInfo.lastLog ? dayjs(cameraInfo.lastLog.date).fromNow() : "Nigdy"}</Text>
                                    </DSInfoBlock>
                                </>
                            ) :
                            (<View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <ProgressLoader show={true} size={64}/>
                            </View>)
                    )}
                </ScrollView>
            </DSCameraRequired>
        </DSTitleBar>
    );
};

export default DSPreviewScreen;
