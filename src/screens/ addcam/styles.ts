import {StyleSheet} from "react-native";
import DefTheme from "../../styles/DefTheme";
import defTheme from "../../styles/DefTheme";

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    box: {
        padding: 5,
        height: '50%',
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
    form: {
        width: '100%',
        alignItems: "center",
        flex: 1
    },
    formInner: {
        width: '85%'
    },
    errorText: {
        color: defTheme.colors.error1,
        marginHorizontal:8,
        textAlign: "center",
        fontSize: 16
    },
    progressHolder: {
        justifyContent: "center",
        alignItems: "center"
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8
    },
});

export default styles;