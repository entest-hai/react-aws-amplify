// 19 OCT 2021 TRAN MINH HAI
// CtgImageViewer
// TODO: handle image size > screen size when loading the image
import React, {useState} from "react";
import {Button, Paper, IconButton, Card, CardMedia, CardActions, Grid} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {ZoomIn, ZoomOutRounded} from "@material-ui/icons";

// import CardMedia from "@mui/material/CardMedia";
// import {Button, IconButton, Paper} from "@mui/material";
// import Skeleton from '@mui/material/Skeleton';
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import {ZoomIn, ZoomOutRounded} from "@mui/icons-material";
// import {Grid} from "@material-ui/core";

const CtgImageViewerForAdmin = (props) => {

    const scale = 1.1
    const ctgImageHeight = 700
    const ctgViewerHeight = window.screen.height/2.5
    const ctgViewerWidth = props.ctgViewerWidth ? props.ctgViewerWidth : '100vw'
    const [image, setImage] = useState(null)
    const [imageStyle, setImageStyle] = useState({height:ctgImageHeight,width:'auto'})

    const getImageSize  = async () => {
        let ctgImage = document.getElementById("image123")
        await setImage(ctgImage)
   }

    const zoomInHandle = () => {
        setImageStyle({height: scale * image.height, width: 'auto'})
    }

    const zoomOutHandle = () => {
        setImageStyle({height: (1.0/scale) * image.height, width: 'auto'})
    }

    const defaultHandle = () => {
       setImageStyle({height: ctgImageHeight, width: 'auto'})
    }

    return (
        <Grid container justifyContent={'center'} alignItems={'center'} style={{width:ctgViewerWidth}}>
            <Card elevation={10} style={{width:ctgViewerWidth}}>
               <CardMedia>
                   <Paper style={{overflow:'auto', width:ctgViewerWidth, height:ctgViewerHeight}} elevation={0}>
                       {props.ctgS3Url ? <img onLoad={getImageSize} id={"image123"} src={props.ctgS3Url} style={imageStyle}/> :
                       <Skeleton variant="rectangular" width={ctgViewerWidth} height={ctgImageHeight} animation={false}></Skeleton>}
                   </Paper>
               </CardMedia>
               <CardActions>
                   <IconButton onClick={zoomInHandle} size="large">
                       <ZoomIn></ZoomIn>
                   </IconButton>
                   <IconButton onClick={zoomOutHandle} size="large">
                       <ZoomOutRounded></ZoomOutRounded>
                   </IconButton>
                   <Button
                       onClick={defaultHandle}>
                       Default
                   </Button>
               </CardActions>
            </Card>
        </Grid>

    );
}

export  {CtgImageViewerForAdmin};