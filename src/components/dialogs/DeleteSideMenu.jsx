import { Menu, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducer/misc'
import { DeleteForever, ExitToApp } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDeleteChatMutation } from '../../redux/Api/api'
import toast from 'react-hot-toast'

export default function DeleteSideMenu({deleteOptionAnchor}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isDeleteMenu,selectedDeleteChat} = useSelector((state) => state.misc)
    const [deleteChat] = useDeleteChatMutation()
    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false))
        deleteOptionAnchor.current = null
    }
    const confirmDeleteHandler = async() => {
        const res = await deleteChat(selectedDeleteChat.chatId)
        if (res.data.success){
          toast.success(res.data.message)
          navigate('/')
        } else {
            toast.error("Something went wrong")
        }
      };
    const leaveChat = async () => {
        const res = await deleteChat(selectedDeleteChat.chatId)
        console.log(res,'the res')
        if (res.data.success){
          toast.success(res.data.message)
          navigate('/')
        } else {
            toast.error("Something went wrong")
        }
      };

     
     return (
   <Menu open={isDeleteMenu} onClose={closeHandler} anchorEl={deleteOptionAnchor.current} 
anchorOrigin={
    {
        vertical:"bottom",
        horizontal:"right"
    }
}
transformOrigin={{
    vertical:"center",
    horizontal:"center"
}}
   >
    <Stack 
        sx = {{
            width: '10rem',
            padding:"0.5rem",
            cursor: 'pointer'
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
     
    >
       {selectedDeleteChat.groupChat ? (
        <>
        <ExitToApp/>
        <Typography onClick={(e) => leaveChat()}>Leave Group</Typography>
        </>
       ) : (
        <>
        <DeleteForever/>
        <Typography    onClick ={(e) =>  confirmDeleteHandler() }>Delete Chat</Typography>
        </>
        

       )}
    </Stack>
   </Menu>
  )
}
