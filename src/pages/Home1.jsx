import { Typography } from '@mui/material'
import React from 'react'
import AppLayout from '../components/layout/AppLayout'

const  Home1 = () => {
    return (
        <div>
      <Typography p={"2rem"} variant='h5' textAlign={"center"}>Select a friend to chat</Typography>
        </div>
      )
}

export default AppLayout()(Home1)
