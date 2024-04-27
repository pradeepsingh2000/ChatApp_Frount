import {
  Add,
  Delete,
  DeleteForever,
  Done,
  Edit,
  KeyboardBackspace,
  KeyboardReturn,
  PersonPinCircle,
  TextFields,
} from "@mui/icons-material";
import {
  Button,
  Drawer,
  Grid,
  IconButton,
  Menu,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/style/commandStyle";
import Avatars from "../components/shared/Avatar";
import { SampleUser } from "../constants/sample";
import { Samplechats } from "../constants/sample";
import { useState } from "react";
import ConfirmDailog from "../components/dialogs/ConfirmDailog";
import AddMember from "../components/dialogs/AddMember";
import UserItem from "../components/shared/UserItem";
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupQuery, useRemoveGroupMutation, useRenameGroupMutation } from "../redux/Api/api";
import { useErrors } from "../hooks/hooks";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducer/misc";

export default function Groups() {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isAddMember} = useSelector(state => state.misc)
  const [isEdit, setEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdated, setGroupNameUpdate] = useState("");
  const [members, setMembers] = useState();
  const [confirmDeleteDailog, setConfirmDeleteDailog] = useState(false);
   
  const [addMemberDailog , setAddMemberDailog] = useState(false);

  const { isLoading, data, isError, error } = useMyGroupQuery("");
  const [removeGroup] = useRemoveGroupMutation();
  const [deleteChat] = useDeleteChatMutation()

  useErrors([{ isError, error }]);

  const groupDetail = useChatDetailsQuery({ chatId, populate:true },
    {skip : !chatId}
  );

  useEffect(() => {
    if(groupDetail.data) {
      setGroupName(groupDetail.data?.chat?.name)
      setGroupNameUpdate(groupDetail.data?.chat?.name)
      setMembers(groupDetail.data.chat.members)
    }
  },[groupDetail])
  
  const handleAddUser = () => {
    dispatch(setIsAddMember(true))
  };
  const handleDeleteUser = () => {
    confirmDeleteHandler();
  };

  const confirmDeleteHandler = async() => {
    console.log("Confirm Delete")
    const res = await deleteChat(chatId)
    if (res.data.success){
      toast.success(res.data.message)
      navigate('/')
    }
    setConfirmDeleteDailog(false);
  };
  const OpenDeleteHandler = () => {
    setConfirmDeleteDailog(true);
  };
  const navigateBack = () => {
    navigate("/");
  };
  const updateGroupNameHandler = async  () => {
    try {
     
      const res = await renameGroup({chatId,name:groupNameUpdated})
      console.log(res,'the res')
      if(res.data.success) {
        toast.success(res.data.message);
      }
      setEdit(false);
    } catch (error) {
      console.error("Error updating group name:", error);
    }
  };
  
  
const removeMemberHandler = async (id) =>{
    const res = await removeGroup({chatId,userId:id})
    if(res?.data?.success) {
      toast.success(res.data.message);
    }
    else {
     toast.error(res.error.data.message);
    }
  }
  
  const GroupName = (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center">
        {isEdit ? (
          <>
            <TextField
              onChange={(e) => setGroupNameUpdate(e.target.value)}
              value={groupNameUpdated}
            />
            <IconButton onClick={updateGroupNameHandler}>
              <Done />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4">{groupName}</Typography>
            <IconButton onClick={() => setEdit(true)}>
              <Edit />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );
  const IconButtons = (
    <>
      <IconButton
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
          },
        }}
      >
        <Menu />
      </IconButton>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0,0, 0, 0.8)",
            color: "white",
            ":hover": {
              bgcolor: "black",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );

  const ButtonGroup = (
    <>
      <Stack
        direction={{
          sm: "row",
          xs: "column-reverse",
        }}
        spacing={"1rem"}
        p={{
          sm: "1rem",
          md: "1rem 4rem",
        }}
      >
        <Button
          size="large"
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddUser}
        >
          Add Member
        </Button>
        <Button
          size="large"
          color="error"
          variant="outline"
          startIcon={<DeleteForever />}
          onClick={OpenDeleteHandler}
        >
          Delete Member
        </Button>
      </Stack>
    </>
  );
  useEffect(() => {
    // if(chatId){
    //   setGroupNameUpdate(`Group Name ${chatId}`);
    //   setGroupName(`Group Name ${chatId}`);
    // }

    return () => {
      setGroupName("");
      setGroupNameUpdate("");
      setEdit(false);
    };
  }, [chatId]);
  return (
    <div>
      <Grid container height={"100vh"}>
        <Grid
          item
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          sm={4}
          bgcolor={"bisque"}
        >
          <GroupList myGroup={data?.myChat} chatId={chatId} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
            padding: "1rem 3rem",
          }}
        >
          {IconButtons}
          {groupName && (
            <>
              {GroupName}
              <Typography
                margin={"2rem"}
                alignSelf={"flex-start"}
                variant="body1"
              >
                Members
              </Typography>

              <Stack
                maxWidth={"45rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  sm: "1rem",
                  xs: 0,
                  md: "1rem 4rem",
                }}
                spacing={"2rem"}
                bgcolor={"bisque"}
                height={"50vh"}
                overflow={"auto"}
              >

                {
                members?.map((i) =>(
                  <UserItem user={i} key={i._id} isAdded removeMemberHandler={removeMemberHandler}/>
                ))
                
                
                }
              </Stack>

              {ButtonGroup}
            </>
          )}
        </Grid>
        {confirmDeleteDailog && (
          <>
            {" "}
            <ConfirmDailog
              open={confirmDeleteDailog}
              handleClose={confirmDeleteHandler}
              deleteHandle={handleDeleteUser}
            />{" "}
          </>
        )}

        {
          isAddMember && (<AddMember chatId={chatId} open={isAddMember}/>)

        }
      </Grid>
    </div>
  );
}

const GroupList = ({ w = "100%", myGroup = [], chatId }) => {
  return (
    <Stack>
      {myGroup.length > 0 ? (
        myGroup.map((group) => (
          <GroupListItem key={group._id} group={group} chatId={chatId} />
        ))
      ) : (
        <Typography textAlign="center" padding="1rem">
          No group
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItem = memo(({ group }) => {
  const { name, _id, chatId } = group;
  return (
    <>
      <Link
        to={`?group=${_id}`}
        onClick={(e) => {
          if (_id === chatId)  e.preventDefault()
        }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Avatars />
          <Typography color={"black"}>{name}</Typography>
        </Stack>
      </Link>
    </>
  );
});
