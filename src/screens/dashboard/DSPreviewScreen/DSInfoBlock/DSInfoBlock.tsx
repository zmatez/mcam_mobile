import React, {FC, FunctionComponent, ReactNode} from 'react';
import {Text, TouchableNativeFeedback, View, ViewStyle} from "react-native";
import styles from "./styles";
import {SvgProps} from "react-native-svg";
import defTheme from "../../../../styles/DefTheme";
import DefTheme from "../../../../styles/DefTheme";

interface ExpandProps {
    icon: FC<SvgProps>;
    title: string,
    children: ReactNode,
    clickable?: boolean,
    onClick?: () => void;
    highlighted?: boolean;
    style?: ViewStyle;
    iconColor?: string;
}

const DSInfoBlock: FunctionComponent<ExpandProps> = ({
                                                         icon,
                                                         title,
                                                         children,
                                                         onClick = null,
                                                         clickable = false,
                                                         style,
                                                         highlighted = false,
                                                         iconColor = defTheme.colors.primary1
                                                     }) => {
    const view = (
        <View style={[styles.box, style, highlighted ? {backgroundColor: DefTheme.colors.primary3} : null]}>
            {React.createElement(icon, {width: 18, height: 18, fill: iconColor, style: styles.icon})}
            <Text style={styles.title}>{title}</Text>
            <View style={styles.status}>{children}</View>
        </View>
    );
    return clickable ? (<TouchableNativeFeedback onPress={() => {
        if (onClick) {
            onClick();
        }
    }}>{view}</TouchableNativeFeedback>) : view;
};

export default DSInfoBlock;
