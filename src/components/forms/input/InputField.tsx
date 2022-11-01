import React, {FC, FunctionComponent, useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {SvgProps} from "react-native-svg";
import styles from "./styles";
import defTheme from "../../../styles/DefTheme";
import defStyles from "../../../styles/DefStyles";
import {useFormContext} from "../../../contexts/FormContext";
import ErrorIcon from "../../../assets/icons/material/exclamation.svg";
import VisibilityIcon from "../../../assets/icons/material/visibility.svg";
import VisibilityOffIcon from "../../../assets/icons/material/visibility_off.svg";
import {InputType, TYPES} from "./InputTypes";

interface InputFieldProps {
    title: string,
    name: string,
    icon: FC<SvgProps>,
    type: InputType,
    index: number
}

type Props = InputFieldProps;


const InputField: FunctionComponent<Props> = ({title, name, icon, index, type}) => {
    const form = useFormContext();
    const password = type == TYPES.password;

    const [value, setValue] = useState("");
    const valueRef = useRef<string | null>();

    const [error, setError] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const inputRef = useRef<TextInput | null>(null);
    const [hasFocus, setHasFocus] = useState(false);

    form.getController.register(name, (entry) => {
        entry.onGet(() => {
            return valueRef.current
        });
        entry.onSet((val) => {
            valueRef.current = val;
            setValue(val);
        });
        entry.onValidate(() => {
            let valid = type.isValid(valueRef.current || "");
            if(valid == true) {
                entry.displayError(null);
                return true;
            }

            entry.displayError(valid);
            return valid;
        })
        entry.onDisplayError((error) => {
            setError(error)
        })
    })

    const onType = () => {
        if(form.getController.submitted) {
            form.getController.entries[name].validation();
        }
    }

    return (
        <View style={[styles.backgroundOutline, hasFocus ? styles.backgroundOutlineActive : null, {zIndex: 99 - index}]} onTouchEnd={() => {
            if (inputRef.current) {
                inputRef.current?.focus()
            }
        }}>
            <View style={[styles.background, hasFocus ? styles.backgroundActive : null]}>
                <View style={styles.backgroundInner}>
                    <Text style={[defStyles.text, styles.title]}>{title}</Text>
                    <TextInput secureTextEntry={password ? !passwordVisible : false} style={styles.input} selectionColor={defTheme.colors.primary1} ref={inputRef}
                               onFocus={() => {
                                   setHasFocus(true)
                               }} onBlur={() => {
                        setHasFocus(false)
                    }} onChangeText={(value) => {
                        setValue(value);
                        valueRef.current = value;
                        onType();
                    }}
                               value={value}></TextInput>
                </View>
                {password ? (
                    <View style={[styles.iconHolder, {marginRight: 6}]}>
                        <TouchableOpacity onPress={() => {
                            setPasswordVisible(!passwordVisible);
                        }}>
                            {!passwordVisible ? (
                                <VisibilityOffIcon height={24} width={24} fill={defTheme.colors.secondary1}/>
                            ) : (
                                <VisibilityIcon height={24} width={24} fill={defTheme.colors.secondary1}/>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : null}
                <View style={styles.iconHolder}>
                    {React.createElement(icon, {
                        height: 24,
                        width: 24,
                        fill: error ? defTheme.colors.error2 : (hasFocus ? defTheme.colors.primary1 : defTheme.colors.secondary1)
                    })}
                </View>
            </View>
            {error == null ? null : (
                <View style={styles.errorView}>
                    <ErrorIcon width={18} height={18} fill={defTheme.colors.error2}></ErrorIcon>
                    <Text style={[defStyles.text,styles.errorText]}>{error}</Text>
                </View>
            )}

        </View>
    );
};

export default InputField;
