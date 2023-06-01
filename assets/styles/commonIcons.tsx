import { Box, Image } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
// import CallIcon from "../icons/common/call-center.svg";

export function callIcon(h = 7, w = 7) {
  // return <CallIcon />;
  return (
    <Image
      source={require("../icons/common/phone-png.png")}
      alt="Alternate Text"
      h={h}
      w={w}
      borderRadius="full"
    />
  );
}

export function figmaCallIcon() {
  // return <CallIcon />;
  return (
    <Box bg="#ffffff" p="3" borderRadius="10">
      <MaterialIcons name="call" size={24} color="black" />
    </Box>
  );
}
