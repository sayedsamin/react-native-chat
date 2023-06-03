import { io } from "socket.io-client";
import { activeUrl } from "../store/constants";

const socket = io(activeUrl);

export default socket;
