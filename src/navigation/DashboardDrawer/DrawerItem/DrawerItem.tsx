import React, {FC, FunctionComponent} from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import {SvgProps} from "react-native-svg";
import defStyles from "../../../styles/DefStyles";
import defTheme from "../../../styles/DefTheme";

interface DataPaneProps {
    icon: FC<SvgProps>,
    text: string,
    selected: boolean,
    onPress: () => void,
}

type Props = DataPaneProps;

const DrawerItem: FunctionComponent<Props> = ({icon, text, selected, onPress}) => {
    return (
        <TouchableNativeFeedback onPress={() => {onPress()}}>
            <View style={styles.view}>
                {React.createElement(icon,{width: 18, height: 18, fill: defTheme.colors.primary1})}
                <Text style={[defStyles.title, styles.title]} numberOfLines={1}>{text}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        flexDirection: "row",
        margin: 5,
        backgroundColor: defTheme.colors.secondary6,
        borderRadius: 5,
        paddingHorizontal:10,
        paddingVertical: 8,
    },
    title: {
        fontSize: 16,
        marginLeft: 12,
        fontFamily: "URWGeometric-600"
    }
})

export default DrawerItem;
