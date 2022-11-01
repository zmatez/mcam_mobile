import {StyleSheet} from "react-native";
import defTheme from "../../../styles/DefTheme";

const styles = StyleSheet.create({
    backgroundOutline: {
        width: '100%',
        height: 60,
        padding: 3,
        marginVertical: 8,
        borderRadius: 18,
        position: "relative"
    },
    backgroundOutlineActive: {
        backgroundColor: defTheme.colors.primary5
    },
    background: {
        backgroundColor: defTheme.colors.secondary7,
        borderWidth: 2,
        borderColor: "transparent",
        borderRadius: 16,
        paddingVertical:6,
        paddingHorizontal: 12,
        width: '100%',
        height: '100%',
        flexDirection: "row",
        alignItems: "center",
    },
    backgroundActive: {
        borderColor: defTheme.colors.primary1
    },
    backgroundInner: {
        height: '100%',
        width: '80%'
    },
    title: {
        fontSize: 12,
        color: defTheme.colors.secondary1
    },
    input: {
        fontFamily: "URWGeometric-700",
        fontSize: 17,
        width: '100%'
    },
    iconHolder: {
        marginLeft: "auto"
    },
    errorView: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 1
    },
    errorImage: {
    },
    errorText: {
        color: defTheme.colors.error0,
        marginLeft: 6
    }
});

export default styles;