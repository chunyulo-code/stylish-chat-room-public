import { createContext, useState, useEffect, useCallback } from "react";
import fb from "../utils/fb";
import api from "../utils/api";

export const AuthContext = createContext({
  isLogin: false,
  user: {},
  loading: false,
  adminId: null,
  jwtToken: "",
  login: () => {},
  logout: () => {},
  profile: {}
});

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState();
  const [profile, setProfile] = useState();
  const [adminId, setAdminId] = useState();

  const handleLoginResponse = useCallback(async (response) => {
    const accessToken = response.authResponse.accessToken;
    // console.log(accessToken);
    const { data } = await api.signin({
      provider: "facebook",
      access_token: accessToken
    });
    setProfile(data);
    const { access_token: tokenFromServer, user: userData } = data;
    // console.log(`tokenFromServer: ${tokenFromServer}`);
    setUser(userData);
    setAdminId(userData.id);
    setJwtToken(tokenFromServer);
    // console.log(userData.picture);
    window.localStorage.setItem("userPicture", userData.picture);
    window.localStorage.setItem("jwtToken", tokenFromServer);
    setIsLogin(true);
    return tokenFromServer;
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await fb.init();
      const response = await fb.getLoginStatus();
      if (response.status === "connected") {
        handleLoginResponse(response);
        setLoading(false);
      } else {
        window.localStorage.removeItem("jwtToken");
        window.localStorage.removeItem("userPicture");
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, [handleLoginResponse]);

  const login = async () => {
    setLoading(true);
    const response = await fb.login();
    if (response.status === "connected") {
      const tokenFromServer = handleLoginResponse(response);
      setLoading(false);
      return tokenFromServer;
    } else {
      window.localStorage.removeItem("jwtToken");
      window.localStorage.removeItem("userPicture");
      setLoading(false);
      return null;
    }
  };

  const logout = async () => {
    setLoading(true);
    await fb.logout();
    setIsLogin(false);
    setUser({});
    setJwtToken();
    window.localStorage.removeItem("jwtToken");
    window.localStorage.removeItem("userPicture");
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        user,
        loading,
        jwtToken,
        login,
        logout,
        adminId,
        setAdminId,
        profile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
