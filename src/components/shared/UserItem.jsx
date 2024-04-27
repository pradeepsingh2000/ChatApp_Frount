import { Add, Remove } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { memo } from "react";

const UserItem = ({ user, removeMemberHandler, handlerIsLoading, isAdded = false }) => {
  const { name, _id } = user;
  return (
    <>
      <ListItem>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
          width={"100%"}
        >
          <Avatar src="http://getwallpapers.com/wallpaper/full/3/4/c/1434236-beautiful-avatar-movie-wallpaper-hd-1920x1080-download.jpg" />
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <IconButton
            size="small"
            sx={{
              bgcolor: isAdded ? "error.main":  "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: isAdded ? "error.main":  "primary.main",
              },
            }}
            onClick={() => removeMemberHandler(_id)}
            disabled={handlerIsLoading}
          >
           {
            isAdded ? <Remove/> : <Add/>
           } 
          </IconButton>
        </Stack>
      </ListItem>
    </>
  );
};

export default memo(UserItem);
