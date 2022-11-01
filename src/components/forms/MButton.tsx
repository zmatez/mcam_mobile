import React, {FunctionComponent} from 'react';
import {Pressable, StyleSheet, Text, TextStyle, TouchableNativeFeedback, ViewStyle} from "react-native";
import defTheme from "../../styles/DefTheme";

interface ButtonProps {
    text: string,
    style?: ViewStyle,
    textStyle?: TextStyle,
    onClick: () => void
}


type Props = ButtonProps;

const MButton: FunctionComponent<Props> = ({text, style,textStyle, onClick}) => {
    return (
        <TouchableNativeFeedback>
            <Pressable style={[styles.button, style]} onPress={() => {onClick()}}>
                <Text style={[styles.text,textStyle]}>
                    {text}
                </Text>
            </Pressable>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 40,
        backgroundColor: defTheme.colors.primary1,
        shadowRadius:10,
        shadowOpacity:6,
        shadowColor: defTheme.colors.primary1,
        elevation:2
    },
    text: {
        fontFamily: "URWGeometric-600",
        fontSize: 16,
        color: defTheme.colors.primaryForeground
    }
})

export default MButton;
