import React, {createContext, FunctionComponent, ReactNode, useContext, useEffect, useState} from 'react';
import axios, {AxiosError} from "axios";
import {AuthCookies, useAuth} from "./AuthContext";
import {AccountData} from "../data/account";
import {ENV_API_SERVER} from "../data/env";

interface AccountContextProviderProps {
    children: ReactNode;
    loadingCallback: (loading: boolean) => void;
}

type Props = AccountContextProviderProps;

export interface AccountContextProps {
    userData: AccountData | null;
    refreshAccountData: () => void;
    generateHash: (callback: (hash: string | null) => void) => void;
}

const AccountContext = createContext<AccountContextProps | null>(null);

export function useAccountContext() {
    return useContext(AccountContext) || {} as AccountContextProps;
}

const apiServer = ENV_API_SERVER;
const fetchUser = (auth: AuthCookies, callback: (user: AccountData | number | null) => void) => {
    try {
        axios.post(apiServer + "/account", {
            nick: auth.nick,
            token: auth.token
        }).then((response) => {
            if (response.status === 200) {
                callback(AccountData.fromServer(response.data));
            } else {
                callback(response.status);
            }
        }).catch(e => {
            if (e instanceof AxiosError) {
                callback(e.response?.status || null);
            }
        })
    } catch (e) {
        callback(null);
    }
}

const AccountContextProvider: FunctionComponent<Props> = ({children, loadingCallback}) => {
    const [userData, setUserData] = useState<AccountData | null>(null);
    const [loading, _setLoading] = useState(false);

    const setLoading = (load: boolean) => {
        _setLoading(load);
        loadingCallback(load);
    }

    const {setUser, cookiesCache, getFromCookies, logout} = useAuth();
    let cookies = cookiesCache;

    useEffect(() => {
        if (!cookies) {
            getFromCookies().then(c => {
                cookies = c;
            })
            return;
        }

        if (userData) {
            return;
        }

        refresh();
    }, [cookies]);

    const refresh = () => {
        if (!cookies) {
            return;
        }

        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 15000);

        fetchUser(cookies, (user) => {
            clearTimeout(timeout);
            setLoading(false);

            if (user instanceof AccountData) {
                setUser(user.user);
                setUserData(user);
            } else {
                if (user === 401) {
                    logout(true);
                }
            }
        })
    }


    const generateHash = (callback: (hash: string | null) => void) => {
        if (!cookies) {
            return
        }
        try {
            axios.post(apiServer + "/account/generate-hash", {
                nick: cookies.nick,
                token: cookies.token
            }).then((response) => {
                if (response.status === 200) {
                    callback(response.data['hash']);
                } else {
                    callback(null);
                }
            })
        } catch (e) {
            callback(null);
        }
    }

    if (!cookies) {
        return null;
    }

    const contextProps: AccountContextProps = {
        refreshAccountData: refresh,
        userData,
        generateHash
    }

    return (
        <AccountContext.Provider value={contextProps}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;
