import React, {createContext, FunctionComponent, MutableRefObject, ReactNode, useContext, useRef} from 'react';
import FormController from "../controllers/form/FormController";
import {View, ViewStyle} from "react-native";

interface FormContextProviderProps {
    children: ReactNode;
    controller: MutableRefObject<FormController | null>;
    style?: ViewStyle
}

type Props = FormContextProviderProps;

export interface FormContextProps {
    getController: FormController
}

const FormContext = createContext<FormContextProps | null>(null);

export function useFormContext() {
    return useContext(FormContext) || {} as FormContextProps;
}

const FormContextProvider: FunctionComponent<Props> = ({controller, children, style}) => {
    const controllerRef = useRef<FormController>(new FormController());

    const updateRef = () => {
        controller.current = controllerRef.current;
    }

    updateRef();

    const contextProps: FormContextProps = {
        getController: controllerRef.current
    }

    return (
        <FormContext.Provider value={contextProps}>
            <View style={style}>
                {children}
            </View>
        </FormContext.Provider>
    );
};

export default FormContextProvider;
