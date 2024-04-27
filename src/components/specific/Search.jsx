import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import UserItem from '../shared/UserItem';
import { SampleUser } from '../../constants/sample';
import {useDispatch , useSelector}  from 'react-redux'
import { setIsSearch } from '../../redux/reducer/misc';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/Api/api';
import toast from 'react-hot-toast';

export default function Search() {

  const [search, setSearch] = useState('');
  const [users, setUser] = useState([]);
  const {isSearch} = useSelector(state => state.misc)
  const dispatch = useDispatch()
  const [searchUser] = useLazySearchUserQuery()
  const [ sendFriendRequest] = useSendFriendRequestMutation()

  let isLoading = false;

  const closeSearch =() =>{
    dispatch(setIsSearch(false))
  }
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const removeMemberHandler = async (id) =>{
    console.log(id,'the id is already')
   const res = await sendFriendRequest({userId:id})
   if(res.data) {
    toast.success(res.data.message)
   }else {
    toast.error("Something went wrong")
   }
  }

  useEffect(() => {
    const timeOut = setTimeout(() =>{
      searchUser(search).then(({data}) => {
        setUser(data.data)
      }).catch((err) => {
        console.log(err)
      });
    },1000)
    return () => {
      clearTimeout(timeOut)
    }
  },[search])

  return (
    <Dialog open onClose={closeSearch}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={'center'}>
          Find People
        </DialogTitle>
        <TextField
          variant='outlined'
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={handleSearchChange}
          label="Search"
        />
        <List>
          {
            users?.map((i) =>(
              <ListItem>
                <UserItem user={i} removeMemberHandler={removeMemberHandler} handlerIsLoading={isLoading} />
              </ListItem>
            ))
          }
        </List>
      </Stack>
    </Dialog>
  );
}
