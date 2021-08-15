import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {blue, green, pink, red, yellow} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {AppBar, Button, Container, Paper, Toolbar,  FormLabel, List, ListItem, ListItemIcon, ListItemText, Drawer, FormControl,
    FormControlLabel,
    Divider, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle, AddCircleOutlineOutlined, DeleteOutline, KeyboardArrowRight, Search, SubjectOutlined} from "@material-ui/icons";
import Masonry from "react-masonry-css";
import { format } from 'date-fns';
import { DeleteOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { TextField } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import {RadioGroup} from "@material-ui/core";
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { API, totpQrcode } from 'aws-amplify';
import {listTodos, listCTGImages} from './../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from './../graphql/mutations';
import { createCTGImage as createCTGImageMutation, deleteCTGImage as deleteCTGImageMutation } from './../graphql/mutations';
import { ListItemAvatar } from '@material-ui/core';
import { withAuthenticator,  AmplifySignOut} from "@aws-amplify/ui-react";
import { CTGNoteView } from './CTGNoteView';
import Skeleton from '@material-ui/lab/Skeleton';
import InputAdornment from '@material-ui/core/InputAdornment';

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        search: {
            padding: "2px 4px",
            display: 'flex',
            alignItems: 'center',
        }, 
        input: {
            marginLeft: theme.spacing(1),
            flex: 1, 
        }, 
        iconButton: {
            padding: 10 
        },
        field: {
            marginTop: 20,
            marginBottom: 20,
            display: "block"
        },
        title: {
            padding: theme.spacing(2)
        },
        page: {
            background: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background: "#f4f4f4"
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        date: {
            flexGrow: 1
        },
        toolbar: theme.mixins.toolbar,
        avatar: {
            marginLeft: theme.spacing(2),
            backgroundColor: pink[500]
        },
        cardAvartar: {
            backgroundColor: (note) => {
                if (note.category == 'work') {
                    return yellow[700]
                }
                if (note.category == 'money') {
                    return green[500]
                }
                if (note.category == 'todos') {
                    return pink[500]
                }
                return blue[500]
            }
        }
    }
})


const CTGAppLayout = ({children}) => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const [logoutMoreAnchorEl, setLogoutMoreAnchorEl] = useState(null)
    const isLogoutMenuOpen = Boolean(logoutMoreAnchorEl)

    const handleLogoutMenuClose = () => {
        setLogoutMoreAnchorEl(null)
    }

    const handleLogoutMenuOpen = (event) => {
        setLogoutMoreAnchorEl(event.currentTarget)
    }

    const menuItems = [
        {
            text: "Patients",
            icon: <SubjectOutlined color={"secondary"}></SubjectOutlined>,
            path: "/"
        },
        {
            text: "Create Note",
            icon: <AddCircleOutlineOutlined color={"secondary"}>
            </AddCircleOutlineOutlined>,
            path: "/create"
        }
    ];

    const showLogoutMenu = (
        <Menu 
            anchorEl={logoutMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={'primary-search-account-menu-mobile'}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isLogoutMenuOpen}
            onClose={handleLogoutMenuClose}
        >
            <MenuItem>
                <AmplifySignOut>
                </AmplifySignOut>
            </MenuItem>
        </Menu>
    )

    return (
    <div className={classes.root}>
        <AppBar 
        className={classes.appBar}
        color={"primary"}
        position={"fixed"}>
            <Toolbar>
                <Typography className={classes.date}>
                    Today is the {format(new Date(), 'do MMM Y')} 
                </Typography>
                <Typography>
                    Biorithm
                </Typography>
                <Avatar
                 className={classes.avatar}
                 onClick={handleLogoutMenuOpen}
                 >H </Avatar>
            </Toolbar>
        </AppBar>
        <Drawer
           className={classes.drawer}
           variant={"permanent"}
           anchor={"left"}
           classes={{paper: classes.drawerPaper}}
           >
               <div>
                   <Typography variant={"h5"} className={classes.title}>
                       Notes
                   </Typography>
               </div>
               <List>
                   {menuItems.map((item) => (
                       <ListItem
                        button
                        key={item.text}
                        onClick={() => history.push(item.path)}
                        className={location.pathname == item.path ? classes.active : null}
                       >
                           <ListItemIcon>
                               {item.icon}
                           </ListItemIcon>
                           <ListItemText primary={item.text}>

                           </ListItemText>
                       </ListItem>
                   ))}
               </List>
           </Drawer>
        <div className={classes.page}>
            <div className={classes.toolbar}></div>
            {children}
        </div>
        {showLogoutMenu}
    </div>
    )
}


const CTGRecords = () => {

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    };

    const classes = useStyles()
    const [records, setRecords] = useState([])

    async function fetchCtgRecords() {
        const apiData = await API.graphql({query: listCTGImages});
        setRecords(apiData.data.listCTGImages.items);
    }

    useEffect(() => {
        fetchCtgRecords()
    }, [])

    return (
        <Container>
            <Masonry
                breakpointCols={breakpoints}
                columnClassName={"my-masonry-grid_column"}
                className={"my-masonry-grid"}>
                {records.map(record => (
                    <div key={record.id}>
                        <CTGRecordNote record={record}></CTGRecordNote>
                    </div>
                ))}

            </Masonry>
        </Container>
    )
}

