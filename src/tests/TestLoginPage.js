import {Grid, Paper, Avatar, TextField, Typography, Button, Box, Container} from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import React, {useState} from "react";
import {Auth} from 'aws-amplify'


const TestLoginPage = () => {

    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);

    const getUserName = (e) => {
        setUserName(e.target.value)
    }

    const getPassword = (e) => {
        setPassword(e.target.value)
    }

    const login = async () => {
        try {
            const user = await Auth.signIn(userName, password)
            console.log(user)
            console.log(user.attributes.sub)

        } catch (e){
            console.log(e)
        }
    }

    return (
            <Box sx={{height:400, width: 400,flexDirection:'column', marginLeft:'auto', marginRight:'auto'}}>
            <Paper elevation={10} style={{height:400, width:400, padding: 30}}>
                <Typography
                style={{paddingBottom: 15}}
            >
                Sign in your account
            </Typography>
            <TextField
                id={"username"}
                label={"Username"}
                placeholder={"Enter username"}
                fullWidth
                required
                onChange={getUserName}
                variant={"outlined"}
                style={{paddingBottom:15}}
            >
            </TextField>
            <TextField
                id={"password"}
                label={"Password"}
                placeholder={"Enter password"}
                fullWidth required
                onChange={getPassword}
                variant={"outlined"}>
            </TextField>
            <FormControlLabel
                control={
                    <Checkbox
                        name={"checked"}
                        color={"primary"}
                    >
                    </Checkbox>
                }
                label={"Remember me"}
            >
            </FormControlLabel>
            <Button
                type={"submit"}
                color={"primary"}
                variant={"contained"}
                fullWidth
                style={{marginTop:50, marginBottom:50, paddingTop:10,paddingBottom:10}}
                onClick={login}
            >
                Sign in
            </Button>
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

export {TestLoginPage}