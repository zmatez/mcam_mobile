import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    titleView: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
        elevation: 1
    },
    menu: {
        marginLeft: 10
    },
    title: {
        fontFamily: "URWGeometric-1000",
        fontSize: 30,
        marginLeft: 30
    },
    iconsWrapper: {
        marginLeft: "auto",
        paddingHorizontal: 5,
        flexDirection: "row",
        alignItems: "center"
    }
});

export default styles;