const CTGRecordNote = ({record}) => {

    const history = useHistory()

    const classes1 = makeStyles({
        avatar: {
            backgroundColor: (record) => {
                if (record.username[0].toUpperCase() == "H") {
                    return pink[500]
                }
                return blue[500]
            }
        }
    })(record)
    
    return (
        <div>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar className={classes1.avatar}>
                            {record.username[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={() => {

                        }}>
                            <DeleteOutlined>

                            </DeleteOutlined>
                        </IconButton>
                    }
                    title={record.username}
                    subheader={record.ctgUrl}
                >
                </CardHeader>
                <CardContent>
                   <Typography>
                    {record.details}
                   </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick = {() => {
                        console.log("show detail ctg record", record);
                        history.push("/ctg")
                    }}>
                        Details 
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

const CreateCTGNote = () => {

    const classes = useStyles()
    const history = useHistory()
    const [details, setDetails] = useState('')
    const [detailsError, setDetailsError] = useState(false)
    const [patientId, setPatientId] = useState('')
    const [patientIdError, setPatientIdError] = useState(false)
    const [ctgUrl, setCtgUrl] = useState('')
    const ctgImageHeight = 400
    const [showImage, setShowImage] = useState(false)

    const classes1 = makeStyles((theme) => {
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
            }
        }
    })()

    useEffect(() => {
        console.log(ctgUrl)
    }, [ctgUrl])

    async function writeCtgRecordToDB() {
        await API.graphql({ query: createCTGImageMutation, variables: { input: {
            ctgUrl: details,
            ecgUrl: "s3://biorithm-testing-data/log/STG045A_raw/STG045A_raw_ctg.png",
            dataset: "stg",
            username: patientId,
            createdTime: 10}}});
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setDetailsError(false)
        setPatientIdError(false)

        console.log(patientId, details)
        
        if (details==''){
            setDetailsError(true)
        }

        if (patientId==''){
            setPatientIdError(true)
        }

        if (patientId && details) {
            writeCtgRecordToDB().then(() => history.push("/"))
        }
    }

    return (
       <Container maxWidth='lg'>
           <Card>
                <CardMedia className={classes1.media}>
                    <Paper style={{overflow:'auto'}} elevation={4}>
                        {showImage ? <img src={process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png"}/> : 
                        <Skeleton variant={"rect"} width={"100%"} height={ctgImageHeight} animation={false}></Skeleton>}
                    </Paper>
                </CardMedia>
            </Card>
           <form noValidate autoComplete="off" onSubmit={handleSubmit}>
           <TextField
                className={classes.field}
                label={"Patient Id & Click Search"}
                rows={1}
                variant={"outlined"}
                color={"secondary"}
                fullWidth
                placeholder={"Hai"}
                required
                error={patientIdError}
                onChange={(event) => {
                    setPatientId(event.target.value)

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
                }}>
            </TextField>
              <TextField
                className={classes.field}
                label="Doctor comments"
                onChange={(event) => {
                    setDetails(event.target.value)
                }}
                variant="outlined"
                color="secondary"
                multiline
                rows={4}
                fullWidth
                required
                error={detailsError}
              >
              </TextField>
               <Button
                   type="submit"
                   color="primary"
                   variant="contained"
                   endIcon={<KeyboardArrowRight></KeyboardArrowRight>}
               >
                   Submit
               </Button>
           </form>
       </Container>
    );
}


const Note = ({todo}) => {

    const classes = makeStyles({
        avatar: {
            backgroundColor: (todo) => {
                if (todo.name[0].toUpperCase() == "H") {
                    return blue[500]
                }
                return pink[500]
            }
        }
    })(todo)

    return (
        <div>
            <ListItem>
            <ListItemAvatar>
                <Avatar
                    className={classes.avatar}
                >{todo.name[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText>{todo.description}</ListItemText>
        </ListItem>
        <Divider variant={"inset"} component={"li"}></Divider>
        </div>
    )
}

const AmplifyApp = () => {

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    };

    const classes = useStyles()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [todos, settodos] = useState([])

    async function writeTodo() {
        await API.graphql({ query: createTodoMutation, variables: { input: {name: name, description: description}} });
        await fetchTodos()
    }

    async function fetchTodos() {
        const apiData = await API.graphql({query: listTodos});
        settodos(apiData.data.listTodos.items);
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
       <div className={classes.root}>
           <AppBar 
           position={"fixed"}
           color={"primary"}
           >
            <Toolbar>
            <AmplifySignOut></AmplifySignOut>
                <Typography className={classes.date}>
                    Test Amplify {format(new Date(), 'do MMM Y')} 
                </Typography>
                <Typography>
                    Dr. Hai 
                </Typography>
                <Avatar className={classes.avatar}>H </Avatar>
            </Toolbar>
           </AppBar>
        <div className={classes.page}>
            <div 
            className={classes.toolbar}
            ></div>
            <Container>
            <form noValidate autoComplete="off">
              <TextField className={classes.field}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                variant="outlined"
                color="secondary"
                fullWidth
                required>
              </TextField>
              <TextField
                className={classes.field}
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                color="secondary"
                multiline
                rows={4}
                fullWidth
                required>
              </TextField>
               <Button
                   color="secondary"
                   variant="contained"
                    onClick={writeTodo}  
               >
                   Submit
               </Button>
           </form>
            <List>
               {
                   todos.map((todo) => (
                       <Note todo={todo} key={todo.id}></Note>
                   ))
               }
            </List>
            </Container>
        </div>
       </div>
    )
}


export {CTGRecords, CTGAppLayout, CreateCTGNote, AmplifyApp}