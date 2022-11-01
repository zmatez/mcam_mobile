import {StyleSheet} from "react-native";
import DefTheme from "../../../styles/DefTheme";

const styles = StyleSheet.create({
    box: {
        backgroundColor: DefTheme.colors.secondary6,
        borderRadius: 8,
        padding: 10,
        marginVertical: 5
    },
    image: {
        width: '100%',
        aspectRatio: 5/3,
        borderRadius: 8,
        overflow: "hidden"
    },
    title: {
        marginTop: 4,
        fontSize: 18,
        fontFamily: "URWGeometric-800"
    }
});

export default styles;