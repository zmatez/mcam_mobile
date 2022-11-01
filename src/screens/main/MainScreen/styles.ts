import {StyleSheet} from "react-native";
import defTheme from "../../../styles/DefTheme";

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    backgroundPortrait: {
        top: '30%',
        width: '100%',
        position: "absolute"
    },
    backgroundPortraitInner: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '50%',
        position: "absolute"
    },
    backgroundPortraitLogoInline: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 64,
        height: 64
    },
    titleView: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: '95%'
    },
    buttonHolder: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
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