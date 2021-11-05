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

const CTGNoteView = ({ctgRecord}) => {
    const scale = 1.1 
    const [image, setimage] = useState(null)
    const [width, setWidth] = useState(null)
    const [height, setHeight] = useState(null)
    const ctgImageHeight = 600
    const [showImage, setShowImage] = useState(true)

    const classes = makeStyles((theme) => {
        return {
            // toolbar: theme.mixins.toolbar,
            searchForm: {
                maxWidth:window.screen.width-350,
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
 

    return (
        <div>
            <CtgImageViewer ctgS3Url={ctgRecord.ctgUrl}></CtgImageViewer>
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
            <Container className={classes.searchForm}>
                <Button
                    disabled={true}
                    className={classes.saveButton}
                    type="submit"
                    color="primary"
                    variant="contained">
                    Save
                </Button>
            </Container>
        </div>
        // <div>
        //     <Container maxWidth={"xl"}>
        //         <Card>
        //             <CardMedia className={classes.media}>
        //                 <Paper style={{overflow:'auto'}} elevation={4}>
        //                     {showImage ? <img onLoad={getImageSize} id={"image123"} src={process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png"}/> :
        //                     <Skeleton variant={"rect"} width={"100%"} height={ctgImageHeight} animation={false}></Skeleton>}
        //                 </Paper>
        //             </CardMedia>
        //             <CardActions>
        //                 <IconButton
        //                     onClick={zoomInHandle}>
        //                     <ZoomIn></ZoomIn>
        //                 </IconButton>
        //                 <IconButton
        //                     onClick={zoomOutHandle}>
        //                     <ZoomOutRounded></ZoomOutRounded>
        //                 </IconButton>
        //                 <Button
        //                     // variant={"contained"}
        //                     onClick={defaultHandle}>
        //                     Default
        //                 </Button>
        //             </CardActions>
        //         </Card>
        //     </Container>
        //
        //     <Container className={classes.searchForm} maxWidth={"xl"}>
        //     <TextField
        //             disabled
        //             rows={1}
        //             variant={"outlined"}
        //             color={"primary"}
        //             className={classes.textField}
        //             placeholder={ctgRecord.username ?? "patient name"}
        //             onChange={(event) => {
        //                 console.log(event.target.value)
        //             }}
        //             InputProps={{
        //                 endAdornment: (
        //                     <InputAdornment position="end">
        //                       <IconButton
        //                         onClick={() =>{
        //                             setShowImage(true)
        //                         }}>
        //                           <SearchIcon></SearchIcon>
        //                       </IconButton>
        //                     </InputAdornment>
        //                   ),
        //             }}
        //         >
        //         </TextField>
        //     </Container>
        //     <Container className={classes.searchForm} maxWidth={"xl"}>
        //         <TextField
        //             disabled
        //             multiline
        //             rows={7}
        //             variant={"outlined"}
        //             color={"primary"}
        //             className={classes.textField}
        //             placeholder={ctgRecord.ctgUrl ?? "comments from doctor"}
        //         >
        //         </TextField>
        //     </Container>
        //     <Container>
        //         <Button
        //             disabled={true}
        //             className={classes.saveButton}
        //             type="submit"
        //             color="primary"
        //             variant="contained">
        //             Save
        //         </Button>
        //     </Container>
        //     <Typography
        //         className={classes.permissionText}
        //         color="secondary"
        //     >
        //         Only admin is allowed to edit this information
        //     </Typography>
        // </div>
    )
}

export {CTGNoteView}