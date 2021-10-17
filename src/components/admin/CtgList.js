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

const CtgList = (props) => {
    // console.log(props)
    return (
    <List {...props}>
      <Datagrid>
        <TextField source={"id"}></TextField>
        <TextField source={"comment"}></TextField>
        <ReferenceField
            label="Hospital"
            source="hospitalID"
            reference="Hospitals">
            <TextField source="name" />
        </ReferenceField>
        <ReferenceField
            label="Doctor"
            source="doctorID"
            reference="Doctors">
            <TextField source="name" />
        </ReferenceField>
        <TextField source={"createdAt"}></TextField>
        <TextField source={"updatedAt"}></TextField>
       <ShowButton></ShowButton>
       <EditButton></EditButton>
      </Datagrid>
    </List>
  );
}

const CtgShow = (props) => {
    const scale = 1.1
    const [image, setimage] = useState(null)
    const [width, setWidth] = useState(null)
    const [height, setHeight] = useState(null)

    const ctgImageHeight = 400
    const [showImage, setShowImage] = useState(true)
    const classes = makeStyles((theme) => {
        return {
            media: {
                height: ctgImageHeight,
                overflow: "auto"
            },
            card: {
                maxWidth: '80%',
                maxHeight: 500
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

    return (
            <Show {...props}>
             <SimpleShowLayout>
                <TextField source={"id"}></TextField>
                <TextField source={"patientID"}></TextField>
                <ReferenceField
                    label="Hospital"
                    source="hospitalID"
                    reference="Hospitals">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField
                    label="Doctor"
                    source="doctorID"
                    reference="Doctors">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source={"ctgUrl"}></TextField>
                <TextField source={"createdAt"}></TextField>
                <TextField source={"updatedAt"}></TextField>
                <Container maxWidth={"lg"} >
                    <Card>
                    <CardMedia className={classes.media}>
                        <Paper style={{overflow:'auto'}} elevation={4}>
                            {showImage ? <img onLoad={getImageSize} id={"image123"} src={process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png"}/> :
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
                            // variant={"contained"}
                            onClick={defaultHandle}>
                            Default
                        </Button>
                    </CardActions>
                </Card>
                </Container>
            </SimpleShowLayout>
        </Show>
    )
}

const CtgEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source={"id"}></TextInput>
                <TextInput source={"patientID"}></TextInput>
                <TextInput source={"ctgUrl"}></TextInput>
            </SimpleForm>
        </Edit>
    )
}

const CtgCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm>
                 <TextInput source={"id"}></TextInput>
                <TextInput source={"patientID"}></TextInput>
                <TextInput source={"ctgUrl"}></TextInput>
            </SimpleForm>
        </Create>
    )
}

export {CtgList, CtgCreate, CtgShow, CtgEdit};