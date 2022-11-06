import React, {createContext, FunctionComponent, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import {Image} from "react-native";
import {Messages} from "../data/messages";
import {useDashboard} from "./DashboardContext";
import {useDashboardFunc} from "./DashboardFuncContext";
import {encode as btoa} from 'base-64'

interface StreamContextProviderProps {
    children: ReactNode
}

type Props = StreamContextProviderProps;

export interface StreamContextProps {
    loading: boolean;
    onFpsEvent: (event: (fps: number) => void) => void;
    liveFrameRef: React.MutableRefObject<Image | null>;
}

const StreamContext = createContext<StreamContextProps | null>(null);

export function useStreamContext() {
    return useContext(StreamContext) || {} as StreamContextProps;
}

const StreamContextProvider: FunctionComponent<Props> = ({children}) => {
    const {send, subscribe, unsubscribe} = useDashboard();
    const [loading, setLoading] = useState(false);
    const {selectedCamera, cameraInfo, streaming, setStreaming, streamingRef} = useDashboardFunc();
    const liveFrameRef = useRef<Image | null>(null);
    const fpsRef = useRef<number>(0);
    const fpsEventRef = useRef<((fps: number) => void) | null>(null);

    useEffect(() => {
        if (selectedCamera == null) {
            return;
        }

        if (liveFrameRef.current && streaming === null) {
            liveFrameRef.current.setNativeProps({
                src: selectedCamera?.getLocalScreenshot()
            });
        }

        let currentFps = 0;
        let first = true;

        const sub = subscribe(Messages.RESPOND_STREAM, (data) => {
            // data - my current image in b64
            if (liveFrameRef.current) {
                let bytes = new Uint8Array(data);
                let binary = '';
                let len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i])
                }
                currentFps++;
                toggleLoading(false);

                const image = "data:image/jpg;base64," + btoa(binary);

                if (first) {
                    first = false;
                    selectedCamera.setLocalScreenshot(image);
                }

                liveFrameRef.current.setNativeProps({
                    src: [{uri: image}],
                });
            }
        });

        const fpsInterval = setInterval(() => {
            if (fpsRef.current != null) {
                fpsRef.current = currentFps;
                console.log("FPS: " + currentFps)
                if (fpsEventRef.current) {
                    fpsEventRef.current(currentFps);
                }
            }
            if (currentFps === 0 && streamingRef.current) {
                toggleLoading(true)
            }
            currentFps = 0;
        }, 1000);

        return () => {
            send(Messages.REQUEST_STREAM_END, {id: selectedCamera.id});
            unsubscribe(sub);
            clearInterval(fpsInterval);
        }
    }, [selectedCamera]);

    useEffect(() => {
        if (selectedCamera == null) {
            return;
        }

        let interval: NodeJS.Timer | null = null;

        if (streaming) {
            send(Messages.REQUEST_STREAM_START, {id: selectedCamera.id});
            interval = setInterval(() => {
                send(Messages.REQUEST_STREAM_START, {id: selectedCamera.id});
            }, 7000)
        } else {
            if (streaming !== null) {
                send(Messages.REQUEST_STREAM_END, {id: selectedCamera.id});
            }

            toggleLoading(false);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }, [streaming, selectedCamera]);

    const toggleLoading = (load: boolean) => {
        setLoading(load);
    }

    const onFpsEvent = (event: (fps: number) => void) => {
        fpsEventRef.current = event;
    }

    const contextProps: StreamContextProps = {
        loading,
        onFpsEvent,
        liveFrameRef
    };

    return (
        <StreamContext.Provider value={contextProps}>
            {children}
        </StreamContext.Provider>
    );
};

export default StreamContextProvider;
