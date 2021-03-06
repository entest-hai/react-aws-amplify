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
    CardHeader,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { CloudCircle, ZoomIn, ZoomOut, ZoomOutRounded, ZoomOutSharp } from '@mui/icons-material';
import CardActions from '@mui/material/CardActions';
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
        let obj = new Date(time * 1000)
        return obj.toLocaleDateString() + "-" + obj.toLocaleTimeString()
    }

    const downloadImageBlob = async (filename) => {
        const signedURL = await Storage.get(filename, {expires: 60});
        fetch(signedURL)
            .then(res => res.blob())
            .then(blob => {
                var a = document.createElement("a")
                a.href = window.URL.createObjectURL(blob)
                a.download = filename
                a.click()
                a.remove()
            })
            .catch((e) => {
                console.log("error download file", e)
            })
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
                <Typography className={classes.ctgRecordText}>
                    {location.state.record.createdTime ? dateTimeToString(location.state.record.createdTime) : "UNKNOWN"}
                </Typography>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    disabled={ctgS3Url ? false : true}
                    onClick={() => {
                        downloadImageBlob(location.state.record.ctgUrl)
                    }}
                >
                    Download
                </Button>
            </div>
        )
    }

    return (
            <div style={{width:'95vw', margin:'auto'}}>
                <CtgInformationDetails></CtgInformationDetails>
                <CtgImageViewer
                    ctgViewerWidth={'95vw'}
                    ctgS3Url={ctgS3Url}>
                </CtgImageViewer>
            </div>
    )
}

export {CTGNoteView}