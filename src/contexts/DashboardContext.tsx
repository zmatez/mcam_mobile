import React, {createContext, FunctionComponent, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import {useAuth} from "./AuthContext";
import {Messages} from "../data/messages";
import {User} from "../data/user";
import {ENV_API_SOCKET} from "../data/env";

interface DashboardProviderProps {
    children: ReactNode;
}

type Props = DashboardProviderProps;

export interface DashboardContextProps {
    subscribe: (channel: number, callback: (data: any) => void) => SubscriptionData;
    unsubscribe: (subscription: SubscriptionData) => void;
    send: (channel: number, data: any) => boolean;
    once: (channel: number, timeout: number, accept?: (data: any) => boolean) => Promise<any>;
    isConnected: boolean;
}

interface SubscriptionData {
    channel: number;
    callback: (data: any) => void;
}

const DashboardContext = createContext<DashboardContextProps | null>(null);

export function useDashboard() {
    return useContext(DashboardContext) || {} as DashboardContextProps;
}

const DashboardProvider: FunctionComponent<Props> = ({children}) => {
    const {getFromCookies, setUser, logout} = useAuth();
    const [connected, setConnected] = useState(false);
    const connectedRef = useRef(false);
    const [subscriptions, setSubscriptions] = useState<{ [channel: number]: ((data: any) => void)[] }>({});
    const sendCallbackRef = useRef<((channel: number, data: any) => boolean) | null>(null);

    useEffect(() => {
        let channel: string | null = null;
        let authorized = false;
        let close = false;

        const url = ENV_API_SOCKET;
        if (!url) {
            return
        }

        let socket: WebSocket | null = null;

        const connect = async () => {
            const auth = await getFromCookies();
            if (!auth) {
                return;
            }

            socket = new WebSocket(url)
            socket.binaryType = 'arraybuffer';

            socket.onopen = () => {
                if (auth != null && socket)
                    socket.send(JSON.stringify({
                        "type": "user",
                        "auth": {
                            nick: auth.nick,
                            token: auth.token
                        }
                    }))
            }

            const receive = (channel: number, data: any) => {
                if (!authorized) {
                    if (channel === Messages.AUTHENTICATION_SUCCESSFUL) {
                        const user = User.fromServer(JSON.parse(data));
                        setUser(user);
                        connectedRef.current = true;
                        setConnected(true);
                        console.log("Connected as " + user?.nick)
                        authorized = true;
                    } else if (channel === Messages.AUTHENTICATION_FAILED) {
                        console.error("Unable to authenticate. User needs to log in again");
                        logout(true);
                    }
                    return
                }

                if (subscriptions.hasOwnProperty(channel)) {
                    subscriptions[channel].forEach((sub) => {
                        sub(data);
                    })
                }
            }

            const send = (channel: number, data: any): boolean => {
                if (!authorized || !socket) {
                    return false;
                }

                if (!connectedRef.current) {
                    return false;
                }

                console.log('message sent: ' + channel)

                let sendData = data;
                if (typeof sendData == 'object') {
                    sendData = JSON.stringify(sendData);
                }

                socket.send(channel + '');
                socket.send(sendData);

                return true;
            }

            sendCallbackRef.current = send;

            socket.onmessage = (msg) => {
                if (channel == null) {
                    channel = msg.data;
                } else {
                    receive(parseInt(channel), msg.data);
                    channel = null;
                }
            }

            socket.onclose = () => {
                connectedRef.current = false;
                setConnected(false);
                authorized = false;
                if (!close) {
                    // reconnect
                    setTimeout(() => {
                        connect();
                    }, 2000)
                }
            }
        }

        connect();

        return () => {
            close = true;
            if (socket) {
                socket.close();
            }
        }
    }, []);

    const subscribe = (channel: number, callback: (data: any) => void): SubscriptionData => {
        const subscriptionsCapture = subscriptions;
        if (!subscriptionsCapture.hasOwnProperty(channel)) {
            subscriptionsCapture[channel] = [callback];
        } else {
            subscriptionsCapture[channel].push(callback);
        }

        setSubscriptions(subscriptionsCapture);

        return {
            channel: channel,
            callback: callback
        }
    }

    const unsubscribe = (subscription: SubscriptionData) => {
        const subscriptionsCapture = subscriptions;
        if (subscriptionsCapture.hasOwnProperty(subscription.channel)) {
            subscriptionsCapture[subscription.channel] = subscriptionsCapture[subscription.channel].filter((cb) => cb !== subscription.callback);

            setSubscriptions(subscriptionsCapture);
        }
    }

    const send = (channel: number, data: any): boolean => {
        if (sendCallbackRef.current) {
            return sendCallbackRef.current(channel, data);
        }

        return false;
    }

    const once = async (channel: number, timeout: number, accept?: (data: any) => boolean): Promise<any> => {
        let awaiting = true;
        return new Promise((resolve) => {
            const sub = subscribe(channel, (data) => {
                if (!accept || accept(data)) {
                    console.log("GOT DATA " + data)
                    awaiting = false;
                    unsubscribe(sub);
                    resolve(data);
                }
            });

            setTimeout(() => {
                if (awaiting) {
                    resolve(null);
                    awaiting = false;
                    unsubscribe(sub);
                }
            }, timeout);
        });
    }

    const isConnected = connected;

    const contextProps: DashboardContextProps = {
        subscribe,
        unsubscribe,
        send,
        once,
        isConnected
    }

    return (
        <DashboardContext.Provider value={contextProps}>
            {children}
        </DashboardContext.Provider>
    );
};

export default DashboardProvider;
