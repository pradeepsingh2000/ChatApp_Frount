import { Stack } from '@mui/material';
import React from 'react';
import ChatItem from '../shared/ChatItem';
import { useParams } from 'react-router-dom';

export default function Chatlist({
  w = "100%",
  chats = [],
  onlineUser = [],
  newMessagesAlert = [{
    chatId: 0,
    count: 0
  }],
  handleDeleteChat,
}) 
{
  const params = useParams()
  const chatId = params.id
  return (
    <Stack width={w} direction={"column"} >
      {
        chats?.map((data, index) => {
          const { _id, name, members, groupChat } = data;
          const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);
          const isOnline = members?.some((member) => onlineUser.includes(_id));

          // You need to return the ChatItem component here
          return (
            <ChatItem
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              // avatar={avatar}
              chatId = {_id}
              name={groupChat ? name  :members[0]?.name}
              id={_id}
              key={_id}
              groupChat={groupChat}
              index={index}
              handleDeleteChatOpen={handleDeleteChat}
              sameSender={chatId === _id}
            />
          );
        })
      }
    </Stack>
  );
}
