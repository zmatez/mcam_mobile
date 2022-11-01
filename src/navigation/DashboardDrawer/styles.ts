import {StyleSheet} from "react-native";
import defTheme from "../../styles/DefTheme";
import DefTheme from "../../styles/DefTheme";

const styles = StyleSheet.create({
    parent: {
        position: "relative",
        height: '100%',
        overflow: "hidden"
    },
    avatarHolder: {
        position: "relative",
    },
    avatarBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 80
    },
    avatarImageWrapper: {
        marginTop: 50,
        borderRadius: 999,
        backgroundColor: defTheme.colors.background,
        padding: 8,
        flexDirection: "row",
        alignItems: "center",
        elevation: 5
    },
    avatarImage: {
    },
    avatarText: {
        fontFamily: "URWGeometric-900",
        fontSize: 25,
        margin: 8
    },
    scrollWrapper: {
        marginTop: 10,
        marginHorizontal: 10,
        flexGrow: 1,
        overflow: "hidden",
    },
    camerasWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    camerasTitle: {
        fontFamily: "URWGeometric-700",
        fontSize: 18,
    },
    camerasIcons: {
        marginLeft: "auto",
        flexDirection: "row",
        alignItems: "center"
    },
    camerasIconWrapper: {
        backgroundColor: DefTheme.colors.secondary7,
        borderRadius: 999,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 4,
        padding: 7
    },
    camerasIcon: {
    },
    scroll: {
        marginTop: 10,
        flexGrow: 1,
        overflow: "hidden",
        height: 100
    },
    scrollInfoCentered: {
        alignItems: "center",
        justifyContent: "center"
    },
    navigationWrapper: {
        padding: 4,
    }
});

export default styles;