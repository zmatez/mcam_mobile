import React, {
    createContext,
    FunctionComponent,
    MutableRefObject,
    ReactNode,
    useContext,
    useRef,
    useState
} from 'react';
import {View, ViewStyle} from "react-native";
import AddCameraModal from "../screens/ addcam/AddCameraModal";

interface AddCameraContextProviderProps {
    children: ReactNode
}

type Props = AddCameraContextProviderProps;

export interface AddCameraContextProps {
    addCamModalShown: boolean,
    setAddCamModalShown: (shown: boolean) => void;
}

const AddCameraContext = createContext<AddCameraContextProps | null>(null);

export function useAddCameraContext() {
    return useContext(AddCameraContext) || {} as AddCameraContextProps;
}

const AddCameraContextProvider: FunctionComponent<Props> = ({children}) => {
    const [addCamModalShown,setAddCamModalShown] = useState<boolean>(false);

    const contextProps: AddCameraContextProps = {
        addCamModalShown,
        setAddCamModalShown
    }

    return (
        <AddCameraContext.Provider value={contextProps}>
            {children}
            <AddCameraModal show={addCamModalShown} hide={() => setAddCamModalShown(false)}/>
        </AddCameraContext.Provider>
    );
};

export default AddCameraContextProvider;
