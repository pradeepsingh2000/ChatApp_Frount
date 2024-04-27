import { Box, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { Link } from '../style/commandStyle'
import Avatars from './Avatar'
import {motion} from 'framer-motion'

const ChatItem = (
    { avatar = [],
        name,
        id,
        chatId,
        groupChat = false,
        sameSender,
        isOnline,
        newMessageAlert,
        index = 0,
        handleDeleteChatOpen }) => {
    return (
        <Link to={`/chat/${chatId}`} onContextMenu={(e) => handleDeleteChatOpen(e, id, groupChat)}>
            <motion.div 
            initial={{
                opacity: 0, y:"-100%",
            }}
            whileInView={{
                opacity: 1, y:0
            }}
            transition={{
                delay: index * 0.1
            }}
            
            style={{
                display: 'flex',
                gap: '1rem',
                position: "relative",
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: sameSender ? 'black' : 'unset',
                color: sameSender ? 'white' : 'unset',
                justifyContent: "space-between"
            }}>
                <Avatars />

                <Typography justifyContent={"flex-end"}>
                    {name}
                </Typography>
                <Stack p={2}>
                    {
                        newMessageAlert && (
                            <Typography>{newMessageAlert.count} New Message</Typography>
                        )
                    }
                </Stack>
                {isOnline && <Box
                    sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "green",
                        position: "absolute",
                        top: "50%",
                        right: "1rem",
                        transform: "translateY(-50%)"
                    }}
                />
                }
            </motion.div>
        </Link>

    )
}

export default memo(ChatItem)
