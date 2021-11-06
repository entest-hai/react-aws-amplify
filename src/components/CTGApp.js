//=====================================================================================================================
// Purpose: CTG App most outer with AppBar, Drawer and menu, Amplify Auth, and route. 
// Author: TRAN MINH HAI 
// Date: 20 AUG 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content 
//********************************************************************************************************************/
// 001.   |  23 AUG 2021.     | TRAN MINH HAI      | - Refactor and add header
//********************************************************************************************************************/
// 002.   |  18 OCT 2021.     | TRAN MINH HAI      | - Query patient given doctor id
// 003 
//=====================================================================================================================
import React, {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {blue, green, pink, red, yellow} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {AppBar, Button, Container, Paper, Toolbar,  FormLabel, List, ListItem, ListItemIcon, ListItemText, Drawer, FormControl,
    FormControlLabel,
    Menu, MenuItem} from "@mui/material";
import {AccountCircle, AddCircleOutlineOutlined, CloudCircle, CloudUpload, DeleteOutline, Edit, KeyboardArrowRight, Search, SubjectOutlined} from "@mui/icons-material";
import Masonry from "react-masonry-css";
import { format } from 'date-fns';
import { DeleteOutlined } from '@mui/icons-material';
import { useHistory, useLocation } from 'react-router-dom';
import { TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import {RadioGroup} from "@mui/material";
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {API, Auth, totpQrcode} from 'aws-amplify';
import {listTodos, listCtgImages, listCtgs, getUser, getDoctor} from './../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from './../graphql/mutations';
import { createCtg as createCTGImageMutation, deleteCtg as deleteCTGImageMutation } from './../graphql/mutations';
import { getCtgImage} from './../graphql/queries';
import { ListItemAvatar } from '@mui/material';
import { withAuthenticator,  AmplifySignOut} from "@aws-amplify/ui-react";
import { CTGNoteView } from './ctg/CTGNoteView';
import { UploadView } from './upload/S3UploadView';
import Skeleton from '@mui/material/Skeleton';
import PetsIcon from '@mui/icons-material/Pets';
import InputAdornment from '@mui/material/InputAdornment';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import {useScript} from "./epic/useScript";
import {MyChartHome} from "./epic/MyChartHome";
import {UserSessionService} from "../services/UserSessionService";
import MultilineChartIcon from '@mui/icons-material/MultilineChart';

const drawerWidth = 240

const listCtgsByDoctorID = `
  query ListCtgsByDoctorID(
    $filter: ModelCtgFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCtgs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ctgUrl
        ecgUrl
        comment
        patientID
        doctorID
        hospitalID
        createdTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

const listCtgNumericalsByDoctorID = `
    query ListCtgNumericalsByDoctorID(
        $filter: ModelCtgNumericalFilterInput
        $limit: Int
        $nextToken: String
    ) {
      listCtgNumericals(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          comment
          ctgJsonUrl
          ctgUrl
          doctorID
          hospitalID
          patientID
          sessionTime
          createdTime
        }
        nextToken
      }
}
`;

const useStyles = makeStyles((theme) => {
    return {
        content: {
            flexGrow: 1,
            padding: 0,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
            overflow:'auto'
          },
          contentShift: {
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
          },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 0),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
          },
        menuButton: {
            marginRight: theme.spacing(2),
          },
        hide: {
            display: 'none',
          },
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
            padding: theme.spacing(0),
            marginRight: theme.spacing(5)
        },
        page: {
            background: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(2)
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
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
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
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


const CTGAppLayout = ({children, setAuthenticated}) => {
    const theme = useTheme()
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const [logoutMoreAnchorEl, setLogoutMoreAnchorEl] = useState(null)
    const isLogoutMenuOpen = Boolean(logoutMoreAnchorEl)
    const [open, setOpen] = useState(false)
    const [userName, setUserName] = useState("Biorithm")
    const [userID, setUserID] = useState(null)
    const [doctorName, setDoctorName] = useState("Biorithm")
    const [hospitalName, setHospitalName] = useState(null)

    useEffect(async () => {
        setUserName(sessionStorage.getItem('username'))
        setDoctorName(sessionStorage.getItem('doctorName'))
    })

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

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
        },
        {
            text:"FHR API",
            icon: <CloudUpload color={"secondary"}></CloudUpload>,
            path: "/upload"
        },
        {
            text: "Live Single FHR",
            icon: <CloudCircle color={"secondary"}></CloudCircle>,
            path: "/live"
        },
        {
            text: "Live Multiple FHR",
            icon: <MultilineChartIcon color={"secondary"}></MultilineChartIcon>,
            path: "/grid"
        },
        {
            text: "Annotate",
            icon: <Edit color={"secondary"}></Edit>,
            path: "/edit"
        },
        {
            text: "Sheep",
            icon: <PetsIcon color={"secondary"}></PetsIcon>,
            path: "/sheep"
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
                <Button
                    color={"secondary"}
                    variant={"contained"}
                    style={{paddingLeft:40,paddingRight:40,paddingTop:10,paddingBottom:10}}
                    onClick={() => {
                        sessionStorage.clear()
                        setAuthenticated(null)
                    }}
                >
                    sign out
                </Button>
                {/*<AmplifySignOut></AmplifySignOut>*/}
            </MenuItem>
        </Menu>
    )

    return (
        <div className={classes.root}>
            <AppBar 
             className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
             color={"primary"}
             position={"fixed"}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge={"start"}
                        className={clsx(classes.menuButton, open && classes.hide)}
                        size="large">
                        <MenuIcon></MenuIcon>
                    </IconButton>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMM Y')} 
                    </Typography>
                    <Typography>
                        {doctorName ? doctorName : userName}
                    </Typography>
                    <Avatar
                     className={classes.avatar}
                     onClick={handleLogoutMenuOpen}
                     >{ doctorName ? (doctorName[4].toUpperCase() == "." ? doctorName[6].toUpperCase() : doctorName[4].toUpperCase()) :  (userName[4].toUpperCase() == "." ? userName[6].toUpperCase() : userName[4].toUpperCase())} </Avatar>
                </Toolbar>
            </AppBar>
            <Drawer
               className={classes.drawer}
               variant={"persistent"}
               anchor={"left"}
               open={open}
               classes={{paper: classes.drawerPaper}}
               >
                   <div className={classes.drawerHeader}>
                        <Typography variant={"h5"} className={classes.title}>
                           Menu
                       </Typography>
                       <IconButton onClick={handleDrawerClose} size="large">
                           {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                       </IconButton>
                   </div>
                   <Divider />
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
            <div className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
            {showLogoutMenu}
        </div>
    );
}


const CTGRecords = ({match}) => {
    useScript('fhir-client.js')
    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    };
    const classes = useStyles()
    const [records, setRecords] = useState([])
    async function fetchCtgRecords() {
        await UserSessionService.getUserSession()
        let filter = {
            doctorID: {
                // eq: '0f150cec-842f-43a0-9f89-ab06625e832a'
                eq: sessionStorage.getItem('doctorID')
            }
        }
        const apiData = await API.graphql({query: listCtgNumericalsByDoctorID, variables: {filter:filter}});
        setRecords(apiData.data.listCtgNumericals.items);
    }

    const handleDelete = async (record) => {
        // TODO: try catch 
        const deleteResult = await API.graphql({query: deleteCTGImageMutation, variables: {input: {id: record.id}}})
        // TODO: not query but local delete
        const updatedRecords = records.filter(x => x.id != record.id)
        setRecords(updatedRecords)
    }

    useEffect(async () => {
        let isMounted = true;
        await fetchCtgRecords();
        return () => {
            isMounted = false; 
        }
    }, [])

    return (
        <Container>
            <Masonry
                breakpointCols={breakpoints}
                columnClassName={"my-masonry-grid_column"}
                className={"my-masonry-grid"}>
                {records.map(record => (
                    <div key={record.id}>
                        <CTGRecordNote record={record} handleDelete={handleDelete}></CTGRecordNote>
                    </div>
                ))}

            </Masonry>
        </Container>
    )
}

const CTGRecordNote = ({record, handleDelete}) => {
    const history = useHistory()
    const classes1 = makeStyles({
        avatar: {
            backgroundColor: (record) => {
                if (record.id[0].toUpperCase() == "H") {
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
                            {record.id[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton
                            onClick={() => {
                                handleDelete(record)
                            }}
                            size="large">
                            <DeleteOutlined>
                            </DeleteOutlined>
                        </IconButton>
                    }
                    title={record.id}
                    subheader={record.ctgJsonUrl ? record.ctgUrl + ", " + record.ctgJsonUrl : record.ctgUrl}
                >
                </CardHeader>
                <CardContent>
                   <Typography>
                    {record.comment}
                   </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick = {() => {
                        history.push({
                            pathname: '/ctg',
                            state: {
                                record: record
                            }
                        })
                    }}>
                        Details 
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
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
        // console.log(ctgUrl)
    }, [ctgUrl])

    async function writeCtgRecordToDB() {
        await API.graphql({ query: createCTGImageMutation, variables: { input: {
            ctgUrl: details,
            ecgUrl: "s3://biorithm-testing-data/log/STG045A_raw/STG045A_raw_ctg.png",
            createdTime: 10}}});
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setDetailsError(false)
        setPatientIdError(false)

        // console.log(patientId, details)
        
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
                         <Skeleton variant="rectangular" width={"100%"} height={ctgImageHeight} animation={false}></Skeleton>}
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
                                     }}
                                     size="large">
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