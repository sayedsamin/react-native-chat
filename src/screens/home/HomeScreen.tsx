import { useQuery } from "@tanstack/react-query";
import { FlatList, ScrollView, VStack } from "native-base";
import { useContext, useMemo } from "react";
import { getUserQueryHome } from "./HomeService";
import { AuthContext } from "../../store/auth-context";
import ChatListItem from "../chat/ChatListItem";
import chats from "../../../assets/data/chats.json";

export default function HomeScreen({ navigation }) {
  const { token } = useContext(AuthContext);

  const { data: fetchedData } = useQuery(
    ["user-data"], // query key same as in ProfileMainScreen.tsx
    async () => {
      return getUserQueryHome(token);
    }
  );

  return (
    <VStack flex="1" pb={10}>
      <FlatList
        bg={"white"}
        flex="1"
        data={chats}
        renderItem={({ item }) => (
          <ChatListItem chat={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  );
}
