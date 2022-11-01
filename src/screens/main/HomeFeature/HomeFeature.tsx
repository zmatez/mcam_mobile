import React, {FC, FunctionComponent} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {SvgProps} from "react-native-svg";
import defStyles from "../../../styles/DefStyles";
import defTheme from "../../../styles/DefTheme";

interface DataPaneProps {
    icon: FC<SvgProps>,
    text: string
}

type Props = DataPaneProps;

const HomeFeature: FunctionComponent<Props> = ({icon, text}) => {

    return (
        <View style={styles.view}>
            {React.createElement(icon,{width: 20, height: 20, fill: defTheme.colors.primary1})}
            <Text style={[defStyles.text, styles.text]} numberOfLines={1}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        margin: 5,
        backgroundColor: defTheme.colors.secondary5,
        borderRadius: 10,
        height: 32,
        paddingHorizontal:10,
        paddingVertical: 5,
    },
    text: {
        marginLeft: 6,
        fontFamily: "URWGeometric-600"
    }
})

export default HomeFeature;
