import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import fb from '../utils/fb';
import api from '../utils/api';

export const AuthContext = createContext({
  isLogin: false,
  user: {},
  loading: false,
  jwtToken: '',
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  console.log({ user });
  const [loading, setLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState();

  const handleLoginResponse = useCallback(async (response) => {
    const accessToken = response.authResponse.accessToken;
    const { data } = await api.signin({
      provider: 'facebook',
      access_token: accessToken,
    });
    const { access_token: tokenFromServer, user: userData } = data;
    setUser(userData);
    setJwtToken(tokenFromServer);
    window.localStorage.setItem('jwtToken', tokenFromServer);
    setIsLogin(true);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await fb.init();
      const response = await fb.getLoginStatus();
      console.log(response.status);
      if (response.status === 'connected') {
        handleLoginResponse(response);
      } else {
        window.localStorage.removeItem('jwtToken');
      }
      setLoading(false);
    }
    checkAuthStatus();
  }, [handleLoginResponse]);

  const login = async () => {
    setLoading(true);
    const response = await fb.login();
    if (response.status === 'connected') {
      handleLoginResponse(response);
    } else {
      window.localStorage.removeItem('jwtToken');
    }
    setLoading(false);
  }

  const logout = async () => {
    setLoading(true);
    await fb.logout();
    setIsLogin(false);
    setUser({});
    setJwtToken();
    window.localStorage.removeItem('jwtToken');
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        user,
        loading,
        jwtToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
