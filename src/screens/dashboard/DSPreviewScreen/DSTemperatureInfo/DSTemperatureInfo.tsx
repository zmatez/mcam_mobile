import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {Text, View} from "react-native";
import styles from "./styles";
import DefTheme from "../../../../styles/DefTheme";
import DSInfoBlock from "../DSInfoBlock/DSInfoBlock";
import TemperatureIcon from "../../../../assets/icons/material/temperature.svg";
import TemperatureLowIcon from "../../../../assets/icons/material/temp_low.svg";
import TemperatureHighIcon from "../../../../assets/icons/material/temp_high.svg";
import {useDashboardFunc} from "../../../../contexts/DashboardFuncContext";
import {CameraInfoOnline, TempReading} from "../../../../data/camera";
import {useDashboard} from "../../../../contexts/DashboardContext";
import {Messages} from "../../../../data/messages";
import ProgressLoader from "../../../../components/progress/ProgressLoader";
import Canvas from 'react-native-canvas';
import {getDateData, scaleBetween} from "../../../../util/utils";
import Collapsible from "react-native-collapsible";
import MButton from "../../../../components/forms/MButton";
import dayjs from "dayjs";

interface TempProps {

}

const DSTemperatureInfo: FunctionComponent<TempProps> = ({}) => {
    const {send} = useDashboard();
    const {selectedCamera, cameraInfo, tempReadings} = useDashboardFunc();
    const [tempData, setTempData] = useState<{ min: TempReading, max: TempReading } | null>(null);
    const [tempDates, setTempDates] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);
    const [renderCanvas, setRenderCanvas] = useState(false);
    const [refreshTempData, setRefreshTempData] = useState(false);
    const layoutRef = useRef<{ width: number, height: number } | null>(null)
    const canvasRef = useRef<Canvas>(null)

    if (!selectedCamera) {
        return null;
    }
    if (!(cameraInfo instanceof CameraInfoOnline)) {
        return null;
    }

    useEffect(() => {
        if (!selectedCamera) {
            return
        }

        if (!tempReadings) {
            send(Messages.REQUEST_TEMP_READINGS, {
                camera_id: selectedCamera.id
            })
        }

        let update = false;
        const interval = setInterval(() => {
            update = !update;
        }, 1000 * 60);

        return () => {
            clearInterval(interval);
        }
    }, [selectedCamera, tempReadings]);

    useEffect(() => {
        if (!tempReadings || tempReadings.length < 2) {
            return;
        }

        let readingsMinDate: Date | null = null, readingsMaxDate: Date | null = null;
        let filteredReadings: TempReading[] = [...tempReadings].reverse();
        for (let reading of tempReadings) {
            let date = reading.date;
            if (readingsMinDate == null || readingsMaxDate == null) {
                readingsMinDate = date;
                readingsMaxDate = date;
            } else {
                if (readingsMinDate.getTime() > date.getTime()) {
                    readingsMinDate = date;
                }
                if (readingsMaxDate.getTime() < date.getTime()) {
                    readingsMaxDate = date;
                }
            }
        }

        if (readingsMinDate == null || readingsMaxDate == null) {
            return;
        }

        const maxDiff = 1000 * 60 * 60 * 48;
        if (readingsMaxDate.getTime() - readingsMinDate.getTime() > maxDiff) {
            filteredReadings = tempReadings.filter((reading) => {
                return readingsMaxDate != null && readingsMaxDate.getTime() - reading.date.getTime() <= maxDiff;
            })
        }

        let readingsMinTemp = null, readingsMaxTemp = null;
        let readingsMinTempDate = null, readingsMaxTempDate = null;
        for (let reading of filteredReadings) {
            let temp = reading.temperature;
            let date = reading.date;
            if (readingsMinTemp == null || readingsMaxTemp == null) {
                readingsMinTemp = temp;
                readingsMaxTemp = temp;
                readingsMinTempDate = date;
                readingsMaxTempDate = date;
            } else {
                if (readingsMinTemp > temp) {
                    readingsMinTemp = temp;
                    readingsMinTempDate = date;
                }
                if (readingsMaxTemp < temp) {
                    readingsMaxTemp = temp;
                    readingsMaxTempDate = date;
                }
            }
        }

        if (readingsMinTemp == null || readingsMaxTemp == null || readingsMinTempDate == null || readingsMaxTempDate == null) {
            return;
        }

        setTempData({
            min: {date: readingsMinTempDate, temperature: readingsMinTemp},
            max: {date: readingsMaxTempDate, temperature: readingsMaxTemp}
        });

        if (!renderCanvas) {
            return;
        }


        const canvas = canvasRef.current;
        const layout = layoutRef.current;
        if (!canvas || !layout) {
            return
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) {
            return;
        }

        const width = layout.width;
        const height = layout.height;
        canvas.height = height;
        canvas.width = width;

        ctx.clearRect(0, 0, width, height);

        const tempScale = 2;
        const scaleTempMin = 2 * Math.round((readingsMinTemp - tempScale) / 2);
        const scaleTempMax = 2 * Math.ceil((readingsMaxTemp + tempScale) / 2);
        const rows = (scaleTempMax - scaleTempMin) / tempScale;
        const pixelsPerRow = height / rows;

        const leftOffset = 25;
        const rightOffset = 7;
        const totalDateSize = (width - leftOffset - rightOffset) / (readingsMaxDate.getTime() - readingsMinDate.getTime());

        //build background
        for (let temp = scaleTempMin, y = height - (pixelsPerRow / 2); temp < scaleTempMax && y >= 0; temp += tempScale, y -= pixelsPerRow) {
            ctx.beginPath();
            ctx.fillStyle = "#878787";
            ctx.font = "10px Roboto";
            ctx.fillText(temp + "°", 5, y + 2.5, 20);
            ctx.closePath();

            ctx.beginPath();
            ctx.strokeStyle = "#cacaca";
            ctx.moveTo(20, y);
            ctx.lineTo(width, y);
            ctx.stroke();
            ctx.closePath();
        }

        ctx.beginPath();
        ctx.strokeStyle = "#7872f1";
        ctx.lineWidth = 2;

        let arcs: { x: number, y: number, reading: TempReading, color: string }[] = [];
        let first = true;
        for (let reading of filteredReadings) {
            let x: number = width - rightOffset - ((readingsMaxDate.getTime() - reading.date.getTime()) * totalDateSize);
            //let y: number = height - (pixelsPerRow / 2) - (scaleBetween(reading.temperature, pixelsPerRow / 2, height - pixelsPerRow * 2, readingsMinTemp, readingsMaxTemp));
            let y: number = height - (pixelsPerRow / 2) - scaleBetween(reading.temperature, 0, height, scaleTempMin, scaleTempMax)

            if (first) {
                ctx.moveTo(x, y);
                first = false;
            } else {
                ctx.lineTo(x, y);
                ctx.moveTo(x, y);
            }
            arcs.push({
                x: x,
                y: y,
                reading: reading,
                color: (reading.temperature === readingsMaxTemp ? "#d33924" : (reading.temperature === readingsMinTemp ? "#34b7d5" : "#5a53ee"))
            });
        }

        ctx.stroke();
        ctx.closePath();

        for (let i = 0; i < arcs.length; i++) {
            let prevArc = i <= 0 ? null : arcs[i - 1];
            let nextArc = i >= arcs.length - 1 ? null : arcs[i + 1];
            let arc = arcs[i];

            let xBef = prevArc ? (arc.x + prevArc.x) / 2 : 0;
            let xAft = nextArc ? (arc.x + nextArc.x) / 2 : width;
            let {timeOfDay} = getDateData(arc.reading.date);
            if (timeOfDay === "night") {
                ctx.beginPath();
                ctx.fillStyle = '#6B7AEE22';
                ctx.rect(xBef, 0, xAft - xBef, height);
                ctx.fill();
                ctx.closePath();
            }
        }

        for (let arc of arcs) {
            ctx.fillStyle = arc.color;
            ctx.beginPath();
            ctx.arc(arc.x, arc.y, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }


        // for (let i = 0; i < arcs.length; i++) {
        //     pointsRef.current[i] = createRef();
        // }
        // setPoints(arcs);
    }, [tempReadings, renderCanvas, refreshTempData])

    const refresh = () => {
        setRefreshTempData(!refreshTempData)
    };
    useEffect(() => {
        if (tempData) {
            return;
        }

        const timeout = setTimeout(() => {
            if (!tempData) {
                refresh();
            }
        }, 2000);

        return () => {
            clearTimeout(timeout);
        }
    }, [tempData, refreshTempData])

    return (
        <>
            <DSInfoBlock icon={TemperatureIcon} title={"Teraz"}>
                <Text style={styles.dataText}>{cameraInfo.temperature.toFixed(1)}°C</Text>
            </DSInfoBlock>
            <DSInfoBlock icon={TemperatureLowIcon} title={"Najniższa"} iconColor={DefTheme.colors.tempMin}
                         clickable={true} onClick={() => {
                setTempDates(!tempDates)
            }}>
                {tempData ? (<Text
                    style={styles.dataText}>{tempDates ? (tempData.min.temperature >= cameraInfo.temperature ? "Teraz" : dayjs(tempData.min.date).fromNow()) : (tempData.min.temperature.toFixed(1) + "°C")}</Text>) : (
                    <ProgressLoader show={true} size={16}/>)}
            </DSInfoBlock>
            <DSInfoBlock icon={TemperatureHighIcon} title={"Najwyższa"} iconColor={DefTheme.colors.tempMax}
                         clickable={true} onClick={() => {
                setTempDates(!tempDates)
            }}>
                {tempData ? (<Text
                    style={styles.dataText}>{tempDates ? (tempData.max.temperature <= cameraInfo.temperature ? "Teraz" : dayjs(tempData.max.date).fromNow()) : (tempData.max.temperature.toFixed(1) + "°C")}</Text>) : (
                    <ProgressLoader show={true} size={16}/>)}
            </DSInfoBlock>
            <View style={styles.tempBox}>
                <View style={styles.tempBoxHeader}>
                    <Text style={styles.tempBoxTitle}>Wykres temperatur</Text>
                    <View style={{marginLeft: "auto"}}><MButton text={showCanvas ? "Ukryj" : "Pokaż"} onClick={() => {
                        setRenderCanvas(false);
                        setShowCanvas(!showCanvas)
                    }} small={true}/></View>
                </View>
                <Collapsible collapsed={!showCanvas} onAnimationEnd={() => {
                    setRenderCanvas(true)
                }}>
                    <View style={{height: 250, overflow: "hidden", borderRadius: 10, marginTop: 15}} onLayout={(e) => {
                        layoutRef.current = {width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height}
                    }}>
                        {renderCanvas ? <Canvas ref={canvasRef} style={{height: "100%", width: "100%"}}/> : null}
                    </View>
                </Collapsible>
            </View>
        </>
    )
};

export default DSTemperatureInfo;
