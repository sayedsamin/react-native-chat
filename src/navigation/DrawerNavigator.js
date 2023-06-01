import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer";
import { MyTabs } from "./BottomNavigator";
import { darkTurqColor } from "../../assets/styles/gradientComp";

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={MyTabs}
        options={{
          drawerItemStyle: {
            // height: 0,
            // display: "none",
          },
          drawerIcon: ({ focused, color, size }) => (
            // if focused is true, then the icon will be blue
            // if focused is false, then the icon will be black
            // <Ionicons name="home-outline" size={24} color="black" />
            <Ionicons
              name="home-outline"
              size={24}
              color={focused ? darkTurqColor : "black"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
