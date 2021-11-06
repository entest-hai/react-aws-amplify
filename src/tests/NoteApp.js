//=====================================================================================================================
// Purpose: Test grid view & basic interaction with Json local database CURD
// Author: TRAN MINH HAI 
// Date: 20 AUG 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content 
//********************************************************************************************************************/
// 001.   |  23 AUG 2021.     | TRAN MINH HAI      | - Refactor and add header 
//=====================================================================================================================
import React, {useEffect, useState} from "react"
import {
    AppBar,
    Button,
    CardContent,
    Container, Drawer,
    FormControl,
    FormControlLabel,
    FormLabel, List, ListItem, ListItemIcon, ListItemText,
    Paper, Toolbar,
    Typography, useTheme
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {AddCircleOutlineOutlined, DeleteOutline, KeyboardArrowRight, SubjectOutlined} from "@mui/icons-material";
import { TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import {RadioGroup} from "@mui/material";
import {useHistory, useLocation} from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardHeader} from "@mui/material";
import {IconButton} from "@mui/material";
import Grid from '@mui/material/Grid';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Avatar} from "@mui/material";
import {format} from 'date-fns';
import Masonry from "react-masonry-css";
import {yellow, green, pink, blue} from "@mui/material/colors";

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
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
            marginLeft: theme.spacing(2)
        },
        cardAvartar: {
            backgroundColor: (note) => {
                if (note.category == 'work') {
                    return yellow[700]
                }
                if (note.category == ',money') {
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


const Layout = ({children}) => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const menuItems = [
        {
            text: "My Notes",
            icon: <SubjectOutlined color={"secondary"}></SubjectOutlined>,
            path: "/"
        },
        {
            text: "Create note",
            icon: <AddCircleOutlineOutlined color={"secondary"}>

            </AddCircleOutlineOutlined>,
            path: "/create"
        }
    ];

    return (
        <div className={classes.root}>
        <AppBar
            position={"fixed"}
            className={classes.appBar}
            elevation={0}
            color={"primary"}
        >
        <Toolbar>
            <Typography className={classes.date}>
                Today is the {format(new Date(), 'do MMM Y')}
            </Typography>
            <Typography>
                Hai Tran
            </Typography>
            <Avatar className={classes.avatar} src={"/mario-av.png"}>

            </Avatar>
        </Toolbar>

        </AppBar>
        {/*    slide drawer */}
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

        {/*    main content */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}

function NoteCard({note, handleDelete}){
    const classes = useStyles(note)
    return (
        <div>
           <Card elevation={1}>
               <CardHeader
               avatar={
                   <Avatar className={classes.cardAvartar}>
                       {note.category[0].toUpperCase()}
                   </Avatar>
               }
                action={
                    <IconButton onClick={() => handleDelete(note.id)} size="large">
                       <DeleteOutline>

                       </DeleteOutline>
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
               >

               </CardHeader>
               <CardContent>
                   <Typography variant={"body2"} color={"textSecondary"}>
                       {note.details}
                   </Typography>
               </CardContent>
           </Card>
        </div>
    );
}

const Notes = () => {

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    };

    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/notes')
            .then(res => res.json())
            .then(data => setNotes(data))
    }, [])

    const handleDelete = async (id) => {
        await fetch("http://localhost:8000/notes/" + id, {
            method: "DELETE"
        })

        const newNotes = notes.filter(note => note.id != id)
        setNotes(newNotes)
    }

    return (
        <Container>
            <Masonry
                breakpointCols={breakpoints}
                columnClassName={"my-masonry-grid_column"}
                className={"my-masonry-grid"}>
                {notes.map(note => (
                    <div key={note.id}>
                        <NoteCard note={note} handleDelete={handleDelete}>

                        </NoteCard>
                    </div>
                ))}

            </Masonry>
        </Container>
    )
}

const Create = () => {

    const classes = useStyles()
    const history = useHistory()
    const [category, setCategory] = useState('money')
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, settitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Handle submit form")
        settitleError(false)
        setDetailsError(false)
        
        if (title=='') {
            settitleError(true)
        }

        if (details==''){
            setDetailsError(true)
        }

        if (title && details) {
            fetch('http://localhost:8000/notes', {
                method: 'POST',
                headers: {'Content-type': "application/json"},
                body: JSON.stringify({title, details, category})
            }).then(() => history.push("/"))
        }
    }

    return (
       <Container maxWidth='lg'>
           <Typography
           variant="h6"
           color="textSecondary"
           component="h2"
           gutterBottom
           >
               Create a New Note
           </Typography>
           <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField className={classes.field}
              onChange={(e) => setTitle(e.target.value)}
              label="Note Title"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={titleError}
              >
              </TextField>
              <TextField
              className={classes.field}
              label="Details"
              onChange={(e) => setDetails(e.target.value)}
              variant="outlined"
              color="secondary"
              multiline
              rows={4}
              fullWidth
              required
              error={detailsError}
              >
              </TextField>

               <FormControl className={classes.field}>
                   <FormLabel> Note Category  </FormLabel>
                       <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                           <FormControlLabel value={"money"} control={<Radio></Radio>} label={"Money"}></FormControlLabel>
                           <FormControlLabel value={"todos"} control={<Radio></Radio>} label={"Todos"}></FormControlLabel>
                           <FormControlLabel value={"reminders"} control={<Radio></Radio>} label={"Reminders"}></FormControlLabel>
                           <FormControlLabel value={"work"} control={<Radio></Radio>} label={"Work"}></FormControlLabel>
                       </RadioGroup>
               </FormControl>
               <Button
                   type="submit"
                   color="secondary"
                   variant="contained"
                   endIcon={<KeyboardArrowRight></KeyboardArrowRight>}
               >
                   Submit
               </Button>
           </form>

       </Container>
    );
}

export {Create, Notes, Layout}