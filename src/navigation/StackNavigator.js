import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { HStack, IconButton, Image } from "native-base";
import HomeScreen from "../screens/home/HomeScreen";
import LogOutScreen from "../screens/home/LogOutScreen";
import ChatScreen from "../screens/chat/chatScreen/ChatScreen";

const Stack = createNativeStackNavigator();

// Contains all the screens of the app
const MainStackNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        // Header for all screens unless overridden, which blood does
        headerBackground: () => (
          <LinearGradient
            colors={["#00B8BA", "#009294"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 1 }}
          />
        ),
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home_"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          title: "Aromo Health",
          headerStyle: {
            // backgroundColor: "#1e2e27",
          },

          headerTitle: () => (
            <Image
              size={"sm"}
              // height={"30px"}
              width={"50px"}
              source={require("../../assets/logo/Aromo-Transparent-Logo-02.png")}
              alt="Logo"
            />
          ),

          headerRight: () => (
            <HStack>
              <IconButton
                // onPress={() => navigation.navigate("Menu")}
                onPress={() => navigation.openDrawer()}
                icon={<Ionicons name="menu" size={24} color="white" />}
              />
            </HStack>
          ),
          headerLeft: () => (
            <IconButton
              icon={<Ionicons name="notifications" size={24} color="white" />}
            />
          ),
        })}
      />
      <Stack.Screen name="LogOut" component={LogOutScreen} />

      {/* Chat Related Screens Start */}
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ navigation, route }) => ({
          title: "Chat",
          headerStyle: {
            // backgroundColor: "#1e2e27",
          },
        })}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
