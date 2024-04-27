import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SampleUser } from "../../constants/sample";

import React from "react";
import UserItem from "../shared/UserItem";
import { useState } from "react";
import { useAddGroupMutation, useAvailableFriendQuery } from "../../redux/Api/api";
import { useErrors } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewGroup } from "../../redux/reducer/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  const dispatch  = useDispatch();
  const [groupName, setGroupName] = useState();
  const [member, setMember] = useState(SampleUser);
  const {isNewGroup} = useSelector(state => state.misc)
  const [selectMember, setSelectMember] = useState([]);
  const {isError,isLoading,error,data} = useAvailableFriendQuery("")
  const [addGroup] = useAddGroupMutation()
  useErrors([{ isError, error }]);

  const selectMemberHandler = (id) => {
    setSelectMember((prev) =>
      prev.includes(id)
        ? prev.filter((current) => current !== id)
        : [...prev, id]
    );
  };


  const handleSubmit = async() => {
    if (!groupName) {
      toast.error("Please Enter Group Name");
      return;
    }
    if (selectMember.length < 2) {
      toast.error("Please Select more than two members to create a new group");
      return;
    }
    const res = await addGroup({name:groupName,members:selectMember});
    console.log(res,'the res');
    if(res.data.success) {
      toast.success(res.data.message);
    }
    else {
      toast.error("Something went wrong")
    }
    closeHandler();
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }

  return (
    <>
      <Dialog open={isNewGroup} onClose={closeHandler}>
        <Stack p={{ xs: "1rem", sm: "3rem" }} maxWidth={"25rem"}>
          <DialogTitle>New Group</DialogTitle>
          <TextField
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Typography>Members </Typography>
          <Stack>
            { isLoading ? (<Skeleton/>) : (data?.data.map((i) => (
              <UserItem user={i} removeMemberHandler={selectMemberHandler}  isAdded ={selectMember.includes(i._id)}/>
            )))}
          </Stack>
          <Stack direction={"row"} justifyContent={"space-evenly"}>
            <Button variant="text" color="error">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>Create</Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default NewGroup;
