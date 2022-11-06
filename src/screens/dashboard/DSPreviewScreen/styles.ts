import {StyleSheet} from "react-native";
import DefTheme from "../../../styles/DefTheme";

const styles = StyleSheet.create({
    expandableIcons: {
        flexDirection: "row"
    },
    expandableIcon: {
        marginHorizontal: 3
    },
    dataText: {
        fontFamily: "URWGeometric-600",
        fontSize: 13,
        color: DefTheme.colors.secondary1
    },
    tempText: {
        fontFamily: "URWGeometric-700",
        fontSize: 16,
        color: DefTheme.colors.secondary0,
        marginHorizontal: 6
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default styles;