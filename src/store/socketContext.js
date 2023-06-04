import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { activeUrl } from "./constants";
import { AuthContext } from "./auth-context";

export const SocketContext = createContext({
  socket: null,
});

const SocketProvider = ({ children }) => {
  const { token, userId, userPhone } = useContext(AuthContext);
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!token) return;
    const newSocket = io(activeUrl, {
      query: {
        token,
        userId: userId,
      },
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket", newSocket.id);
    });

    setSocket(newSocket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
