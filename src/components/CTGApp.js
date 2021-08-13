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
import {AppBar, Container, Paper, Toolbar} from "@material-ui/core";
import Masonry from "react-masonry-css";

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


const CTGAppLayout = ({children}) => {
    const classes = useStyles()

    return (
    <div className={classes.root}>
        <AppBar>
            <Toolbar>

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
        fetch('http://localhost:8000/notes')
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
                        {record.title}
                    </div>
                ))}

            </Masonry>
        </Container>
    )
}

export {SimpleCtgCart, CTGRecords, CTGAppLayout}