//=====================================================================================================================
// Purpose: Show CTG note view including CTG image and doctor's comments 
// Author: TRAN MINH HAI 
// Date: 20 AUG 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content 
//********************************************************************************************************************/
// 001.   |  23 AUG 2021.     | TRAN MINH HAI      | - Refactor and add header 
//=====================================================================================================================
import {React, useState, useEffect} from 'react'
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
import { CloudCircle, ZoomIn, ZoomOut, ZoomOutRounded, ZoomOutSharp } from '@material-ui/icons';
import CardActions from '@material-ui/core/CardActions';
import {CtgImageViewer} from "./CtgImageViewer";
import { useHistory, useLocation } from 'react-router-dom';
import {Storage} from "aws-amplify";

const CTGNoteView = ({match}) => {

    const location = useLocation()
    const [record, setRecord] = useState(location.state ? location.state.record : null)
    const [ctgS3Url, setCtgS3Url] = useState(null)
    const scale = 1.1
    const [image, setimage] = useState(null)
    const [width, setWidth] = useState(null)
    const [height, setHeight] = useState(null)
    const ctgImageHeight = 600
    const [showImage, setShowImage] = useState(true)

    useEffect(async () => {
         try {
             // TODO add check exist file or not or using download
             const signedURL = await Storage.get(location.state.record.ctgUrl, {expires: 60});
             setCtgS3Url(signedURL);
         } catch (e) {
             setCtgS3Url(null)
         }
    })

    const classes = makeStyles((theme) => {
        return {
            // toolbar: theme.mixins.toolbar,
            searchForm: {
                maxWidth:window.screen.width-10,
                padding: 0,
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
            },
            container: {
                maxWidth:window.screen.width-350,
                backgroundColor: "grey",
                padding: 0,
            },
            ctgFormTitleText:{
              fontSize: 12,
            },
            ctgRecordText: {
                fontSize: 14,
                paddingBottom: 10
            }
        }
    })()

    const getImageSize  = () => {
        setimage(document.getElementById("image123"))
        setWidth(document.getElementById("image123").width)
        setHeight(document.getElementById("image123").height)
   }

    const zoomInHandle = () => {
        console.log("zoom in image")
        image.width = scale * image.width  
        image.height = scale * image.height  
    }
 
    const zoomOutHandle = () => {
        console.log("zoom out image")
        image.width = (1.0 / scale) * image.width
        image.height = (1.0 / scale) * image.height
    }
 
    const defaultHandle = () => {
        console.log("image size", width, height)
        image.width = width;
        image.height = height;
    }

    useEffect(() => {
        return () => {
            console.log("unmount the image viewer")
        }
    }, [])

    const dateTimeToString = (time) => {
        let obj = new Date(time)
        return obj.toLocaleDateString() + "-" + obj.toLocaleTimeString()
    }

    const CtgInformationDetails =  () => {
        return (
            <div style={{paddingBottom: 20}}>
                <Typography className={classes.ctgFormTitleText} color={"textSecondary"} gutterBottom>
                    Patient ID
                </Typography>
                <Typography className={classes.ctgRecordText}>
                    {location.state.record.patientID ? location.state.record.patientID : "UNKNOWN"}
                </Typography>
                <Typography className={classes.ctgFormTitleText} color={"textSecondary"} gutterBottom>
                    Hospital ID
                </Typography>
                <Typography className={classes.ctgRecordText}>
                    {location.state.record.hospitalID ? location.state.record.hospitalID : "UNKNOWN"}
                </Typography>
                <Typography className={classes.ctgFormTitleText} color={"textSecondary"} gutterBottom>
                    Doctor ID
                </Typography>
                <Typography className={classes.ctgRecordText}>
                    {location.state.record.doctorID ? location.state.record.doctorID : "UNKNOWN"}
                </Typography>
                <Typography className={classes.ctgFormTitleText} color={"textSecondary"} gutterBottom>
                    Ctg ID
                </Typography>
                <Typography className={classes.ctgRecordText}>
                    {location.state.record.id ? location.state.record.id : "UNKNOWN"}
                </Typography>
                <Typography className={classes.ctgFormTitleText} color={"textSecondary"} gutterBottom>
                    CtgUrl
                </Typography>
                <Typography className={classes.ctgRecordText}>
                    {location.state.record.ctgUrl ? location.state.record.ctgUrl : "UNKNOWN"}
                </Typography>
                <Typography className={classes.ctgFormTitleText} color={"textSecondary"} gutterBottom>
                    CtgJsonUrl
                </Typography>
                <Typography className={classes.ctgRecordText}>
                    {location.state.record.ctgJsonUrl ? location.state.record.ctgJsonUrl : "UNKNOWN"}
                </Typography>
                <Typography className={classes.ctgFormTitleText} color={"textSecondary"} gutterBottom>
                    Comment
                </Typography>
                <Typography className={classes.ctgRecordText}>
                    {location.state.record.comment ? location.state.record.comment : "NULL"}
                </Typography>
                <Typography className={classes.ctgFormTitleText} color={"textSecondary"} gutterBottom>
                    Created At
                </Typography>
                <Typography className={classes.ctgFormTitleText}>
                    {location.state.record.createdTime ? dateTimeToString(location.state.record.createdTime) : "UNKNOWN"}
                </Typography>
            </div>
        )
    }

    return (
        <Paper style={{margin:5, overflow:'auto', padding:30, height:'100%'}} elevation={5}>
            <CtgInformationDetails></CtgInformationDetails>
            <CtgImageViewer ctgS3Url={ctgS3Url}></CtgImageViewer>

            {/*Old code on 05 NOV 2021*/}
            {/*<Container className={classes.searchForm}>*/}
            {/* <TextField*/}
            {/*        disabled*/}
            {/*        rows={1}*/}
            {/*        variant={"outlined"}*/}
            {/*        color={"primary"}*/}
            {/*        className={classes.textField}*/}
            {/*        placeholder={record ?  record.username : "patient name"}*/}
            {/*        onChange={(event) => {*/}
            {/*            console.log(event.target.value)*/}
            {/*        }}*/}
            {/*        InputProps={{*/}
            {/*            endAdornment: (*/}
            {/*                <InputAdornment position="end">*/}
            {/*                  <IconButton*/}
            {/*                    onClick={() =>{*/}
            {/*                        setShowImage(true)*/}
            {/*                    }}>*/}
            {/*                      <SearchIcon></SearchIcon>*/}
            {/*                  </IconButton>*/}
            {/*                </InputAdornment>*/}
            {/*              ),*/}
            {/*        }}*/}
            {/*    >*/}
            {/*    </TextField>*/}
            {/*</Container>*/}
            {/*<Container className={classes.searchForm}>*/}
            {/*    <TextField*/}
            {/*        disabled*/}
            {/*        multiline*/}
            {/*        rows={7}*/}
            {/*        variant={"outlined"}*/}
            {/*        color={"primary"}*/}
            {/*        className={classes.textField}*/}
            {/*        placeholder={location.state.record.comment ? location.state.record.comment : "comments from doctor"}*/}
            {/*    >*/}
            {/*    </TextField>*/}
            {/*</Container>*/}
            {/*<Container className={classes.searchForm}>*/}
            {/*    <Button*/}
            {/*        disabled={true}*/}
            {/*        className={classes.saveButton}*/}
            {/*        type="submit"*/}
            {/*        color="primary"*/}
            {/*        variant="contained">*/}
            {/*        Save*/}
            {/*    </Button>*/}
            {/*</Container>*/}
        </Paper>
    )
}

export {CTGNoteView}