import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { FlatList, HStack, Input, Text, VStack } from "native-base";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/auth-context";
import { SocketContext } from "../../../store/socketContext";

type Message = {
  messageId: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
};

export default function ChatScreen({ navigation, route }) {
  const { socket } = useContext(SocketContext);
  const { receiverId, receiverName } = route.params;
  const { userId } = useContext(AuthContext);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const messages = await AsyncStorage.getItem(`messages-${receiverId}`);
        if (messages) {
          setMessages(JSON.parse(messages));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
    const deleteMessages = async () => {
      try {
        await AsyncStorage.removeItem(`messages-${receiverId}`);
      } catch (error) {
        console.log(error);
      }
    };
    return () => {
      // deleteMessages();
    };
  }, []);

  useEffect(() => {
    try {
      socket.on("blood-messages", async (message) => {
        if (message.senderId === receiverId) {
          setMessages((messages) => [message, ...messages]);
        }

        const savedMessages = await AsyncStorage.getItem(
          `messages-${message.senderId}`
        );
        // console.log(
        //   "🚀 ~ file: ChatScreen.tsx:54 ~ socket.on ~ savedMessages:",
        //   savedMessages
        // );

        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages);

          const newMessages = [message, ...parsedMessages];

          await AsyncStorage.setItem(
            `messages-${message.senderId}`,
            JSON.stringify(newMessages)
          );
        } else {
          await AsyncStorage.setItem(
            `messages-${message.senderId}`,
            JSON.stringify([message])
          );
        }
      });
    } catch (error) {}

    return () => {
      // socket.off("blood-messages");
    };
  }, []);

  return (
    <>
      <FlatList
        bg="white"
        flex="1"
        p="3"
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
        // keyExtractor={(item) => item.id}
      />
      <InputBox />
    </>
  );

  function Message({ message }) {
    const isMyMessage = () => {
      return message.senderId === userId;
    };
    return (
      <VStack
        bg={isMyMessage() ? "blue.100" : "gray.100"}
        p="3"
        mt="3"
        rounded={"md"}
        alignSelf={isMyMessage() ? "flex-end" : "flex-start"}
        maxW={"80%"}
      >
        <Text>{message.content}</Text>
        <Text
          color={"gray.500"}
          fontSize={"xs"}
          alignSelf={isMyMessage() ? "flex-end" : "flex-start"}
        >
          {moment(message.createdAt).fromNow()}
        </Text>
      </VStack>
    );
  }

  function InputBox() {
    const [newMessage, setNewMessage] = useState("");

    const onSend = async () => {
      const messagePayload: Message = {
        messageId: Math.random().toString(36).substr(2, 9),
        content: newMessage,
        createdAt: new Date().toISOString(),
        senderId: userId,
        receiverId,
      };

      setMessages((messages) => [messagePayload, ...messages]);
      // add to async storage
      await AsyncStorage.setItem(
        `messages-${receiverId}`,
        JSON.stringify([messagePayload, ...messages])
      );

      setNewMessage("");
      // @ts-ignore
      socket.emit("blood-messages", messagePayload, receiverId);
    };
    return (
      <HStack bg="whitesmoke" p="2" alignItems={"center"}>
        <Input
          placeholder="Type a message"
          fontSize={"18"}
          flex="1"
          py={2}
          px="3"
          mx={3}
          bg={"white"}
          rounded={"full"}
          borderWidth={1}
          borderColor={"gray.200"}
          _focus={{ borderColor: "transparent" }}
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <MaterialIcons
          name="send"
          size={24}
          color="white"
          style={{
            backgroundColor: "royalblue",
            borderRadius: 50,
            padding: 5,
            overflow: "hidden",
          }}
          onPress={onSend}
        />
      </HStack>
    );
  }
}
