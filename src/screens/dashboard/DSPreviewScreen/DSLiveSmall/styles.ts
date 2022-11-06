import {StyleSheet} from "react-native";
import DefTheme from "../../../../styles/DefTheme";

const styles = StyleSheet.create({
    box: {
        backgroundColor: DefTheme.colors.secondary6,
        borderRadius: 15,
        padding: 8,
        marginVertical: 6,
        alignItems: "center",
        overflow: "hidden"
    },
    boxInner: {
        backgroundColor: DefTheme.colors.cameraBackground,
        borderRadius: 15,
        overflow: "hidden"
    },
    stream: {
        aspectRatio: 16 / 9,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    fpsCounter: {
        fontFamily: "URWGeometric-600",
        fontSize: 12,
        position: "absolute",
        top: 5,
        right: 5,
        color: DefTheme.colors.background
    },
    controls: {
        flexDirection: "row",
        paddingVertical: 4,
        paddingHorizontal: 18,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    icon: {
        marginHorizontal: 2
    },
    qualityBox: {
        backgroundColor: DefTheme.colors.secondary5,
        marginLeft: "auto",
        marginRight: "auto",
        paddingHorizontal: 6,
        borderRadius: 6
    },
    qualityText: {
        fontFamily: "URWGeometric-700",
        fontSize: 13,
        color: DefTheme.colors.cameraBackground
    }
});

export default styles;