import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, VStack } from "native-base";

import { MainStackNavigator } from "./StackNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

import { darkTurqColor } from "../../assets/styles/gradientComp";

// Contains the bottom navigator
export function MyTabs() {
  return (
    <Tab.Navigator
      id="BottomNavigator"
      screenOptions={{
        // activeTintColor: "red",
        tabBarShowLabel: false, // Writes the name of the tab

        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          position: "absolute",
          // bottom: 25,
          // left: 20,
          // right: 20,
          // backgroundColor: "#1e2e27", //color of the whole tab bar
          // borderRadius: 15,
          // height: 50,
          // elevation: 10,
          // borderWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="Drawer"
        lazy={true}
        component={MainStackNavigator}
        options={({ navigation, route }) =>
          // console.log("navigation: ", getFocusedRouteNameFromRoute(route)),
          ({
            headerShown: false,
            // hide tab bar

            // Function that given { focused: boolean, color: string, size: number }
            // returns a React.Node, to display in the tab bar.
            tabBarIcon: ({ focused }) => (
              <VStack alignItems="center" width={100}>
                <AntDesign
                  name="home"
                  size={24}
                  color={focused ? darkTurqColor : "#D3D3D3"}
                />
                <Text color={focused ? darkTurqColor : "#D3D3D3"}>Home</Text>
              </VStack>
            ),
          })
        }
      />

      <Tab.Screen
        name="Profile Stack"
        component={MainStackNavigator}
        // options={{
        //   headerShown: false,

        //   tabBarStyle: {
        //     // Display only on certain screens
        //   },

        //   tabBarIcon: ({ focused, color, size }) => (
        //     <VStack alignItems="center" width={100}>
        //       <Ionicons
        //         name="person-circle-outline"
        //         size={24}
        //         // color={focused ? darkTurqColor : "#D3D3D3"}
        //         color={focused ? darkTurqColor : "#D3D3D3"}
        //       />
        //       <Text color={focused ? darkTurqColor : "#D3D3D3"}>
        //         {t("screenName:profile")}
        //       </Text>

        //       {/* <Text color={focused ? darkTurqColor : "#D3D3D3"}>Profile</Text>
        //        */}
        //     </VStack>
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
}
