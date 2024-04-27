import React from 'react'
import { AvatarGroup,Avatar, Box, Stack } from '@mui/material'

export default function Avatars() {
  return (
   <Stack direction={"row"} spacing={0.5}>
    <AvatarGroup>
<Box width={"5rem"} height={"3rem"} borderRadius={"50%"}>
  <Avatar
  src="https://tse1.mm.bing.net/th?id=OIP.vwEvC0935NyTy4JoNqNItQHaFK&pid=Api&P=0&h=180"
  sx={
    {
      width: "2rem",
      height: "2rem",
      border: "1px solid white",
      position: "absolute",
     
    }
  }
  />

</Box>
    </AvatarGroup>
   </Stack>
  )
}
