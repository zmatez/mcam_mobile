import {StyleSheet} from "react-native";
import defTheme from "../../../styles/DefTheme";

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    backgroundPortrait: {
        bottom: '10%',
        width: '100%',
        position: "absolute"
    },
    backgroundPortraitInner: {
        backgroundColor: "white",
        flex: 1,
        width: '100%',
        height: '70%',
        position: "absolute",
        paddingTop: 30
    },
    titleView: {
        flex: 1,
        padding: 8
    },
    titlePrimary: {
        color: defTheme.colors.heading,
        fontSize: 56,
        fontFamily: "URWGeometric-1000",
        marginLeft: 10,
        marginTop: 15,
        textAlign: "center"
    },
    titleSecondary: {
        color: defTheme.colors.secondary1,
        fontSize: 16,
        fontFamily: "URWGeometric-700",
        textTransform: "uppercase",
        marginLeft: 10
    },
    titleChangeMethod: {
        color: defTheme.colors.heading,
        fontSize: 16,
        fontFamily: "URWGeometric-600",
        marginLeft: 10,
        marginVertical: 8,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    form: {
        width: '100%',
        alignItems: "center",
        flex: 1
    },
    formInner: {
        width: '85%'
    },
    buttonHolder: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: '100%',
        padding: 8,
        paddingBottom: 20
    },
    buttonHolderText: {
        color: defTheme.colors.secondary5,
        marginHorizontal:8
    }
});

export default styles;