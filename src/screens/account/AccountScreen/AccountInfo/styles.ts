import {StyleSheet} from "react-native";
import DefTheme from "../../../../styles/DefTheme";

const styles = StyleSheet.create({
    box: {
        backgroundColor: DefTheme.colors.secondary6,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden"
    },
    avatarWrapper: {
        position: "relative",
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    avatarColor: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: 40 + 48 / 2 + 2
    },
    avatarIconWrapper: {
        marginLeft: 40
    },
    avatarIcon: {
        backgroundColor: DefTheme.colors.secondary6,
        borderRadius: 100,
        padding: 2,
        marginLeft: "auto",
        justifyContent: "center",
        alignItems: "center"
    },
    textWrapper: {
        marginVertical: 15,
        marginLeft: 10
    },
    textNick: {
        fontFamily: "URWGeometric-800",
        fontSize: 22
    },
    textEmail: {
        fontFamily: "URWGeometric-700",
        fontSize: 16,
        color: DefTheme.colors.secondary0
    },
    textJoinDate: {
        fontFamily: "URWGeometric-600",
        fontSize: 12,
        color: DefTheme.colors.secondary1
    }
});

export default styles;