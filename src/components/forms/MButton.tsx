import React, {FunctionComponent} from 'react';
import {Pressable, StyleSheet, Text, TextStyle, TouchableNativeFeedback, ViewStyle} from "react-native";
import defTheme from "../../styles/DefTheme";

interface ButtonProps {
    text: string,
    style?: ViewStyle,
    textStyle?: TextStyle,
    onClick: () => void,
    small?: boolean;
}


type Props = ButtonProps;

const MButton: FunctionComponent<Props> = ({text, style, textStyle, onClick, small = false}) => {
    return (
        <TouchableNativeFeedback>
            <Pressable style={[small ? stylesSmall.button : styles.button, style]} onPress={() => {
                onClick()
            }}>
                <Text style={[small ? stylesSmall.title : styles.title, textStyle]}>
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
        shadowOpacity: 6,
        shadowColor: defTheme.colors.primary1,
        elevation: 2
    },
    title: {
        fontFamily: "URWGeometric-600",
        fontSize: 16,
        color: defTheme.colors.primaryForeground
    }
})

const stylesSmall = StyleSheet.create({
    button: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 40,
        backgroundColor: defTheme.colors.primary1,
        shadowRadius: 10,
        shadowOpacity: 6,
        shadowColor: defTheme.colors.primary1,
        elevation: 2
    },
    title: {
        fontFamily: "URWGeometric-600",
        fontSize: 13,
        color: defTheme.colors.primaryForeground
    }
})

export default MButton;
