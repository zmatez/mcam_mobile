import React, {FunctionComponent, useRef, useState} from 'react';
import styles from "./styles";
import BackgroundMainPortrait from "../../../assets/images/background-main-portrait.svg";
import {ImageBackground, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import MButton from "../../../components/forms/MButton";
import defStyles from "../../../styles/DefStyles";
import defTheme from "../../../styles/DefTheme";
import FormContext from "../../../contexts/FormContext";
import FormController from "../../../controllers/form/FormController";
import InputField from "../../../components/forms/input/InputField";

import userIcon from "../../../assets/icons/material/user.svg";
import userPassword from "../../../assets/icons/material/password.svg";
import {TYPES} from "../../../components/forms/input/InputTypes";
import {useAuth} from "../../../contexts/AuthContext";
import {NavigationProp} from "@react-navigation/native";
import ProgressLoader from "../../../components/progress/ProgressLoader";

interface LoginProps {
    navigation: NavigationProp<any>
}

const LoginScreen: FunctionComponent<LoginProps> = ({navigation}) => {
    const {login} = useAuth();
    const formRef = useRef<FormController | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [loading, setLoading] = useState(false);

    const redirect = () => {
        navigation.navigate("DashAcc")
    }

    const submit = async () => {
        const values = formRef.current?.getValues();
        if(values == null) {
            setErrorMessage("Błąd przetwarzania danych. Spróbuj jeszcze raz.")
            return
        }
        setLoading(true);
        setErrorMessage(null);
        const response = await login(values['login-user'],values['login-password']);
        setLoading(false);

        if (response.status === 200) {
            redirect()
        } else {
            switch (response.status) {
                case 400:
                    setErrorMessage("Nieprawidłowe żadanie. Spróbuj jeszcze raz.")
                    break
                case 401:
                    if (response.error != null && response.error !== 0) {
                        if (response.error === -1) {
                            formRef.current?.entries['login-user'].displayError("Użytkownik nie istnieje.")
                        } else if (response.error === -2) {
                            formRef.current?.entries['login-password'].displayError("Hasło jest nieprawidłowe.")
                        }

                        break
                    }

                    setErrorMessage("Błąd serwera. Spróbuj jeszcze raz.")
                    break
                case 500:
                    setErrorMessage("Błąd w przetwarzaniu danych. Spróbuj jeszcze raz.")
                    break
                default:
                    setErrorMessage("Błąd " + response.status + ". Spróbuj jeszcze raz.")
                    break
            }
        }
    }

    return (
        <ImageBackground source={require("../../../assets/images/background.jpg")} style={styles.background}>
            <BackgroundMainPortrait style={styles.backgroundPortrait} width={'100%'} height={'40%'}
                                    preserveAspectRatio="xMinYMax slice"/>
            <SafeAreaView style={styles.backgroundPortraitInner}>
                <View style={styles.titleView}>
                    <Text style={[defStyles.title, styles.titleSecondary]}>
                        Logowanie
                    </Text>
                    <Text style={[defStyles.title, styles.titlePrimary]}>
                        Zaloguj się<Text style={{color: defTheme.colors.primary1}}>.</Text>
                    </Text>
                    <TouchableOpacity>
                        <Text style={[defStyles.title, styles.titleChangeMethod]}>
                            Nie masz konta? <Text style={{color: defTheme.colors.primary1}}>Zarejestruj się</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                <FormContext controller={formRef} style={styles.form}>
                    <View style={styles.formInner}>
                        <InputField title={"Nazwa użytkownika"} name={"login-user"} icon={userIcon} type={TYPES.nick}
                                    index={0}/>
                        <InputField title={"Hasło"} name={"login-password"} icon={userPassword} type={TYPES.password}
                                    index={1}/>
                    </View>
                </FormContext>
                <Text style={[defStyles.title, styles.errorText]}>
                    {errorMessage}
                </Text>
                <View style={[styles.progressHolder]}>
                    <ProgressLoader size={55} color={defTheme.colors.primary1} show={loading}/>
                </View>
            </SafeAreaView>
            <View style={styles.buttonHolder}>
                <MButton text={"Zaloguj się"} style={{marginHorizontal: 8}} onClick={() => {
                    if(formRef.current?.submit() == true) {
                        (async () => {
                            await submit()
                        })()
                    }
                }}/>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;
