import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Center, Image, Pressable, Text, VStack } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { darkTurqColor } from "../../assets/styles/gradientComp";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import { getUserQueryHome } from "../screens/home/HomeService";

const CustomDrawer = (props) => {
  const { token } = useContext(AuthContext);
  const { data } = useQuery(["user-data"], async () => {
    return getUserQueryHome(token);
  });

  const navigation = useNavigation();

  return (
    <VStack flex={1}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: darkTurqColor }}
      >
        <VStack py={5} flexDirection={"row"}>
          <Pressable
            flex="1"
            android_ripple={{ color: "gray.200" }}
            _pressed={{ opacity: Platform.OS === "ios" ? 0.5 : 1 }}
            onPress={() =>
              navigation.navigate("Home", { screen: "Profile Stack" })
            }
          >
            {!data?.imageUrl && (
              <Center p="2">
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                  }}
                  style={{ width: 72, height: 72 }}
                  borderRadius={100}
                  alt="Profile Image"
                />
              </Center>
            )}
            {data?.imageUrl && (
              <Center p="2">
                <Image
                  source={{ uri: data.imageUrl }}
                  style={{ width: 72, height: 72 }}
                  borderRadius={100}
                  alt="Profile Image"
                />
              </Center>
            )}
          </Pressable>
          <Pressable justifyContent={"center"} flex="2">
            <Text color="white" fontSize={"2xl"}>
              {data?.name}
            </Text>
            <Text color="white">{data?.phone}</Text>
          </Pressable>
        </VStack>
      </DrawerContentScrollView>

      <VStack mb={"32"} borderTopWidth={1} borderTopColor="gray.200" p={1}>
        <Pressable
          flexDirection={"row"}
          alignItems={"center"}
          p={3}
          android_ripple={{ color: "gray.200" }}
          _pressed={{ opacity: Platform.OS === "ios" ? 0.5 : 1 }}
          onPress={() => navigation.navigate("LogOut")}
        >
          <Ionicons name="exit-outline" size={24} color="black" />
          <Text ml={6}>Log out</Text>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default CustomDrawer;
