import { VStack, Text, Image, Pressable, HStack } from "native-base";
import moment from "moment";

export default function ChatListItem({ chat, navigation }) {
  // const { token } = useContext(AuthContext);
  //  const { data: fetchedData } = useQuery(
  //   ["user-data"],
  //   async () => {
  //     return getUserQueryHome(token);
  //   }
  // );
  return (
    <Pressable
      flexDirection="row"
      alignItems={"center"}
      mx={3}
      my={2}
      h="70px"
      testID="outer-container"
      //   onPress={() =>
      // navigation.navigate("Chat", { id: chatRoom.id, name: user?.name })
      //   }
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
            {moment(chat.lastMessage?.createdAt).fromNow()}
          </Text>
        </HStack>
        <Text numberOfLines={2} color={"grey"}>
          {chat.lastMessage?.text}
        </Text>
      </VStack>
    </Pressable>
  );
}
