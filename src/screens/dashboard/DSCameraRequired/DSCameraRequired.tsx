import React, {FunctionComponent, ReactNode} from 'react';
import {useDashboardFunc} from "../../../contexts/DashboardFuncContext";
import {Text, View} from "react-native";
import SelectIcon from "../../../assets/icons/material/select.svg";
import OfflineIcon from "../../../assets/icons/material/offline.svg";
import DefTheme from "../../../styles/DefTheme";
import styles from "./styles";
import MButton from "../../../components/forms/MButton";
import {DrawerActions, useNavigation} from "@react-navigation/native";

interface CameraReqProps {
    children: ReactNode;
    requiredOnline?: boolean;
}

const iconSize = 48;

const DSCameraRequired: FunctionComponent<CameraReqProps> = ({children, requiredOnline = true}) => {
    const {selectedCamera} = useDashboardFunc();
    const navigation = useNavigation();

    return selectedCamera && (selectedCamera.online || !requiredOnline) ? (<>{children}</>) : (
        <View style={styles.box}>
            {selectedCamera == null ? <SelectIcon width={iconSize} height={iconSize} fill={DefTheme.colors.secondary1}/> : <OfflineIcon width={iconSize} height={iconSize} fill={DefTheme.colors.secondary1}/>}
            <Text style={styles.text}>{selectedCamera == null ? "Nie wybrano kamery" : "Kamera jest offline"}</Text>
            {selectedCamera == null ? (
                <MButton text={"Wybierz kamerę"} onClick={() => {
                    navigation.dispatch(DrawerActions.openDrawer());
                }}/>
            ) : null}
        </View>
    )
};

export default DSCameraRequired;
