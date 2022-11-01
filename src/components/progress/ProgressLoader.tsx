import React, {FunctionComponent} from 'react';
import defTheme from "../../styles/DefTheme";
import {ActivityIndicator, View} from "react-native";

interface ProgressProps {
    show: boolean;
    color?: string;
    size?: number;
}

type Props = ProgressProps;

const ProgressLoader: FunctionComponent<Props> = ({show, color = defTheme.colors.primary1, size = 32}) => {
    return (
        <View style={{height: size, width: size}}>
            {show ? <ActivityIndicator color={color} size={size}/> : null}
        </View>
    );
};

export default ProgressLoader;
