import io from "socket.io-client";
import { activeUrl } from "../store/constants";
import { useContext, useMemo } from "react";
import { AuthContext } from "../store/auth-context";

export function useSocket() {
  const { token, userId } = useContext(AuthContext);

  const socket = io(activeUrl, { query: { token, userId } });
  // memoize socket instance
  // // const socket = useMemo(() => {

  //   console.log("🚀 ~ file: useSocket.ts:15 ~ socket ~ socket: Rendering");
  // //   return io(activeUrl, { query: { token, userId } });
  // // }, [token, userId]);

  return { socket };
}
