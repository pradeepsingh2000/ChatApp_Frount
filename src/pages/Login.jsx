import React from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { loginUser, registerUser } from "../Authentication/AuthenticationApi";
import { useDispatch } from 'react-redux'
import { userExists } from "../redux/reducer/auth";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [login, setLogin] = useState(true);
  const [password, setpassword] = useState();
  const [email, setEmail] = useState();
  const [username, setusername] = useState();
  const [name, setname] = useState();
  const [bio , setbio] = useState();
  const handleLogin = async () => {
    try {
      const data = await loginUser({ username, password })
      if (data.success) {
        localStorage.setItem('token', data.token)
        dispatch(userExists(data.user))
        toast.success(data.message)
        navigate('/')
      }

    } catch (e) {
      toast.error(e.response?.data?.message);
    }


  }
  const handleRegister = async () => {
    try {
      const data = await registerUser({ username, password, email, bio, name })
      if (data.success) {
        localStorage.setItem('token', data.token)
        dispatch(userExists(data.user))
        toast.success(data.message)
        navigate('/')
      }

    } catch (e) {
      toast.error(e.response?.data?.message);
    }
  }
  return (
    <Container maxWidth="xs" maxHeight="lg">
      <Paper
        elevation={3}
        sx={{

          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {login ? (
          <Typography>Login</Typography>
        ) : (
          <Typography>Register </Typography>
        )}
        {
          login ? (
            <div className="row mt-5" style={{ maxHeight: "200px" }}>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                  onChange={(e) => setusername(e.target.value)}
                  aria-label="First name"
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Last name"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <Container
                sx={{
                  marginTop: "15px"
                  , display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button variant="contained" onClick={handleLogin}>Login</Button>
                <Button variant="text" onClick={(e) => { setLogin(false) }}>Register </Button>
              </Container>
            </div>

          ) : (
            <div className="row mt-5 " style={{ maxHeight: "400px" }}>
                <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                  onChange={(e) => setname(e.target.value)}
                  aria-label="Name"
                />
              </div>

              <div className="col-12 mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="User Name"
                  onChange={(e) => { setusername(e.target.value)}}
                  aria-label="First name"
                />
              </div>
              <div className="col-12 mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bio"
                  onChange={(e) => { setbio(e.target.value)}}
                  aria-label="First name"
                />
              </div>

              <div className="col-12 mt-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}

                  aria-label="First name"
                />
              </div>
              <div className="col-12 mt-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}

                  aria-label="Last name"
                />
              </div>

              <Container
                sx={{
                  marginTop: "15px"
                  , display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button variant="contained" onClick={handleRegister}>Register </Button>
                <Button variant="text" onClick={(e) => { setLogin(true) }}>Login</Button>
              </Container>
            </div>


          )
        }
      </Paper>
    </Container>
  );
}
