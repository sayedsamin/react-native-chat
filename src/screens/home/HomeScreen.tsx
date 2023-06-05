import { useQuery } from "@tanstack/react-query";
import { FlatList, ScrollView, VStack } from "native-base";
import { useContext, useMemo } from "react";
import { getUserQueryHome } from "./HomeService";
import { AuthContext } from "../../store/auth-context";
import ChatListItem from "../chat/ChatListItem";
import chats from "../../../assets/data/chats.json";

export default function HomeScreen({ navigation }) {
  const { token, userId } = useContext(AuthContext);

  const { data: fetchedData } = useQuery(
    ["user-data"], // query key same as in ProfileMainScreen.tsx
    async () => {
      return getUserQueryHome(token);
    }
  );

  // Filter out the current user from chats
  const filteredChats = useMemo(() => {
    return chats.filter((chat) => chat.user.id !== userId);
  }, [chats, userId]);

  return (
    <VStack flex="1">
      <FlatList
        bg={"white"}
        flex="1"
        data={filteredChats}
        renderItem={({ item }) => (
          <ChatListItem chat={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  );
}
