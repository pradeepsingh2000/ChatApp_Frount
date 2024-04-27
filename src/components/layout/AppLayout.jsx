import React, { useCallback, useEffect, useRef } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import Chatlist from "../specific/Chatlist";
import { Samplechats } from "../../constants/sample";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import Header1 from "../../pages/Header1";
import { useMyChatsQuery } from "../../redux/Api/api";
import LayoutLoader from "../specific/LayoutLoader";
import { toast } from "react-hot-toast";
import { useErrors, useSocketEvents } from "../../hooks/hooks";
import { getSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from "../../constants/event";
import { useDispatch, useSelector } from "react-redux";
import { incrementNotifications, setnewMessageAlert } from "../../redux/reducer/chat";
import { setIsDeleteMenu, setselectedDeleteChat } from "../../redux/reducer/misc";
import DeleteSideMenu from "../dialogs/DeleteSideMenu";
import Footer from "./Footer";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const socket = getSocket();
    const dispatch = useDispatch()
    const deleteOptionAnchor = useRef(null)
    const chatId = params.id;
    const { isLoading, data, isError, error,refetch } = useMyChatsQuery("");
    const {user} = useSelector((state) =>state.auth)
    const {newMessageAlert} = useSelector((state) => state.chat)
    useEffect(() => {
      socket.emit("join personal", user._id )
    }, [user])
    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      console.log(e.currentTarget, "delete",chatId, groupChat);
      deleteOptionAnchor.current = e.currentTarget
      dispatch(setselectedDeleteChat({chatId,groupChat}))
     dispatch(setIsDeleteMenu(true))
    };
    const newMessgeAlertHandler = useCallback((data ) => {
      if (data.chatId == chatId) return
      dispatch(setnewMessageAlert(data))
    }, [chatId]);
    const newRequestAlertHandler = useCallback((
    ) => {
      dispatch(incrementNotifications())
    }, [dispatch]);

    const refetchChatHandler = useCallback((data) => {
      console.log('refetch calling')
      refetch();
    },[refetch]);

  

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessgeAlertHandler,
      [NEW_REQUEST]: newRequestAlertHandler,
      [REFETCH_CHATS]: refetchChatHandler
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <div>
        <Title title="Chat App" />
        <Header />
        <DeleteSideMenu deleteOptionAnchor={deleteOptionAnchor}/>
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid item xs={4} height={"100%"}>
            {isLoading ? (
              <LayoutLoader />
            ) : (
              <Chatlist
                chats={data?.myChat}
                chatId={chatId}
                newMessagesAlert={newMessageAlert}
                onlineUser={[1, 2]}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={4} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            xs={4}
            style={{ backgroundColor: "black", height: "100%" }}
          >
            <Profile />
          </Grid>
        </Grid>
        <div><Footer/></div>
      </div>
    );
  };
};
export default AppLayout;
