import {StyleSheet} from "react-native";
import DefTheme from "../../../../../styles/DefTheme";

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    box: {
        padding: 5,
        height: '70%',
        backgroundColor: DefTheme.colors.background,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    title: {
        fontFamily: "URWGeometric-800",
        fontSize: 26,
        marginLeft: 4,
        textAlign: "center",
        marginVertical: 15
    },
    scroll: {
        flexGrow: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8
    },
    entry: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 6,
        marginVertical: 3,
        marginHorizontal: 8,
        backgroundColor: DefTheme.colors.secondary6,
        alignItems: "center"
    },
    colorPreview: {
        width: 18,
        height: 18,
        borderRadius: 5,
        marginRight: 8
    },
    entryText: {
        fontFamily: "URWGeometric-700",
        fontSize: 16,
        marginLeft: 10
    }
});

export default styles;