import React, {FunctionComponent, useRef, useState} from 'react';
import {ScrollView, Text, TouchableNativeFeedback, View} from "react-native";
import styles from "./styles";
import DefTheme from "../../styles/DefTheme";
import {useAccountContext} from "../../contexts/AccountContext";
import MButton from "../../components/forms/MButton";
import Modal from "react-native-modal";
import FormController from "../../controllers/form/FormController";
import FormContext from "../../contexts/FormContext";
import InputField from "../../components/forms/input/InputField";
import sidIcon from "../../assets/icons/material/sid.svg";
import {TYPES} from "../../components/forms/input/InputTypes";
import nameIcon from "../../assets/icons/material/name.svg";
import defStyles from "../../styles/DefStyles";
import ProgressLoader from "../../components/progress/ProgressLoader";
import defTheme from "../../styles/DefTheme";

interface ColorProps {
    show: boolean;
    hide: () => void;
}

const AddCameraModal: FunctionComponent<ColorProps> = ({show, hide}) => {
    const formRef = useRef<FormController | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [loading, setLoading] = useState(false);

    return (
        <Modal isVisible={show}
               onSwipeComplete={() => {
                   hide()
               }}
               useNativeDriverForBackdrop
               swipeDirection={['down']}
               style={styles.modal}
               onBackdropPress={() => {
                   hide()
               }}
               onBackButtonPress={() => {
                   hide()
               }}>
            <View style={styles.box}>
                <Text style={styles.title}>Dodaj kamerę</Text>

                <FormContext controller={formRef} style={styles.form}>
                    <View style={styles.formInner}>
                        <InputField title={"SID"} name={"login-sid"} icon={sidIcon} type={TYPES.sid}
                                    index={0}/>
                        <InputField title={"Nazwa własna"} name={"login-name"} icon={nameIcon} type={TYPES.nick}
                                    index={1}/>
                    </View>
                </FormContext>
                <Text style={[defStyles.title, styles.errorText]}>
                    {errorMessage}
                </Text>
                <View style={[styles.progressHolder]}>
                    <ProgressLoader size={55} color={defTheme.colors.primary1} show={loading}/>
                </View>
                <View style={styles.buttons}>
                    <MButton text={"Anuluj"} onClick={() => {
                        hide()
                    }} style={{backgroundColor: DefTheme.colors.secondary5, marginRight: 12}}
                             textStyle={{color: DefTheme.colors.secondary0}}/>
                    <MButton text={"Zarejestruj"} onClick={() => {
                        if(formRef.current?.submit() == true) {
                            hide()
                        }
                    }}/>
                </View>
            </View>
        </Modal>
    );
};

export default AddCameraModal;
