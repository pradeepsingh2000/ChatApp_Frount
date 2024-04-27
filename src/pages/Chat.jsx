import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { AttachFile, Send, Stop } from "@mui/icons-material";
import { InputBox } from "../components/style/commandStyle";
import FileManager from "../components/dialogs/FileManager";
import { SampleMessage } from "../constants/sample";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/event";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/Api/api";
import { useParams } from "react-router-dom";
import { useErrors, useSocketEvents } from "../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteScrollTop } from "6pp";
import { setisFileHandler } from "../redux/reducer/misc";
import { removeNewMessageAlert } from "../redux/reducer/chat";
import { TypingLoader } from "../components/specific/LayoutLoader";

const Chat = () => {
  const socket = getSocket();

  const dispatch = useDispatch();
  const params = useParams();
  const chatId = params.id;
  useEffect(() => {
    socket.emit("join chat", { chatId });
  }, [chatId]);
  const containerRef = useRef(null);
  const [page, setPage] = useState(1);
  const chatDetail = useChatDetailsQuery({ chatId });
  const oldChatChunks = useGetMessagesQuery({ chatId, page });
  const { user } = useSelector((state) => state.auth);
  const [fileMenuAnchor, setfileMenuAnchor] = useState(null);

  const [ImaTyping,setIamTyping] = useState(false);
  const [userTyping , setUserTyping] = useState(false);
  const  typingTimeOut  = useRef(null);
  const bottomRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const members = chatDetail?.data?.chat?.members;

  useEffect(() => {
    dispatch(removeNewMessageAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessage([]);
      setPage(1);
    };
  }, [chatId]);

  useEffect(() => {
if(bottomRef.current) {
  bottomRef.current.scrollIntoView({behavior:"smooth"})
}
  },[messages])

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const errors = [
    { isError: chatDetail?.isError, error: chatDetail.error },
    { isError: oldChatChunks?.isError, error: oldChatChunks.error },
  ];
  const newMessgeHandler = useCallback(
    (data) => {
      if (chatId !== data.chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
const alertHandler = useCallback((content) => {
const messaegAlert = {
  content,
  sender : {
    _id:"ksmedmk23232",
    name:"Admin"
  },
  chat:chatId,
  createdAt: new Date().toISOString(),
}
setMessages((prev) => [...prev,messaegAlert])
});
  const startTypingLister = useCallback((data) => {
    if (chatId !== data.chatId) return;
    setUserTyping(true);
  },[chatId]);

  const stopTypingLister = useCallback((data) => {
    if (chatId !== data.chatId) return;
    setUserTyping(false);
  },[chatId]);

  const { data: oldMessage, setData: setOldMessage } = useInfiniteScrollTop(
    containerRef,
    oldChatChunks.data?.totalPages,
    page,
    setPage,
    oldChatChunks.data?.message
  );

  const handelFileManager = (e) => {
    dispatch(setisFileHandler(true));
    setfileMenuAnchor(e.currentTarget);
  };

  const eventHandlers = {
    [ALERT] : alertHandler,
    [NEW_MESSAGE]: newMessgeHandler,
    [START_TYPING]: startTypingLister,
    [STOP_TYPING]: stopTypingLister
  };
  useSocketEvents(socket, eventHandlers);
  useErrors(errors);
  const allMessages = [...oldMessage, ...messages];

  const handleMessage = (e) => {
    setMessage(e.target.value);
    if(!ImaTyping) {
      setIamTyping(true);
      socket.emit(START_TYPING, { chatId, members });
     
    }
    if(typingTimeOut.current) clearTimeout(typingTimeOut.current);

    typingTimeOut.current  =  setTimeout(() => {
      socket.emit(STOP_TYPING,{chatId,members});
      setIamTyping(false)

    },[2000])
  };

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing="border-box"
        padding="1rem"
        spacing="1rem"
        height="90%"
        bgcolor="#bdbdbd5e"
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages?.map((i) => (
          <MessageComponent key={i.id} message={i} user={user} />
        ))}

{
  userTyping && <TypingLoader/>
}
        <div ref={bottomRef}/>
      </Stack>

      <form style={{ height: "10%" }} onSubmit={submitHandler}> 
        <Stack
          direction="row"
          height="100%"
          padding="1rem"
          alignItems="center"
          position="relative"
        >
          <InputBox
            placeholder="Type message..."
            value={message}
            onChange={(e) => handleMessage(e)}
          />

          <IconButton
            sx={{
              backgroundColor: "red",
              color: "white",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
            type="submit" 
          >
            <Send />
          </IconButton>
        </Stack>
      </form>

      <FileManager anchorE1={fileMenuAnchor} />
    </>
  );
};
export default AppLayout()(Chat);
