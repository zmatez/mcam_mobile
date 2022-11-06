import {StyleSheet} from "react-native";
import DefTheme from "../../../../styles/DefTheme";

const styles = StyleSheet.create({
    box: {},
    title: {
        fontFamily: "URWGeometric-700",
        fontSize: 18,
        color: DefTheme.colors.heading,
        marginVertical: 4,
        marginTop: 15
    },
    colorPreview: {
        width: 18,
        height: 18,
        borderRadius: 5,
        marginRight: 8
    },
    hashBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12
    },
    hashText: {
        fontFamily: "URWGeometric-600",
        fontSize: 14,
        color: DefTheme.colors.secondary0,
        marginHorizontal: 5,
        textTransform: "uppercase"
    },
    myCameras: {
        marginTop: 10,
        flexGrow: 1,
        overflow: "hidden",
        height: 100
    },
    noCameras: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 25
    },
    noCamerasText: {
        fontFamily: "URWGeometric-700",
        fontSize: 15,
        color: DefTheme.colors.secondary0,
        marginBottom: 5
    }
});

export default styles;