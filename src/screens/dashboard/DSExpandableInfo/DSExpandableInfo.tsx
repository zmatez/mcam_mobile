import React, {FunctionComponent, ReactNode, useRef, useState} from 'react';
import {Animated, Text, TouchableNativeFeedback, View} from "react-native";
import Arrow from "../../../assets/icons/material/arrow_right.svg"
import styles from "./styles";
import DefTheme from "../../../styles/DefTheme";
import Collapsible from "react-native-collapsible";

interface ExpandProps {
    title: string,
    children: ReactNode,
    icons: ReactNode
}

const duration = 200;
const DSExpandableInfo: FunctionComponent<ExpandProps> = ({title, children, icons}) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const rotation = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
        if (!collapsed) {
            //is collapsed now
            Animated.parallel([
                Animated.timing(rotation, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true,
                })
            ]).start()
        } else {
            Animated.parallel([
                Animated.timing(rotation, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                })
            ]).start()
        }
    }

    const rotationInt = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    })

    return (
        <View style={styles.box}>
            <TouchableNativeFeedback onPress={() => toggleCollapse()}>
                <View style={styles.innerBox}>
                    <Animated.View style={{transform: [{rotate: rotationInt}]}}>
                        <Arrow width={24} height={24}
                               fill={collapsed ? DefTheme.colors.secondary0 : DefTheme.colors.primary1}/>
                    </Animated.View>
                    <Text style={styles.title}>{title}</Text>
                    <Animated.View style={[styles.status, {opacity: opacity}]}>{icons}</Animated.View>
                </View>
            </TouchableNativeFeedback>

            <Collapsible collapsed={collapsed} duration={duration}>
                <View style={styles.collapsible}>{children}</View>
            </Collapsible>
        </View>
    );
};

export default DSExpandableInfo;
