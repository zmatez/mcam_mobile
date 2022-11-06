import React, {FunctionComponent} from 'react';
import {DrawerContentComponentProps} from "@react-navigation/drawer";
import {FlatList, Text, TouchableNativeFeedback, View} from "react-native";
import AvatarIcon from "../../assets/icons/material/avatar.svg"
import RefreshIcon from "../../assets/icons/material/refresh.svg"
import AddIcon from "../../assets/icons/material/add.svg"
import SettingsIcon from "../../assets/icons/material/settings.svg"
import LogoutIcon from "../../assets/icons/material/logout.svg"
import styles from "./styles";
import {useAuth} from "../../contexts/AuthContext";
import DrawerItem from "./DrawerItem/DrawerItem";
import DefTheme from "../../styles/DefTheme";
import {useDashboard} from "../../contexts/DashboardContext";
import ProgressLoader from "../../components/progress/ProgressLoader";
import {useDashboardFunc} from "../../contexts/DashboardFuncContext";
import CameraPreview from "../../components/camera/CameraPreview/CameraPreview";


const DashAccDrawer: FunctionComponent<DrawerContentComponentProps> = (props) => {
    const {cookiesCache, logout} = useAuth();
    const {isConnected} = useDashboard();
    const {cameras, refreshCameraList} = useDashboardFunc();
    if (!cookiesCache) {
        return null;
    }

    return (
        <View style={styles.parent}>
            <View style={styles.avatarHolder}>
                <View style={[styles.avatarBackground, {backgroundColor: '#' + cookiesCache.color}]}></View>
                <View style={styles.avatarImageWrapper}>
                    <AvatarIcon width={48} height={48} style={styles.avatarImage}/>
                    <Text style={styles.avatarText}>{cookiesCache.nick}</Text>
                </View>
            </View>
            <View style={styles.scrollWrapper}>
                <View style={styles.camerasWrapper}>
                    <Text style={styles.camerasTitle}>Twoje kamery</Text>
                    <View style={styles.camerasIcons}>
                        <TouchableNativeFeedback onPress={() => {
                            if(isConnected && cameras != null) {
                                refreshCameraList();
                            }
                        }}><View style={styles.camerasIconWrapper}>{isConnected || cameras == null ?
                            (<RefreshIcon width={16} height={16} style={styles.camerasIcon} fill={DefTheme.colors.secondary1}/>)
                            :
                            (<ProgressLoader size={16} color={DefTheme.colors.primary1} show={true}/>)
                        }</View></TouchableNativeFeedback>
                        <TouchableNativeFeedback><View style={styles.camerasIconWrapper}><AddIcon width={16} height={16} style={styles.camerasIcon} fill={DefTheme.colors.secondary1}/></View></TouchableNativeFeedback>
                    </View>
                </View>
                {cameras == null ? (
                    <View style={styles.scrollInfoCentered}><ProgressLoader show={true} size={32}/></View>
                ) : (cameras.length == 0 ? (
                    <View style={styles.scrollInfoCentered}><Text>Brak kamer</Text></View>
                ) : (
                    <FlatList style={styles.scroll} data={cameras} renderItem={({item, index}) => (
                        <CameraPreview camera={item} key={'cam-' + index}/>
                    )}/>
                ))}
            </View>
            <View style={styles.navigationWrapper}>
                <DrawerItem icon={SettingsIcon} text={"Ustawienia"}
                            selected={props.navigation.getState().routeNames.includes("Konto")} onPress={() => {
                    props.navigation.navigate("Account")
                }}/>
                <DrawerItem icon={LogoutIcon} text={"Wyloguj"}
                            selected={props.navigation.getState().routeNames.includes("Konto")} onPress={() => {
                    logout(false);
                }}/>
            </View>
        </View>
    );
};

export default DashAccDrawer;
