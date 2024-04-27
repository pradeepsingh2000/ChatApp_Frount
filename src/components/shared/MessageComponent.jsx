import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { memo } from "react";
import { fileFormat } from "../../lib/feature";
import RenderAttachMent from "./RenderAttachMent";
import {motion} from 'framer-motion'

function MessageComponent({ user, message }) {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  return (
    <motion.div
    initial ={{ opacity:0 , x:"-100%"}}
    whileInView= {{ opacity:1 ,x:0}}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        background: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography variant="caption" color={"0000007a"} fontWeight={"600"}>
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
    

      <Typography variant="caption" color={"text.secondary"}>
        {moment(createdAt).fromNow()}
      </Typography>
    </motion.div>
  );
}

export default memo(MessageComponent);
