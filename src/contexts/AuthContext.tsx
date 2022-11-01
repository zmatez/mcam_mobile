import React, {createContext, FunctionComponent, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import {User} from "../data/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {AxiosError} from 'axios';
import {ENV_API_SERVER} from './../data/env'
import {NavigationProp, useNavigation} from "@react-navigation/native";

interface AuthProviderProps {
    children: ReactNode;
    onLoad: () => void;
}

type Props = AuthProviderProps;

export interface AuthCookies {
    nick: string;
    token: string;
    color: string;
    admin: boolean;
}

interface AuthContextProps {
    currentUser: User | null,
    register: (nick: string, email: string, password: string) => Promise<{ status: number, error?: number }>,
    login: (nick: string, password: string) => Promise<{ status: number, error?: number }>,
    logout: (requestLogin: boolean) => void,
    fetchUser: () => Promise<number>,
    getToken: () => string | null,
    getFromCookies: () => Promise<AuthCookies | null>;
    setUser: (user: User | null) => void;
    setUserColor: (color: string) => void;
    cookiesCache: AuthCookies | null;
    setCookiesCache: (cookies: AuthCookies | null) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuth() {
    return useContext(AuthContext) || {} as AuthContextProps;
}

export const AuthProvider: FunctionComponent<Props> = ({children, onLoad}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [dataUpToDate, setDataUpToDate] = useState<boolean>(false);
    const [cookiesCache, _setCookiesCache] = useState<AuthCookies | null>(null);
    const cookiesCacheRef = useRef<AuthCookies | null>(null);
    const navigation: NavigationProp<any> = useNavigation();

    const getToken = (): string | null => {
        if (currentUser && currentUser.token) {
            return currentUser.token;
        }

        return null;
    }

    const setCookiesCache = (cache: AuthCookies | null) => {
        cookiesCacheRef.current = cache;
        _setCookiesCache(cache);
    }

    const getFromCookies = async (): Promise<AuthCookies | null> => {
        try {
            const auth = await AsyncStorage.getItem('auth')
            if(auth != null) {
                const data = JSON.parse(auth);
                if(data != null) {
                    const cookies = {
                        nick: data['nick'],
                        token: data['token'],
                        color: data['color'],
                        admin: data['admin'] || false
                    }
                    setCookiesCache(cookies);
                    return cookies;
                }
            }
            setCookiesCache(null);
            return null;
        } catch(e) {
            setCookiesCache(null);
            return null;
        }
    }

    //------------------------------------------------------------------------

    const setUser = async (user: User | null) => {
        if (user) {
            setDataUpToDate(true);
            const data: AuthCookies = {
                nick: user.nick,
                token: user.token || "",
                color: user.color,
                admin: user.admin
            }
            await AsyncStorage.setItem("auth",JSON.stringify(data))
            setCurrentUser(user);
            setCookiesCache(data);
        } else {
            await AsyncStorage.removeItem("auth");
            setCookiesCache(null);
            setDataUpToDate(false);
        }
    }

    const apiServer = ENV_API_SERVER;

    const register = async (nick: string, email: string, password: string): Promise<{ status: number, error?: number }> => {
        try {
            const response = await axios.post(apiServer + "/register", {
                nick: nick,
                email: email,
                password: password
            });

            if (response.status === 200) {
                const user = User.fromServer(response.data.data);

                if (!user) {
                    return {
                        status: 500
                    };
                }

                await setUser(user);
                return {status: 200};
            }

            return {
                status: response.status,
                error: response.data
            };
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response) {
                    return {
                        status: e.response.status,
                        error: e.response.data ? e.response.data['code'] : null
                    };
                }
            }

            return {
                status: 404
            };
        }
    }

    const login = async (nick: string, password: string): Promise<{ status: number, error?: number }> => {
        try {
            const response = await axios.post(apiServer + "/login", {
                nick: nick,
                password: password
            });

            if (response.status === 200) {
                const user = User.fromServer(response.data.data);

                if (!user) {
                    return {
                        status: 500
                    };
                }

                await setUser(user);
                return {status: 200};
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response) {
                    return {
                        status: e.response.status,
                        error: e.response.data ? e.response.data['code'] : null
                    };
                }
            }
        }
        return {
            status: 404
        };
    }

    const logout = async (requestLogin: boolean = false) => {
        await setUser(null);
        if (requestLogin) {
            navigation.navigate('Login');
        } else {
            navigation.navigate('Home');
        }
    }

    const fetchUser = async (): Promise<number> => {
        // here it should have already nick and token in cookies, so there's no need to send it in json
        // if token is not valid, user will get logged out

        if(!cookiesCacheRef.current) {
            return 404;
        }

        try {
            const response = await axios.post(apiServer + "/account", {
                nick: cookiesCacheRef.current.nick,
                token: cookiesCacheRef.current.token
            });
            if (response.status === 200) {
                const user = User.fromServer(response.data.data);

                if (!user) {
                    await setUser(null);
                }

                await setUser(user);
            } else {
                await setUser(null);
            }

            return response.status;
        }catch (e) {
            await setUser(null);

            if (e instanceof AxiosError) {
                if (e.response) {
                    return e.response.status;
                }
            }
        }
        return 404;
    }

    const setUserColor = async (color: string): Promise<boolean> => {
        const cookies = await getFromCookies();
        if (!cookies) {
            return false;
        }

        try {
            const response = await axios.post(apiServer + "/account/set-color", {
                nick: cookies.nick,
                token: cookies.token,
                color: color
            });
            if (response.status === 200) {
                if (currentUser) {
                    const newUser = currentUser;
                    newUser.color = color;
                    await setUser(newUser);
                    console.log("set user")
                }
                return true;
            }
        } catch (e) {
        }
        return false;
    }


    //------------------------------------
    //> first run, fetch data from memory
    useEffect(() => {
        getFromCookies().then((cookies) => {
            console.log("Got from cookies")
            console.log(cookies);
            if(cookies == null) {
                onLoad();
            } else {
                fetchUser().then((u) => {
                    console.log(u)
                    onLoad();
                })
            }
        })
    },[])

    const value: AuthContextProps = {
        currentUser,
        register,
        login,
        logout,
        fetchUser,
        getToken,
        getFromCookies,
        setUser,
        setUserColor,
        cookiesCache,
        setCookiesCache
    }

    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>);
};

export default AuthContext;