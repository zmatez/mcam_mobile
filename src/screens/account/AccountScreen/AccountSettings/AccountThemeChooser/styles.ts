import {StyleSheet} from "react-native";
import DefTheme from "../../../../../styles/DefTheme";

const styles = StyleSheet.create({
    box: {
        borderRadius: 30,
        backgroundColor: DefTheme.colors.secondary4,
    },
    inner: {
        position: "relative",
        flexDirection: "row",
        padding: 5
    },
    icon: {
        marginHorizontal: 10
    },
    circle: {
        position: "absolute",
        top: 0,
        left: 5,
        bottom: 0,
        aspectRatio: 1,
        backgroundColor: DefTheme.colors.primary1,
        borderRadius: 50
    }
});

export default styles;