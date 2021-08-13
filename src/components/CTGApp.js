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
import {AppBar, Button, Container, Paper, Toolbar} from "@material-ui/core";
import Masonry from "react-masonry-css";
import { format } from 'date-fns';
import { DeleteOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';

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
                    Hai Tran
                </Typography>
                <Avatar className={classes.avatar}>H </Avatar>
            </Toolbar>
        </AppBar>
        <div className={classes.page}>
            <div className={classes.toolbar}></div>
            {children}
        </div>
    </div>
    )
}

const SimpleCtgCart =() => {
    const classes = useStyles();
    return (
       <Container maxWidth={"lg"}>
           <Paper style={{overflow: 'auto'}}>
               <img src={process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png"}/>
           </Paper>
       </Container>
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

    useEffect(() => {
        fetch('http://3.0.40.65:8000/notes')
            .then(res => res.json())
            .then(data => setRecords(data))
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

    const classes = useStyles(record)
    const history = useHistory()
    const location = useLocation()
    
    return (
        <div>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar className={classes.cardAvartar}>
                            {record.category[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={() => {

                        }}>
                            <DeleteOutlined>

                            </DeleteOutlined>
                        </IconButton>
                    }
                    title={record.title}
                    subheader={record.category}
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

export {SimpleCtgCart, CTGRecords, CTGAppLayout}