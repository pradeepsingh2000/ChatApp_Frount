import { Grid, Skeleton, Stack } from '@mui/material'
import React from 'react'
import { BouncingSkeleton } from '../style/commandStyle'

export default function LayoutLoader() {
  return (
  <>
   <Grid container  height={"calc(100vh - 4rem)"}>
      <Grid item xs={4}  height={"100%"}>
        <Skeleton variant='rectangular'/>
      </Grid>
      <Grid item xs={4} height={"100%"}>
      <Skeleton variant='rectangular'/>

      </Grid>
      <Grid item xs={4} height={"100%"}>
      <Skeleton variant='rectangular'/>
      </Grid>
     
        </Grid>
  </>
  )
}

export  const  TypingLoader =  () => {
  return (
    <Stack
    spacing ={"0.5rem"}
    direction = {"row"}
    padding = {"0.5rem"}
    justifyContent = {"center"}
    >
      <BouncingSkeleton variant='circular' width={15}  height={15} 
      style={{
        animationDelay:"0.1s"
      }}
      />
        <BouncingSkeleton variant='circular' width={15}  height={15} 
      style={{
        animationDelay:"0.2s"
      }}
      />
        <BouncingSkeleton variant='circular' width={15}  height={15} 
      style={{
        animationDelay:"0.4s"
      }}
      />
        <BouncingSkeleton variant='circular' width={15}  height={15} 
      style={{
        animationDelay:"0.6s"
      }}
      />
    </Stack>
  )
}
