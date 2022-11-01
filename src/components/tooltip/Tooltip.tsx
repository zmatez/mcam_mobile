import React, {FunctionComponent, ReactNode, useEffect, useRef, useState} from 'react';
import {View} from "react-native";
import styles from "./styles";

interface TooltipProps {
    children: ReactNode;
    position: "right" | "bottom_left",
    show: boolean,
    offset?: number
}

type Props = TooltipProps;

const Tooltip: FunctionComponent<Props> = ({children, position, show, offset= 0}) => {
    const viewRef = useRef<View | null>(null);
    const [left, setLeft] = useState(0);


    useEffect(() => {
        if(!viewRef || !viewRef.current) {
            return
        }

        viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
            if(position == "bottom_left") {
                setLeft(width)
            }
        })
    }, [show])

    return (
        <View style={[styles.background, (position == "right" ? styles.posRight : styles.posBottomLeft), {left: left}]} ref={viewRef}>
            <View style={{flex: 1}}>
                {children}
            </View>
        </View>
    );
};

export default Tooltip;
