import {StyleSheet} from "react-native";
import DefTheme from "../../../../styles/DefTheme";

const styles = StyleSheet.create({
    box: {
        marginVertical: 4,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: DefTheme.colors.secondary5,
        borderRadius: 15,
        padding: 8,
    },
    icon: {
        marginRight: 5,
    },
    title: {
        fontFamily: "URWGeometric-700",
        fontSize: 14,
        marginLeft: 4
    },
    status: {
        marginLeft: "auto",
        marginRight: 4,
        fontFamily: "URWGeometric-600",
        fontSize: 13,
        textTransform: "uppercase"
    }
});

export default styles;