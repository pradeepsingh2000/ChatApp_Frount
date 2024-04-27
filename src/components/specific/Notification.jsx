import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { SampleNotification } from "../../constants/sample";
import {
  useAcceptRequestMutation,
  useGetNotificationQuery,
} from "../../redux/Api/api";
import { useErrors } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducer/misc";
import toast from "react-hot-toast";

export default function Notification() {
  const { isLoading, data, error, isError } = useGetNotificationQuery("");
  const [acceptRequest] = useAcceptRequestMutation();
  const dispatch = useDispatch();
  const friendRequestHandler = async ({ id, accept }) => {
    console.log(id, accept, "the accept");
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ requestId: id, accept });
      if (res.data) {
        toast.success(res.data.message);
      } else {
        toast.error("Something went wrong" || res?.data?.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useErrors([{ error, isError }]);
  const { isNotification } = useSelector((state) => state.misc);
  const closeNotification = () => dispatch(setIsNotification(false));
  return (
    <Dialog open={isNotification} onClose={closeNotification}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notification</DialogTitle>
        {data?.data?.length > 0 ? (
          data.data.map((sender, _id) => (
            <Notificationlist
              senders={sender}
              _id={sender._id}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No Notification</Typography>
        )}
      </Stack>
    </Dialog>
  );
}

const Notificationlist = memo(({ senders, _id, handler }) => {
  const { sender } = senders;
  console.log(sender.name, "the avatar");
  console.log(_id, "the id");
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
            {`${sender.name} send a friend request`}
          </Typography>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
          >
            <Button onClick={() => handler({ id: _id, accept: true })}>
              Accept
            </Button>
            <Button
              color="error"
              onClick={() => handler({ _id, accept: false })}
            >
              Reject
            </Button>
          </Stack>
        </Stack>
      </ListItem>
    </>
  );
});
