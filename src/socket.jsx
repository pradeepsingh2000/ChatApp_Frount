import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

const SocketContext = createContext();
const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  console.log(localStorage.getItem("token"), "token");
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        extraHeaders: {
          Authorization: localStorage.getItem("token"),
        },
      }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { getSocket, SocketProvider };
