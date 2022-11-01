import React, {createContext, FunctionComponent, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import {
    Camera,
    CameraHistory,
    CameraInfo,
    CameraInfoOffline,
    CameraInfoOnline,
    CameraSettings,
    TempReading
} from "../data/camera";
import {useDashboard} from "./DashboardContext";
import {Messages} from "../data/messages";

interface DashboardFuncProviderProps {
    children: ReactNode;
}

type Props = DashboardFuncProviderProps;

interface DashboardFuncContextProps {
    selectedCamera: Camera | null;
    selectCamera: (camera: Camera) => void;
    cameras: Camera[] | null;
    cameraInfo: CameraInfo | null;
    cameraHistory: CameraHistory | null;
    cameraSettings: CameraSettings | null;
    refreshCameraInfo: () => void;
    refreshCameraList: () => void;
    refreshCameraSettings: () => void;
    refreshingCameraSettings: boolean;
    openUpdateModal: () => void;
    streaming: boolean | null;
    setStreaming: (val: boolean | null) => void;
    tempReadings: TempReading[] | null;
}

const DashboardFuncContext = createContext<DashboardFuncContextProps | null>(null);

export function useDashboardFunc() {
    return useContext(DashboardFuncContext) || {} as DashboardFuncContextProps;
}

const DashboardFuncProvider: FunctionComponent<Props> = ({children}) => {
    const {subscribe, unsubscribe, send, isConnected} = useDashboard();

    const [cameras, setCameras] = useState<Camera[] | null>(null);
    const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
    const cameraRef = useRef<Camera | null>(null);
    const [currentCameraInfo, setCurrentCameraInfo] = useState<CameraInfo | null>(null);
    const [currentCameraHistory, setCurrentCameraHistory] = useState<CameraHistory | null>(null);
    const [currentCameraSettings, setCurrentCameraSettings] = useState<CameraSettings | null>(null);
    const [refreshingCameraSettings, setRefreshingCameraSettings] = useState(false);
    const [streaming, setStreaming] = useState<boolean | null>(null);
    const [tempReadings, setTempReadings] = useState<TempReading[] | null>(null);

    // update modal
    const [updateModal, setUpdateModal] = useState(false);
    const [updateModalTimes, setUpdateModalTimes] = useState(0);

    //? request live list
    useEffect(() => {
        const onCameraList = subscribe(Messages.RESPOND_CAMERA_LIST, (data) => {
            const json = JSON.parse(data);
            if (json) {
                let cameras = [];
                for (let camJson of json) {
                    const camera = Camera.fromServer(camJson);
                    if (camera) {
                        cameras.push(camera);
                    }
                }

                // update cameras
                setCameras(cameras);
                if (cameraRef.current) {
                    let refresh = false;
                    for (let camera of cameras) {
                        if (cameraRef.current.id === camera.id) {
                            // setSelected instead of select - do not refresh the UI.
                            setSelectedCamera(camera);
                            refresh = true;
                            break
                        }
                    }

                    if (!refresh) {
                        selectCamera(null);
                    }
                } else {
                    // if (queryParams.has('camera')) {
                    //     let refresh = false;
                    //     for (let camera of cameras) {
                    //         if (queryParams.get('camera') === camera.sid) {
                    //             selectCamera(camera);
                    //             refresh = true;
                    //             break
                    //         }
                    //     }
                    //
                    //     if (!refresh) {
                    //         selectCamera(null);
                    //     }
                    // }
                }
            } else {
                setCameras([]);
                selectCamera(null);
            }
        });

        send(Messages.REQUEST_CAMERA_LIST, null);

        return () => {
            unsubscribe(onCameraList);
        }
    }, [isConnected]);

    //? request live info
    useEffect(() => {
        let lastUpdate: Date | null = null;

        const sub = subscribe(Messages.RESPOND_CAMERA_INFO, (data) => {
            const json = JSON.parse(data);
            console.log("info: ")
            console.log(json)
            if (json && cameraRef.current) {
                if (json['camera'] == cameraRef.current.id) {
                    if (json['status'] === "online") {
                        const info = CameraInfoOnline.fromServer(json['data']);
                        if (info) {
                            setCurrentCameraInfo(info);
                            lastUpdate = new Date();
                        }
                    } else if (json['status'] === "offline") {
                        const info = CameraInfoOffline.fromServer(json['data']);
                        if (info) {
                            setCurrentCameraInfo(info);
                            lastUpdate = new Date();
                        }
                    }
                }
            }
        })

        const updateInterval = setInterval(() => {
            if (!lastUpdate || lastUpdate.getTime() < new Date().getTime() + 5000) {
                refreshCameraInfo();
                lastUpdate = new Date();
            }
        }, 5000)

        return () => {
            unsubscribe(sub);
            clearInterval(updateInterval);
        }
    }, [])

    //? request live history
    useEffect(() => {
        const sub = subscribe(Messages.RESPOND_PICTURE_LIST, (data) => {
            const json = JSON.parse(data);
            console.log("history: ")
            console.log(json)
            if (json && cameraRef.current) {
                if (json['camera'] === cameraRef.current.id) {
                    setCurrentCameraHistory(CameraHistory.fromServer(json['data']));
                }
            }
        })
        return () => {
            unsubscribe(sub);
        }
    }, [])

    //? request settings
    useEffect(() => {
        const sub = subscribe(Messages.RESPOND_SETTINGS_DATA, (data) => {
            const json = JSON.parse(data);
            console.log("settings: ")
            console.log(json)
            if (json && cameraRef.current) {
                if (json['camera'] === cameraRef.current.id) {
                    setRefreshingCameraSettings(false);
                    setCurrentCameraSettings(CameraSettings.fromServer(json['data']));
                }
            }
        })
        return () => {
            unsubscribe(sub);
        }
    }, []);

    //? request temp readings
    useEffect(() => {
        const sub = subscribe(Messages.RESPOND_TEMP_READINGS, (data) => {
            const json = JSON.parse(data);
            if (json && cameraRef.current) {
                if (json['camera'] === cameraRef.current.id) {
                    const tempReadings: TempReading[] = [];
                    console.log(json['data'])
                    for (let reading of json['data']) {
                        const date = new Date(Date.UTC(parseInt("20" + (reading['y'] + "").substring(1)), reading['m'], reading['d'], reading['hh'], reading['mm'], reading['ss']));
                        tempReadings.push({date: date, temperature: reading['t']});
                    }

                    // tempReadings.push({date: new Date(new Date().getTime() - 1000 * 60 * 60), temperature: 25.5});
                    // tempReadings.push({date: new Date(new Date().getTime() - 1000 * 60 * 60 * 4), temperature: 22.5});
                    // tempReadings.push({date: new Date(new Date().getTime() - 1000 * 60 * 60 * 5), temperature: 18.1});
                    // tempReadings.push({date: new Date(new Date().getTime() - 1000 * 60 * 60 * 6), temperature: 15.2});
                    // tempReadings.push({date: new Date(new Date().getTime() - 1000 * 60 * 60 * 7), temperature: 19.3});
                    // tempReadings.push({date: new Date(new Date().getTime() - 1000 * 60 * 60 * 8), temperature: 23.7});
                    // tempReadings.push({date: new Date(new Date().getTime() - 1000 * 60 * 60 * 8), temperature: 28.5});

                    setTempReadings(tempReadings);
                }
            }
        })
        return () => {
            unsubscribe(sub);
        }
    }, []);

    //refresh settings on camera change
    useEffect(() => {
        if (selectedCamera) {
            refreshCameraSettings();
        }
    }, [selectedCamera]);

    const selectCamera = (camera: Camera | null) => {
        setCurrentCameraInfo(null);
        setCurrentCameraHistory(null);
        setCurrentCameraSettings(null);
        setTempReadings(null);

        if (!camera) {
            cameraRef.current = null;
            setSelectedCamera(null);
            return
        }
        if (camera === selectedCamera) {
            cameraRef.current = null;
            setSelectedCamera(null);
            return;
        }

        cameraRef.current = camera;
        setSelectedCamera(camera);
        send(Messages.REQUEST_CAMERA_INFO, {id: camera.id});
    }

    const refreshCameraInfo = () => {
        if (cameraRef.current)
            send(Messages.REQUEST_CAMERA_INFO, {id: cameraRef.current.id})
    }

    const refreshCameraList = () => {
        send(Messages.REQUEST_CAMERA_LIST, null);
    }

    const refreshCameraSettings = () => {
        if (cameraRef.current) {
            setRefreshingCameraSettings(true);
            send(Messages.REQUEST_SETTINGS_DATA, {id: cameraRef.current.id})
        }
    }

    const openUpdateModal = () => {
        setUpdateModalTimes(updateModalTimes + 1);
        setUpdateModal(true);
    }

    const cameraInfo = currentCameraInfo;
    const cameraHistory = currentCameraHistory;
    const cameraSettings = currentCameraSettings;

    const contextProps: DashboardFuncContextProps = {
        selectedCamera,
        selectCamera,
        cameraInfo,
        refreshCameraInfo,
        cameras,
        cameraHistory,
        cameraSettings,
        refreshCameraList,
        refreshCameraSettings,
        openUpdateModal,
        refreshingCameraSettings,
        streaming,
        setStreaming,
        tempReadings
    }


    return (
        <DashboardFuncContext.Provider value={contextProps}>
            {children}
        </DashboardFuncContext.Provider>
    );
};

export default DashboardFuncProvider;
