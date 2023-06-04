import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

//Creating the store. Being exported, because components need to borrow it to get its values
export const AuthContext = createContext({
  token: "",
  userId: "",
  userPhone: "",
  isAuthenticated: false,
  authenticate: (token, userId, phone) => {},
  logout: () => {},
});

//Function component that wraps other parent components that wants to use its values
function AuthContextProvider({ children }) {
  const [userId, setUserId] = useState();
  const [userPhone, setUserPhone] = useState();
  const [authToken, setAuthToken] = useState();

  console.log("AuthContextProvider Initialized");

  async function authenticate(token, userId_, userPhone_) {
    console.log(
      "🚀 ~ file: auth-context.js:23 ~ authenticate ~ userId:",
      userId_
    );
    setAuthToken(token);
    setUserId(() => userId_);
    setUserPhone(userPhone_);
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userId", userId_);
    await AsyncStorage.setItem("userPhone", userPhone_);
    console.log("Token stored");

    return true;
  }

  async function logout() {
    setAuthToken(null);
    setUserId(null);
    setUserPhone(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userPhone");
  }

  const value = {
    token: authToken,
    userId: userId,
    userPhone: userPhone,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  useEffect(() => {
    console.log("AuthContextProvider useEffect");

    async function getToken() {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const userPhone = await AsyncStorage.getItem("userPhone");
      if (token) {
        console.log("Token found");
        setUserId(userId);
        setUserPhone(userPhone);
        setAuthToken(token);
      }
    }

    getToken();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
