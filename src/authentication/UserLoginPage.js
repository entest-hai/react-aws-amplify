import {
  Paper,
  FormControl,
  TextField,
  Typography,
  Button,
  Box
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from "react";
import { API, Auth } from 'aws-amplify'
import { getDoctor } from "../graphql/queries";

const UserLoginPage = ({ setAuthenticated }) => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getUserName = (e) => {
    setUserName(e.target.value)
  }

  const getPassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (event) => {

    // clear old data might be from other user
    localStorage.clear()
    localStorage.clear()

    // console.log(userName, password)

    event.preventDefault();

    try {
      let user = await Auth.signIn(userName, password)
      console.log(user)
      localStorage.setItem('username', user.username)
      localStorage.setItem('cognitoUserID', user.attributes.sub)
      // if this is admin user and not doctor
      if (user.username == "admin") {
        localStorage.setItem('doctorName', 'Admin')
        setAuthenticated(user.attributes.sub)
      } else {
        try {
          let apiData = await API.graphql({ query: getDoctor, variables: { id: String(user.attributes.sub) } });
          console.log(apiData)
          localStorage.setItem('doctorID', apiData.data.getDoctor.id)
          localStorage.setItem('hospitalID', apiData.data.getDoctor.hospitalID)
          localStorage.setItem('doctorName', apiData.data.getDoctor.name)
          setAuthenticated(user.attributes.sub)
        } catch (e) { }
      }

    } catch (e) {
      console.log("error auth")
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "primary.dark",
      backgroundImage: `url(${"background.png"})`,
      backgroundSize: 'cover',
      backgroundColor: 'darkgray',
      backgroundBlendMode: 'multiply'
    }}>
      <Box sx={{
        width: 400
      }}>
        <Box sx={{ width: 400 }} >
          <img src="femom.png" style={{ width: '100%', paddingLeft: 40, paddingRight: 40 }} />
        </Box>
        <Paper elevation={10} style={{ width: 400, padding: 40 }}>
          <Typography
            variant={'h4'}
            style={{ paddingBottom: 40 }}>
            Sign in to your account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id={"username"}
              label={"Username"}
              placeholder={"Enter username"}
              fullWidth
              required
              onChange={getUserName}
              variant={"outlined"}
              style={{ paddingBottom: 15 }}
              value={userName}
              onInput={getUserName}
            >
            </TextField>
            <FormControl sx={{ width: '100%' }} variant="outlined" required >
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={getPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => { setShowPassword(!showPassword) }}
                      onMouseDown={null}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              type={"submit"}
              color={"primary"}
              variant={"contained"}
              fullWidth
              style={{
                marginTop: 50,
                marginBottom: 50,
                paddingTop: 10,
                paddingBottom: 10
              }}
            // onClick={handleSubmit}
            >
              Sign in
            </Button>
          </form>
          <Box sx={{ flexDirection: 'row', display: 'flex' }}>
            <Typography>
              No account?
            </Typography>
            <Button style={{
              paddingTop: 0,
              paddingBottom: 0
            }} color={"primary"}>
              Create Account
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export { UserLoginPage }
