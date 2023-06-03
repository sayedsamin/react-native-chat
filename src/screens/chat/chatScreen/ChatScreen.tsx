import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { FlatList, HStack, Input, Text, VStack } from "native-base";
import { useState } from "react";
import messages from "../../../../assets/data/messages.json";
import socket from "../../../utils/socket";

export default function ChatScreen({ navigation }) {
  // check type of messages
  socket.on("blood-messages", (message) => {
    console.warn(message);
  });
  return (
    <>
      <FlatList
        bg={"white"}
        flex="1"
        p="3"
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
        keyExtractor={(item) => item.id}
      />
      <InputBox />
    </>
  );
}

const Message = ({ message }) => {
  const isMyMessage = () => {
    return message.user.id === "u1";
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
      <Text>{message.text}</Text>
      <Text
        color={"gray.500"}
        fontSize={"xs"}
        alignSelf={isMyMessage() ? "flex-end" : "flex-start"}
      >
        {moment(message.createdAt).fromNow()}
      </Text>
    </VStack>
  );
};

const InputBox = () => {
  const [newMessage, setNewMessage] = useState("");

  const onSend = () => {
    setNewMessage("");
    socket.emit("blood-messages", newMessage);
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
};
