import { Avatar, Stack, Typography } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import React from 'react';

export default function Profile() {
  const { user } = useSelector(state => state.auth)

  return (
    <>
      {
        user ? (<Stack spacing={"2rem"} direction={"column"} alignItems={"center"} >
          <Avatar
          style={{
            marginTop:"15px"
          }}
            sx={{
              width: 200,
              height: 200,
              objectFit: "contain",
              marginBottom: "1rem",
              border: "5px solid white"
            }}
          />
          <ProfileCard heading={"Bio"} text={user?.bio} />
          <ProfileCard heading={"Email"} Icon={<EmailIcon />} text={"Test@yopmail.com"} />
          <ProfileCard heading={"Name"} Icon={<FaceIcon />} text={user.username} />
          <ProfileCard heading={"Joined"} Icon={<CalendarTodayIcon />} text={moment(user.createdAt).fromNow()} />
        </Stack>) : (<h1>Loading</h1>)
      }

    </>
  );
}

const ProfileCard = ({ text, Icon, heading }) => (
  <>
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={'white'} textAlign={'center'}>
      {Icon && Icon}
      <Stack>
        <Typography  >{text}</Typography>
        <Typography color="gray" variant='caption'>{heading}</Typography>
      </Stack>
    </Stack>
  </>
);
