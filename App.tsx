import {useFonts} from "expo-font";
import AppNavigation from "./src/navigation/AppNavigation";
import {AuthProvider} from "./src/contexts/AuthContext";
import {useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import * as dayjs from 'dayjs'
import 'dayjs/locale/pl'
import dayJsRelativeTime from 'dayjs/plugin/relativeTime';
import dayJsWeekday from 'dayjs/plugin/weekday';
import dayJsCalendar from 'dayjs/plugin/calendar';
import ThemeContext from "./src/contexts/ThemeContext";

dayjs.locale('pl');
dayjs.extend(dayJsRelativeTime);
dayjs.extend(dayJsWeekday);
dayjs.extend(dayJsCalendar);

export default function App() {
    const [loading, setLoading] = useState(true);

    const [loaded] = useFonts({
        'URWGeometric-1000': require('./src/assets/fonts/URWGeometric-Heavy.ttf'),
        'URWGeometric-900': require('./src/assets/fonts/URWGeometric-ExtraBold.ttf'),
        'URWGeometric-800': require('./src/assets/fonts/URWGeometric-Bold.ttf'),
        'URWGeometric-700': require('./src/assets/fonts/URWGeometric-SemiBold.ttf'),
        'URWGeometric-600': require('./src/assets/fonts/URWGeometric-Medium.ttf'),
        'URWGeometric-500': require('./src/assets/fonts/URWGeometric-Regular.ttf'),
        'URWGeometric-400': require('./src/assets/fonts/URWGeometric-Light.ttf'),
        'URWGeometric-300': require('./src/assets/fonts/URWGeometric-ExtraLight.ttf'),
        'URWGeometric-200': require('./src/assets/fonts/URWGeometric-Thin.ttf')
    });

    if (!loaded || loading) {
        return (
            <NavigationContainer>
                <AuthProvider onLoad={() => {
                    setLoading(false);
                }}>
                    <></>
                </AuthProvider>
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer>
            <AuthProvider onLoad={() => {
                setLoading(false);
            }}>
                <ThemeContext>
                    <AppNavigation/>
                </ThemeContext>
            </AuthProvider>
        </NavigationContainer>
    );
}