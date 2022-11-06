import {StyleSheet} from "react-native";
import DefTheme from "../../../../styles/DefTheme";

const styles = StyleSheet.create({
    dataText: {
        fontFamily: "URWGeometric-600",
        fontSize: 13,
        color: DefTheme.colors.secondary1
    },
    tempBox: {
        marginVertical: 4,
        backgroundColor: DefTheme.colors.secondary5,
        borderRadius: 15,
        padding: 8,
        marginBottom: 200
    },
    tempBoxHeader: {
        flexDirection: "row",
        alignItems: "center"
    },
    tempBoxTitle: {
        fontFamily: "URWGeometric-700",
        fontSize: 14
    },
});

export default styles;