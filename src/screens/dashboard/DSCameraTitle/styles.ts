import {StyleSheet} from "react-native";
import DefTheme from "../../../styles/DefTheme";

const styles = StyleSheet.create({
    box: {
        marginVertical: 6,
        backgroundColor: DefTheme.colors.secondary6,
        borderRadius: 15,
        padding: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontFamily: "URWGeometric-800",
        fontSize: 20,
        marginLeft: 14
    },
    status: {
        marginLeft: "auto",
        marginRight: 4,
        fontFamily: "URWGeometric-700",
        fontSize: 13,
        textTransform: "uppercase"
    }
});

export default styles;