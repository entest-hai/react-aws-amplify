import {Paper, TextField, Typography, Button, Box} from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import React, {useEffect, useState} from "react";
import {API, Auth} from 'aws-amplify'
import {UserProfile} from "../services/UserSessionService";
import { useHistory, useLocation } from 'react-router-dom';
import {getDoctor} from "../graphql/queries";

const UserLoginPage = ({setAuthenticated}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const getUserName = (e) => {
        setUserName(e.target.value)
    }

    const getPassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (event) => {

        console.log(userName, password)

        event.preventDefault();

        try {
            let user = await  Auth.signIn(userName, password)
            console.log(user)
            sessionStorage.setItem('username',user.username)
            sessionStorage.setItem('cognitoUserID',user.attributes.sub)
            // if this is admin user and not doctor
            if (user.username=="admin"){
                sessionStorage.setItem('doctorName','Admin')
                setAuthenticated(user.attributes.sub)
            } else {
                try {
                let apiData = await API.graphql({query: getDoctor, variables:{id: String(user.attributes.sub)}});
                console.log(apiData)
                sessionStorage.setItem('doctorID',apiData.data.getDoctor.id)
                sessionStorage.setItem('hospitalID',apiData.data.getDoctor.hospitalID)
                sessionStorage.setItem('doctorName',apiData.data.getDoctor.name)
                setAuthenticated(user.attributes.sub)
            } catch (e) {}
            }

        } catch (e) {
            console.log("error auth")
        }
    }

    return (
            <Box sx={{height:400, width: 400,flexDirection:'column', marginLeft:'auto', marginRight:'auto', marginTop:'30vh'}}>
            <Paper elevation={10} style={{width:400, padding: 40}}>
                <Typography
                variant={'h6'}
                style={{paddingBottom: 40}}
            >
                Sign in your account
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
                    style={{paddingBottom:15}}
                    value={userName}
                    onInput={getUserName}
                >
                </TextField>
                <TextField
                    id={"password"}
                    label={"Password"}
                    placeholder={"Enter password"}
                    fullWidth required
                    onChange={getPassword}
                    variant={"outlined"}
                    value={password}
                    onInput={getPassword}
                >
                </TextField>
                <Button
                    type={"submit"}
                    color={"primary"}
                    variant={"contained"}
                    fullWidth
                    style={{marginTop:50, marginBottom:50, paddingTop:10,paddingBottom:10}}
                    // onClick={handleSubmit}
                >
                    Sign in
                </Button>
            </form>
            <Box sx={{flexDirection:'row', display:'flex'}}>
                <Typography>
                    No account?
                </Typography>
                <Button style={{paddingTop:0,paddingBottom:0}} color={"primary"}>
                    Create Account
                </Button>
            </Box>
            </Paper>
    </Box>
    )
}

const LoginHomePage = () => {

    const [user, setUser] = useState(null)

    useEffect(async () => {
        let resp = await UserProfile.getInstance()
        setUser(resp.username)
    })

    return (
        <div>
            <h1>Home Page</h1>
            <Button
                onClick={() => {
                    sessionStorage.clear('cognitoUserID')
                }}
            >
                Lout out
            </Button>
        </div>
    )
}

const LoginProfilePage = () => {
    const [user, setUser] = useState(null)
    useEffect( async () => {
        let resp = await UserProfile.getInstance()
        setUser(user.username)
    })
    return(
        <h1>
            User Profile
        </h1>
    )
}

export {UserLoginPage, LoginHomePage, LoginProfilePage}