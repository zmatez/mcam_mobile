import React, {FunctionComponent, useState} from 'react';
import {FlatList, Share, Switch, Text, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";
import {useAccountContext} from "../../../../contexts/AccountContext";
import styles from "./styles";
import ShareIcon from "../../../../assets/icons/material/share.svg";
import AccountSetting from "./AccountSetting/AccountSetting";
import MButton from "../../../../components/forms/MButton";
import DefTheme from "../../../../styles/DefTheme";
import AccountColorModal from "./AccountColorModal/AccountColorModal";
import {useAuth} from "../../../../contexts/AuthContext";
import CameraPreview from "../../../../components/camera/CameraPreview/CameraPreview";
import AccountThemeChooser from "./AccountThemeChooser/AccountThemeChooser";

interface InfoProps {

}

const AccountSettings: FunctionComponent<InfoProps> = ({}) => {
    const {setUserColor} = useAuth();
    const {userData, refreshAccountData, generateHash} = useAccountContext();
    const [showColorModal, setShowColorModal] = useState(false);

    const newHash = () => {
        generateHash((hash) => {
            refreshAccountData();
        })
    }

    const onColorHide = (cancel: boolean, color?: string) => {
        setShowColorModal(false);
        if (cancel || !color) {
            return;
        }

        setUserColor(color);
    }

    const onShare = async () => {
        if(!userData) {
            return
        }
        const hash = userData.user.hash;
        if(!hash) {
            return;
        }
        const result = await Share.share({
            message: "Konto MCam: " + userData.user.email + ", hash: #" + hash.toUpperCase(),
        }, {
            dialogTitle: "Udostępnij dane konta"
        });
    };

    if (!userData) {
        return null
    }

    return (
        <View style={styles.box}>
            <Text style={styles.title}>Ustawienia konta</Text>
            <AccountSetting title={"Awatar"}>
                <MButton text={"Zmień awatar"} onClick={() => {
                }} small={true}/>
            </AccountSetting>
            <AccountSetting title={"Hasło"}>
                <MButton text={"Zmień hasło"} onClick={() => {
                }} small={true}/>
            </AccountSetting>
            <AccountSetting title={"Kolor"}>
                <View style={[styles.colorPreview, {backgroundColor: '#' + userData.user.color}]}></View>
                <MButton text={"Zmień kolor"} onClick={() => {
                    setShowColorModal(true)
                }} small={true}/>
            </AccountSetting>
            <AccountSetting title={"Hash"}>
                <TouchableOpacity onPress={() => {
                    onShare()
                }}>
                    <View style={styles.hashBox}>
                        <Text style={styles.hashText}>{userData.user.hash ? userData.user.hash : "Brak"}</Text>
                        <ShareIcon width={16} height={16} fill={DefTheme.colors.secondary1}/>
                    </View>
                </TouchableOpacity>
                <MButton text={"Generuj nowy"} onClick={() => {
                    newHash()
                }} small={true}/>

            </AccountSetting>
            <Text style={styles.title}>Ustawienia aplikacji</Text>
            <AccountSetting title={"Motyw"}>
                <AccountThemeChooser/>
            </AccountSetting>
            <Text style={styles.title}>Moje kamery</Text>
            {userData.cameras.length > 0 ? (
                <FlatList style={styles.myCameras} horizontal data={userData.cameras} renderItem={({item, index}) => (
                    <CameraPreview camera={item} key={'cam-' + index}/>
                )}/>
            ) : (
                <View style={styles.noCameras}>
                    <Text style={styles.noCamerasText}>Nie posiadasz kamer</Text>
                    <MButton text={"Dodaj nową"} onClick={() => {
                    }}/>
                </View>
            )}

            <AccountColorModal show={showColorModal} hide={(cancel, color) => {
                onColorHide(cancel, color)
            }}/>
        </View>
    )
};

export default AccountSettings;
