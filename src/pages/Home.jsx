import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Typography } from '@mui/material'

const  Home= () => {
  return (
    <div>
  <Typography p={"2rem"} variant='h5' textAlign={"center"}>Select a friend to chat</Typography>
    </div>
  )
}

export default AppLayout()(Home)
