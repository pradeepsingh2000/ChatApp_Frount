import React, { useEffect } from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { Toaster } from 'react-hot-toast'
import Groups from "./pages/Groups";
import PrivateRoutes from "./components/auth/ProtectedRoute";
import LayoutLoader from "./components/specific/LayoutLoader";
import Home1 from "./pages/Home1";
import { server } from "./constants/config";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { userExists, userNotExists } from "./redux/reducer/auth";
import { getProfile } from "./Authentication/AuthenticationApi";
import { SocketProvider } from "./socket";
export default function App() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  useEffect(() => {
    const checkProfile = async () => {
      const data = await getProfile()
      if (data.success) {
        dispatch(userExists(data.data))
      }
      else {
        dispatch(userNotExists(false))
      }
    }
    checkProfile()
  }, [dispatch])

  return (
    <BrowserRouter>
      <Suspense fallback={<div>
        <LayoutLoader />
      </div>}>


        <Routes>
          <Route element={
            <SocketProvider>
              <PrivateRoutes user={user} />
            </SocketProvider>


          }>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}
