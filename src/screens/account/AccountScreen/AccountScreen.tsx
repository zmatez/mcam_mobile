import React, {FunctionComponent, useState} from 'react';
import {NavigationProp} from "@react-navigation/native";
import {ScrollView, Text, TouchableNativeFeedback, View} from "react-native";
import styles from "./styles";
import MenuIcon from "../../../assets/icons/material/menu.svg"
import DefTheme from "../../../styles/DefTheme";
import defTheme from "../../../styles/DefTheme";
import ProgressLoader from "../../../components/progress/ProgressLoader";
import {SafeAreaView} from "react-native-safe-area-context";
import AccountContext from "../../../contexts/AccountContext";
import AccountInfo from "./AccountInfo/AccountInfo";
import AccountSettings from "./AccountSettings/AccountSettings";

interface AccountProps {
    navigation: NavigationProp<any>
}

const AccountScreen: FunctionComponent<AccountProps> = ({navigation}) => {
    const [loading, setLoading] = useState(false);


    return (
        <SafeAreaView style={{flexGrow: 1, overflow: "hidden"}}>
            <View style={styles.titleView}>
                <TouchableNativeFeedback onPress={() => {
                    navigation.navigate("Dashboard")
                }}><MenuIcon style={styles.menu} fill={DefTheme.colors.primary0} width={24}
                             height={24}/></TouchableNativeFeedback>
                <Text style={styles.title}>Moje konto<Text style={{color: DefTheme.colors.primary1}}>.</Text></Text>
                <View style={styles.iconsWrapper}>
                    <ProgressLoader size={36} color={defTheme.colors.primary1} show={loading}/>
                </View>
            </View>
            <ScrollView style={{flexGrow: 1, overflow: "hidden", padding: 8}}>
                <AccountContext loadingCallback={(loading) => {
                    setLoading(loading)
                }}>
                    <AccountInfo/>
                    <AccountSettings/>
                </AccountContext>
            </ScrollView>
        </SafeAreaView>
    )
};

export default AccountScreen;
