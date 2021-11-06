import { Button, Card, CardActions, CardMedia, Container, IconButton, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { CloudCircle, ZoomIn, ZoomOut, ZoomOutRounded, ZoomOutSharp } from '@mui/icons-material';
import React from 'react';
import { useEffect, useState } from 'react';

const ctgImageHeight = 500; 

const TestImageViewer = () => {

    const imageByte = new Image()
    const scale = 1.1 
    const [image, setimage] = useState(null)
    const [width, setWidth] = useState(null)
    const [height, setHeight] = useState(null)


    
    const classes = makeStyles((theme) => {
       return {
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
          },
        button: {
            margin: 10,
            padding: 15
        },
        media: {
            height: ctgImageHeight,
            overflow: "auto"
        },
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
       image.width = width;
       image.height = height;
   }


   useEffect(() => {  
       return () => {
           console.log("unmount the image viewer")
       }
   }, [])

    return (
        <div className={classes.content}>
            <Container maxWidth={"xl"}>
                <Card>
                    <CardMedia className={classes.media}>
                        <Paper style={{overflow:'auto'}} elevation={4}>
                            <img onLoad={getImageSize} id={"image123"} src={process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png"}></img>
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
                            // variant={"contained"}
                            onClick={defaultHandle}>
                            Default
                        </Button>
                    </CardActions>
                </Card>
            </Container>
            
            
        </div>
    );
}

export {TestImageViewer};