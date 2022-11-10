import React, {FunctionComponent} from 'react';
import {Pressable, StyleSheet, Text, TextStyle, TouchableNativeFeedback, ViewStyle, Switch} from "react-native";
import defTheme from "../../styles/DefTheme";

interface SwitchProps {
    enabled: boolean;
    onToggle: (value: boolean) => void;
}


type Props = SwitchProps;

const MSwitch: FunctionComponent<Props> = ({enabled, onToggle}) => {
    return (
        <Switch style={styles.switch} trackColor={{ false: defTheme.colors.secondary1, true: defTheme.colors.primary4 }}
                thumbColor={enabled ? defTheme.colors.primary1 : defTheme.colors.background}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => {onToggle(value)}}
                value={enabled}>
        </Switch>
    );
};

const styles = StyleSheet.create({
    switch: {
        height: 24
    }
})

export default MSwitch;
