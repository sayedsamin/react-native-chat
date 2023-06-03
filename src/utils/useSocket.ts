import io from "socket.io-client";
import { activeUrl } from "../store/constants";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

export function useSocket() {
  const { token, userId } = useContext(AuthContext);

  const socket = io(activeUrl, { query: { token, userId } });
  return { socket };
}
