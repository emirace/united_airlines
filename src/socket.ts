import { io } from "socket.io-client";
import { baseChatURL } from "./services/apiChat";

const socket = io(`${baseChatURL}`);

export default socket;
