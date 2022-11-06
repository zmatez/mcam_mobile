import React, {FunctionComponent} from 'react';
import {ImageBackground, Text, View} from "react-native";
import BackgroundMainPortrait from "../../../assets/images/background-main-portrait.svg";
import Logo from "../../../assets/icons/mcam-logo.svg";
import defStyles from "../../../styles/DefStyles";

import streamIcon from "../../../assets/icons/material/stream.svg";
import motionIcon from "../../../assets/icons/material/motion.svg";
import photoIcon from "../../../assets/icons/material/take_picture.svg";
import historyIcon from "../../../assets/icons/material/history.svg";
import temperatureIcon from "../../../assets/icons/material/temperature.svg";
import signalsIcon from "../../../assets/icons/material/light.svg";
import usersIcon from "../../../assets/icons/material/user.svg";
import HomeFeature from "../HomeFeature/HomeFeature";
import MButton from "../../../components/forms/MButton";
import styles from "./styles";
import {NavigationProp} from "@react-navigation/native";

interface MainProps {
    navigation: NavigationProp<any>
}

const MainScreen: FunctionComponent<MainProps> = ({navigation}) => {
    return (
        <ImageBackground source={require("../../../assets/images/background.jpg")} style={styles.background}>
            <BackgroundMainPortrait style={styles.backgroundPortrait} width={'100%'} height={'40%'} preserveAspectRatio="xMinYMax slice" />
            <View style={styles.backgroundPortraitInner}>
                <View style={styles.backgroundPortraitLogoInline}>
                    <Logo style={styles.logo}/>
                    <Text style={[defStyles.title, {
                        fontFamily: "URWGeometric-1000",
                        fontSize: 50,
                        marginLeft: 6
                    }]}>MCam</Text>
                </View>

                <View style={styles.titleView}>
                    <HomeFeature text={"Transmisja na żywo"} icon={streamIcon}/>
                    <HomeFeature text={"Wykrywanie ruchu"} icon={motionIcon}/>
                    <HomeFeature text={"Zapisywanie zdjęć na karcie"} icon={photoIcon}/>
                    <HomeFeature text={"Historia aktywności"} icon={historyIcon}/>
                    <HomeFeature text={"Sygnały wizualne"} icon={signalsIcon}/>
                    <HomeFeature text={"Aktualna temperatura"} icon={temperatureIcon}/>
                    <HomeFeature text={"Dodawanie użytkowników"} icon={usersIcon}/>
                </View>
            </View>
            <View style={styles.buttonHolder}>
                <MButton text={"Zaloguj się"} style={{marginHorizontal: 8}} onClick={() => {
                    navigation.navigate("Login")
                }}/>
                <Text style={styles.buttonHolderText}>lub</Text>
                <MButton text={"Zarejestruj się"} style={{marginHorizontal: 8}} onClick={() => {}}/>
            </View>
        </ImageBackground>
    );
};

export default MainScreen;
