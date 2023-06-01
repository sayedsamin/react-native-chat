import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

//Creating the store. Being exported, because components need to borrow it to get its values
export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

//Function component that wraps other parent components that wants to use its values
function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  console.log("AuthContextProvider Initialized");

  async function authenticate(token) {
    console.log("Token storing in progress");
    setAuthToken(token);
    await AsyncStorage.setItem("token", token);
    console.log("Token stored");
    return true;
  }

  async function logout() {
    setAuthToken(null);
    await AsyncStorage.removeItem("token");
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
      if (token) {
        console.log("Token found");
        setAuthToken(token);
      }
    }

    getToken();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
