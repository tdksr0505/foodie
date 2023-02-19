import React, { createContext, useState, useEffect, useRef } from 'react';
import { TChildren } from '@/type';
import { useCookies } from 'react-cookie';
interface IUser {
  account: string;
  token: string;
}
const AUTH_KEY = 'auth';
const LOGIN_KEY = 'isLogin';
const contextDefaultValue = {
  user: { account: '', token: '' },
  login: (user: IUser) => {},
  logout: () => {},
  auth: false,
};

export const AuthContext = createContext(contextDefaultValue);
export const AuthProvider = ({ children }: TChildren) => {
  const [cookies, setCookie] = useCookies();
  const [user, setUser] = useState<IUser>(contextDefaultValue.user);
  const [auth, setAuth] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) {
      let authStr = JSON.stringify(user);
      let encode = Buffer.from(authStr).toString('base64');
      localStorage.setItem(AUTH_KEY, encode);
    } else {
      // first render
      let auth = localStorage.getItem('auth');
      if (auth) {
        let decode = Buffer.from(auth, 'base64').toString('ascii');
        setUser(JSON.parse(decode));
      }
      isMounted.current = true;
    }
    setAuth(user.account !== '' && user.token !== '');
  }, [user]);

  const login = (data: IUser) => {
    setUser({
      account: data.account,
      token: data.token,
    });
    setCookie(LOGIN_KEY, 1, { path: '/' });
  };
  const logout = () => {
    setUser({
      account: '',
      token: '',
    });
    setCookie(LOGIN_KEY, 0, { path: '/' });
  };
  const providerValue = {
    user,
    login,
    logout,
    auth,
  };
  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};
