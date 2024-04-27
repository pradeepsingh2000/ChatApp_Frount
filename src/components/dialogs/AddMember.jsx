import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { SampleUser } from "../../constants/sample";
import UserItem from "../shared/UserItem";
import { useDispatch } from "react-redux";
import { setIsAddMember } from "../../redux/reducer/misc";
import { useErrors } from "../../hooks/hooks";
import { useAddGroupMemberMutation, useAvailableFriendQuery } from "../../redux/Api/api";
function AddMember({ addMember, isLoadingAddMember, chatId }) {
  const dispatch = useDispatch()
  const [member, setMember] = useState(SampleUser);
  const [selectMember, setSelectMember] = useState([]);
  const {isError,isLoading,error,data} = useAvailableFriendQuery(chatId)
  const [addGroupMember] = useAddGroupMemberMutation()
  useErrors([{ isError, error }]);


  const selectMemberHandler = (id) => {
    console.log(id,'the id')
    setSelectMember((prev) =>
      prev.includes(id)
        ? prev.filter((current) => current !== id)
        : [...prev, id]
    );
  };


  const addMemberSubmitHandler = async () => {
      const  res = await addGroupMember({chatId,members:selectMember})
      console.log(res,'the data')
      dispatch(setIsAddMember(false))

  };

  const closeHandler = () => {
    setSelectMember([])
    setMember([])
    dispatch(setIsAddMember(false))
  };

  return (
    isLoading ? (<h1>Loading...</h1>) : (
      <Dialog open onClose={closeHandler}>
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
          <DialogTitle>Add Member</DialogTitle>
          <Stack>
            {data.data.length > 0 ? (
              data.data.map((i) => (
                <UserItem
                  key={i.key}
                  user={i}
                  removeMemberHandler={selectMemberHandler}
                  isAdded={selectMember.includes(i._id)}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No Friend</Typography>
            )}
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Button color="error" onClick={closeHandler}>
              Cancel
            </Button>
            <Button variant="contained" onClick={addMemberSubmitHandler}>Submit Change</Button>
          </Stack>
        </Stack>
      </Dialog>
    )
  );
  
}

export default AddMember;
