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
        alignItems: "center",
        overflow: "hidden"
    },
    stream: {
        aspectRatio: 16/9,
        width: '100%'
    },
    controls: {
        flexDirection: "row",
        padding: 4,
        justifyContent: "flex-start",
        alignItems: "center"
    }
});

export default styles;