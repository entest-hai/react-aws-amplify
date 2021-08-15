import {React, useState} from 'react'
import { 
    AppBar,
    Container,
    makeStyles, 
    Toolbar, 
    Typography, 
    Paper, 
    Button, 
    InputBase, 
    Box, 
    IconButton, 
    Card,
    TextField,
    CardMedia,
    CardHeader} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';


const CTGNoteView = ({ctgRecord}) => {
    const ctgImageHeight = 400
    const [showImage, setShowImage] = useState(true)
    const classes = makeStyles((theme) => {
        return {
            // toolbar: theme.mixins.toolbar,
            searchForm: {
                display: "flex"
            },
            input: {
                flex: 1,
            },
            textField: {
                flex: 1, 
                marginTop: 20,
                marginBottom: 5,
            },
            media: {
                height: ctgImageHeight,
                overflow: "auto"
            },
            saveButton: {
                float: "left",
                marginTop: 5,
                paddingLeft: 20,
                paddingRight: 20
            },
            permissionText: {
                float: "left",
                marginTop: 12,
                paddingLeft:20,
                color: 'error'
            }
        }
    })()

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography>CTG Note</Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}></div>
            <Container maxWidth={"lg"}>
                <Card>
                    <CardMedia className={classes.media}>
                        <Paper style={{overflow:'auto'}} elevation={4}>
                            {showImage ? <img src={process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png"}/> : 
                            <Skeleton variant={"rect"} width={"100%"} height={ctgImageHeight} animation={false}></Skeleton>}
                        </Paper>
                    </CardMedia>
                </Card>
            </Container>
            <Container className={classes.searchForm}>
            <TextField
                    disabled
                    rows={1}
                    variant={"outlined"}
                    color={"primary"}
                    className={classes.textField}
                    placeholder={ctgRecord.username ?? "patient name"}
                    onChange={(event) => {
                        console.log(event.target.value)
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                              <IconButton 
                                onClick={() =>{
                                    setShowImage(true)
                                }}>
                                  <SearchIcon></SearchIcon>
                              </IconButton>
                            </InputAdornment>
                          ),
                    }}
                >
                </TextField>
            </Container>
            <Container className={classes.searchForm}>
                <TextField
                    disabled
                    multiline
                    rows={7}
                    variant={"outlined"}
                    color={"primary"}
                    className={classes.textField}
                    placeholder={ctgRecord.ctgUrl ?? "comments from doctor"}
                >
                </TextField>
            </Container>
            <Container>
                <Button
                    disabled={true}
                    className={classes.saveButton}
                    type="submit"
                    color="primary"
                    variant="contained">
                    Save 
                </Button>
            </Container>
            <Typography
                className={classes.permissionText}
                color="secondary"
            >
                Only admin is allowed to edit this information
            </Typography>
        </div>
    )
}

export {CTGNoteView}