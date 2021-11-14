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
// 003    |  12 NOV 2021      | TRAN MINH HAI      | - Clean
//=====================================================================================================================
import React, {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {blue, green, pink, yellow} from '@mui/material/colors';
import {AppBar, Button, Toolbar, List, ListItem, ListItemIcon, ListItemText, Drawer, Menu, MenuItem} from "@mui/material";
import {AddCircleOutlineOutlined, CloudCircle, CloudUpload,} from "@mui/icons-material";
import { format } from 'date-fns';
import { useHistory, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';

const drawerWidth = 240

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
    const [doctorName, setDoctorName] = useState("Biorithm")

    useEffect(async () => {
        setUserName(localStorage.getItem('username'))
        setDoctorName(localStorage.getItem('doctorName'))
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
            text: "Search",
            icon: <SearchIcon color={"secondary"}></SearchIcon>,
            path: "/search"
        },
        {
            text: "Patients",
            icon: <GroupIcon color={"secondary"}></GroupIcon>,
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
                        localStorage.clear()
                        localStorage.clear()
                        setAuthenticated(null)
                        history.push("/")
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

export {CTGAppLayout}