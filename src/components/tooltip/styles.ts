import {StyleSheet} from "react-native";
import DefTheme from "../../styles/DefTheme";

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        backgroundColor: DefTheme.colors.tooltip,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        flexDirection: "row"
    },
    posBottomLeft: {
        top: '120%'
    },
    posRight: {

    }
});

export default styles;