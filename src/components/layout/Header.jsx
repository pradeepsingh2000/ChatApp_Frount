import { AppBar, Backdrop, Badge, Box, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { IconButton } from '@mui/material';
import { orange } from '../../constants/color'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { useState } from 'react';
import { lazy } from 'react';
import { Suspense } from 'react';
import Notification from '../specific/Notification';
import Search from '../specific/Search';
import NewGroup from '../specific/NewGroup';
import { useDispatch, useSelector } from 'react-redux'
import { setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducer/misc';



function Header() {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)
  const { isSearch } = useSelector(state => state.misc)
  const {isNewGroup} = useSelector(state => state.misc)
  // const [isNewGroup, setIsNewGroup] = useState(false)
  const { isNotification } = useSelector((state) => state.misc);
  const {notificationCounts} = useSelector((state) => state.chat);
  // const [, set] = useState(false)
  const dispatch = useDispatch()

  const handleMobile = () => {
    setIsMobile((prev) => !prev)
  }

  const openSearch = () => {
    dispatch(setIsSearch(true))
  }

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  }

  const logOutHandler = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  const openNotification = () => {
    dispatch(setIsNotification(true))
  }
  const navigateToGroup = () => {
    navigate('/groups')
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position='static' sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography variant='h6' sx={{
              display: { xs: "none", sm: "block" }
            }}>
              Let's Chat
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" }
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box>
              <Tooltip title="Search">
                <IconButton color="inherit" size="large" onClick={openSearch} >
                  <SearchIcon />
                </IconButton>

              </Tooltip>

              <Tooltip title="New Group">
                <IconButton color="inherit" size="large" onClick={openNewGroup}>
                  <AddIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Manage Group">
                {<IconButton color="inherit" size="large" onClick={navigateToGroup}>
                  <GroupIcon />
                </IconButton>}
              </Tooltip>

              {<Tooltip title="Notification">
                <IconButton color="inherit" size="large" onClick={openNotification}>
                  {
                    notificationCounts ? <Badge badgeContent={notificationCounts}>
                       <CircleNotificationsIcon />
                    </Badge> : <CircleNotificationsIcon />

                  }
                 
                </IconButton>
              </Tooltip>}

              <Tooltip title="Logout">
                {<IconButton color="inherit" size="large" onClick={logOutHandler}>
                  <LogoutIcon />
                </IconButton>}
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {
        isSearch && <Suspense fallback={<Backdrop open />}>
          <Search />
        </Suspense>
      }
      {
        isNotification && <Suspense fallback={<Backdrop open />}>
          <Notification />
        </Suspense>
      }
      {
        isNewGroup && <Suspense fallback={<Backdrop open />}>
          <NewGroup />
        </Suspense>
      }
    </>
  )
}

export default Header
