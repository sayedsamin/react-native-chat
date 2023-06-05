import { VStack, Text, Image, Pressable, HStack } from "native-base";
import moment from "moment";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback } from "react";

export default function ChatListItem({ chat, navigation }) {
  // const { token } = useContext(AuthContext);
  const [useLastMessage, setUseLastMessage] = useState(
    AsyncStorage.getItem(`messages-${chat.user.id}`)
  );

  useFocusEffect(
    // const getMessages = async () => {
    //   try {
    //     const messages = await AsyncStorage.getItem(`messages-${chat.user.id}`);

    //     if (messages) {
    //       // chat.lastMessage = JSON.parse(messages)[0];
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    useCallback(() => {
      const getMessages = async () => {
        try {
          const messages = await AsyncStorage.getItem(
            `messages-${chat.user.id}`
          );

          if (messages) {
            // chat.lastMessage = JSON.parse(messages)[0];
            setUseLastMessage(JSON.parse(messages)[0]);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getMessages();
    }, [])

    // getMessages();
  );

  return (
    <Pressable
      flexDirection="row"
      alignItems={"center"}
      mx={3}
      py={2}
      h="70px"
      testID="outer-container"
      onPress={() =>
        navigation.navigate("Chat", {
          receiverId: chat?.user?.id,
          receiverName: chat?.user?.name,
        })
      }
      android_ripple={{ color: "gray.400" }}
    >
      {/* User Avatar */}
      <Image
        h={60}
        w={60}
        rounded="full"
        mr="3"
        source={{
          uri: chat.user?.image,
        }}
        alt="Avatar"
      />
      <VStack flex={1} borderBottomColor={"gray.200"} borderBottomWidth={1}>
        <HStack mb={2}>
          <Text numberOfLines={1} fontWeight={"semibold"}>
            {chat.user?.name}
          </Text>

          <Text color={"gray.500"} ml="auto">
            {/* {chat.lastMessage?.createdAt} */}
            {moment(useLastMessage?.createdAt).fromNow()}
          </Text>
        </HStack>
        <Text numberOfLines={2} color={"grey"}>
          {useLastMessage?.content}
        </Text>
      </VStack>
    </Pressable>
  );
}
