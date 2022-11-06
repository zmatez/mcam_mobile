import React, {FunctionComponent} from 'react';
import {Text, View} from "react-native";
import {useAccountContext} from "../../../../contexts/AccountContext";
import styles from "./styles";
import AvatarIcon from "../../../../assets/icons/material/avatar.svg";
import dayjs from "dayjs";

interface InfoProps {

}

const AccountInfo: FunctionComponent<InfoProps> = ({}) => {
    const {userData, refreshAccountData} = useAccountContext();

    if (!userData) {
        return null
    }

    return (
        <View style={styles.box}>
            <View style={styles.avatarWrapper}>
                <View style={[styles.avatarColor, {backgroundColor: '#' + userData.user.color}]}/>
                <View style={styles.avatarIconWrapper}>
                    <View style={styles.avatarIcon}><AvatarIcon width={48} height={48}/></View>
                </View>
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.textNick}>{userData.user.nick}</Text>
                <Text style={styles.textEmail}>{userData.user.email}</Text>
                <Text style={styles.textJoinDate}>Dołączył {dayjs(userData.user.joinDate).format('YYYY-MM-DD')}</Text>
            </View>
        </View>
    )
};

export default AccountInfo;
