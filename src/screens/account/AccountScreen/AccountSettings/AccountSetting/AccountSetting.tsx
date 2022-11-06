import React, {FunctionComponent, ReactNode} from 'react';
import {Text, View} from "react-native";
import styles from "./styles";

interface ExpandProps {
    title: string,
    children: ReactNode
}

const AccountSetting: FunctionComponent<ExpandProps> = ({
                                                            title,
                                                            children
                                                        }) => {
    return (
        <View style={[styles.box]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.status}>{children}</View>
        </View>
    );
};

export default AccountSetting;
