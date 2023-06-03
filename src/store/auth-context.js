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
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();
  const [userPhone, setUserPhone] = useState();

  console.log("AuthContextProvider Initialized");

  async function authenticate(token, userId, userPhone) {
    console.log("Token, userCredentuals storing in progress");
    setAuthToken(token);
    setUserId(userId);
    setUserPhone(userPhone);
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userId", userId);
    await AsyncStorage.setItem("userPhone", userPhone);
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
        setAuthToken(token);
        setUserId(userId);
        setUserPhone(userPhone);
      }
    }

    getToken();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
