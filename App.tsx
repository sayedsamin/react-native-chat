import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { useContext, useEffect, useState } from "react";
import "react-native-gesture-handler";
import { StreamChat } from "stream-chat";
import { mainTheme, navigationTheme } from "./assets/styles/mainTheme";
import { DrawerNavigator } from "./src/navigation/DrawerNavigator";
import LoginScreen from "./src/screens/auth/login/LoginScreen";

import AuthContextProvider, { AuthContext } from "./src/store/auth-context";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

// Stacks when not logged in
function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthenticatedStack() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </>
  );
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = async () => {
      await await new Promise((r) => setTimeout(r, 100));
      SplashScreen.hideAsync();
      setAppIsReady(true);
    };

    unsubscribe();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <NativeBaseProvider theme={mainTheme} config={config}>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            {appIsReady && <Navigation />}
          </QueryClientProvider>
        </AuthContextProvider>
      </NativeBaseProvider>
    </>
  );
}
