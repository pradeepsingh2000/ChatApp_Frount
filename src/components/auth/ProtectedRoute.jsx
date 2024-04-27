import { Navigate, Outlet } from 'react-router-dom'
import {useSelector} from 'react-redux'
// import { selectedLoggerInUser } from '../Redux/Auth/authSlice';
import { useState } from 'react';
const PrivateRoutes = ({user}) => {
  let auth = {'token':false}
return (

    user ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes;
