import {StyleSheet} from "react-native";
import DefTheme from "../../../../../styles/DefTheme";

const styles = StyleSheet.create({
    box: {
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 30,
        backgroundColor: DefTheme.colors.secondary4,
    },
    inner: {
        position: "relative",
        flexDirection: "row"
    },
    icon: {
        marginHorizontal: 10
    },
    circle: {
        position: "absolute",
        top: 0,
        left: 10,
        bottom: 0,
        aspectRatio: 1,
        backgroundColor: DefTheme.colors.primary3,
        borderRadius: 50
    }
});

export default styles;