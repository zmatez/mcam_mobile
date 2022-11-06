import React, {FunctionComponent, useState} from 'react';
import {ScrollView, Text, TouchableNativeFeedback, View} from "react-native";
import styles from "./styles";
import DefTheme from "../../../../../styles/DefTheme";
import {useAccountContext} from "../../../../../contexts/AccountContext";
import MButton from "../../../../../components/forms/MButton";
import Modal from "react-native-modal";

interface ColorProps {
    show: boolean;
    hide: (cancel: boolean, color?: string) => void;
}

const AccountColorModal: FunctionComponent<ColorProps> = ({show, hide}) => {
    const {userData} = useAccountContext();
    const [color_, setColor] = useState<string | null>(null);

    if (!userData) {
        return null
    }

    return (
        <Modal isVisible={show}
               onSwipeComplete={() => {
                   hide(true)
               }}
               useNativeDriverForBackdrop
               swipeDirection={['down']}
               style={styles.modal}
               onBackdropPress={() => {
                   hide(true)
               }}
               onBackButtonPress={() => {
                   hide(true)
               }}>
            <View style={styles.box}>
                <Text style={styles.title}>Zmień kolor</Text>

                <ScrollView style={styles.scroll}>
                    {userData.availableColors.map((color) => (
                        <TouchableNativeFeedback key={color.hex} onPress={() => setColor(color.hex)}>
                            <View
                                style={[styles.entry, color.hex == userData?.user.color ? {backgroundColor: DefTheme.colors.primary4} : null, color.hex == color_ ? {backgroundColor: DefTheme.colors.primary2} : null]}>
                                <View style={[styles.colorPreview, {backgroundColor: '#' + color.hex}]}></View>
                                <Text
                                    style={[styles.entryText, color.hex == color_ ? {color: DefTheme.colors.primaryForeground} : null]}>{color.name}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    ))}
                </ScrollView>

                <View style={styles.buttons}>
                    <MButton text={"Anuluj"} onClick={() => {
                        hide(true)
                    }} style={{backgroundColor: DefTheme.colors.secondary5, marginRight: 12}}
                             textStyle={{color: DefTheme.colors.secondary0}}/>
                    <MButton text={"Zapisz"} onClick={() => {
                        hide(false, color_ || undefined)
                    }}/>
                </View>
            </View>
        </Modal>
    );
};

export default AccountColorModal;
