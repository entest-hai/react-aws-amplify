// 19 OCT 2021 TRAN MINH HAI
// CtgImageViewer
import {
  AutocompleteInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  required,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";
import React, {useState} from "react";
import CardMedia from "@material-ui/core/CardMedia";
import {Box, Button, Container, IconButton, Paper} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import {ZoomIn, ZoomOutRounded} from "@material-ui/icons";

const CtgImageViewer = () => {
    const scale = 1.1
    const ctgImageHeight = 500
    const classes = makeStyles({
        container: {
            backgroundColor: "grey",
            padding: 0,
        }
    })()
    const [image, setImage] = useState(null)
    const [imageStyle, setImageStyle] = useState({height:ctgImageHeight,width:'auto'})
    const [showImage, setShowImage] = useState(true)

    const getImageSize  = () => {
        setImage(document.getElementById("image123"))
   }

    const zoomInHandle = () => {
        console.log("zoom in image", image.height, image.width)
        setImageStyle({height: scale * image.height, width: 'auto'})
    }

    const zoomOutHandle = () => {
        setImageStyle({height: (1.0/scale) * image.height, width: 'auto'})
    }

    const defaultHandle = () => {
       setImageStyle({height: ctgImageHeight, width: 'auto'})
    }

    return (
         <Container maxWidth={'xl'} className={classes.container}>
            <Card>
            <CardMedia>
                <Paper style={{overflow:'auto'}} elevation={0}>
                    {showImage ? <img onLoad={getImageSize} id={"image123"} src={process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png"} style={imageStyle}/> :
                    <Skeleton variant={"rect"} width={"100%"} height={ctgImageHeight} animation={false}></Skeleton>}
                </Paper>
            </CardMedia>
            <CardActions>
                <IconButton
                    onClick={zoomInHandle}>
                    <ZoomIn></ZoomIn>
                </IconButton>
                <IconButton
                    onClick={zoomOutHandle}>
                    <ZoomOutRounded></ZoomOutRounded>
                </IconButton>
                <Button
                    onClick={defaultHandle}>
                    Default
                </Button>
            </CardActions>
        </Card>
        </Container>
    )
}

export  {CtgImageViewer};