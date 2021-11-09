// 08 NOV 2021 TRAN MINH HAI
// Admin depends on material-ui/core so need to use material-ui/core  here
// instead of mui/core to view Ctg Image

import {getCtgNumerical, getDoctor} from "../../graphql/queries";
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
import React, {useEffect, useState} from "react";
// import CardMedia from "@mui/material/CardMedia";
// import {Box, Button, Container, IconButton, Paper} from "@mui/material";
// import Skeleton from '@mui/material/Skeleton';
// import Card from "@mui/material/Card";
// import makeStyles from '@mui/styles/makeStyles';
// import CardActions from "@mui/material/CardActions";
// import {ZoomIn, ZoomOutRounded} from "@mui/icons-material";
// import {CtgImageViewer} from "../ctg/CtgImageViewer";
import {API, Storage} from "aws-amplify";
import {CtgImageViewer} from "../ctg/CtgImageViewer";
// import {Typography} from "@material-ui/core";
// import { useHistory, useLocation } from 'react-router-dom';

const CtgNumericalList = (props) => {
    // console.log(props)
    return (
    <List {...props}>
      <Datagrid>
        <TextField source={"id"}></TextField>
        <TextField source={"ctgUrl"}></TextField>
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
       <ShowButton></ShowButton>
       <EditButton></EditButton>
      </Datagrid>
    </List>
  );
}

const CtgNumericalShow = (props) => {
    // const scale = 1.1
    const ctgImageHeight = 500
    const [ctgS3Url, setCtgS3Url] = useState(null)
    // const [image, setImage] = useState(null)
    // const [width, setWidth] = useState(null)
    // const [height, setHeight] = useState(null)
    const [imageStyle, setImageStyle] = useState({height:ctgImageHeight,width:'auto'})
    // const classes = makeStyles((theme) => {
    //     return {
    //         container: {
    //         padding: 0,
    //         height: ctgImageHeight
    //     },
    //         media: {
    //             height: ctgImageHeight,
    //             overflow: "auto"
    //         },
    //         card: {
    //             maxWidth: '80%',
    //             maxHeight: 500
    //         }
    //     }
    // })()


   //  const getImageSize  = () => {
   //      setImage(document.getElementById("image123"))
   //      setWidth(document.getElementById("image123").width)
   //      setHeight(document.getElementById("image123").height)
   // }
   //
   //  const zoomInHandle = () => {
   //      console.log("zoom in image")
   //      image.width = scale * image.width
   //      image.height = scale * image.height
   //  }
   //
   //  const zoomOutHandle = () => {
   //      console.log("zoom out image")
   //      image.width = (1.0 / scale) * image.width
   //      image.height = (1.0 / scale) * image.height
   //  }
   //
   //  const defaultHandle = () => {
   //      console.log("image size", width, height)
   //      image.width = width;
   //      image.height = height;
   //  }
   //
   //  const [ctgS3Url, setCtgS3Url] = useState(null)

    useEffect(() => {
        console.log("id ", props.id)
    },[props.id])

    useEffect(async () => {
        const apiData = await API.graphql({query: getCtgNumerical, variables:{id: String(props.id)}})
        const record = apiData.data.getCtgNumerical
        var image = new Image()
        try {
             // TODO add check exist file or not or using download
             const signedURL = await Storage.get(record.ctgUrl, {expires: 60});
             image.src = signedURL
             image.onerror = () => {
                 console.log("error file does not exit")
                 setCtgS3Url(null)
             }
             image.onload = () => {
                 console.log(signedURL)
                 setCtgS3Url(signedURL)
             }
         } catch (e) {
             setCtgS3Url(null)
         }
    },[])

    return (
            <Show {...props}>
             <SimpleShowLayout>
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
                <TextField source={"id"}></TextField>
                <TextField source={"patientID"}></TextField>
                <TextField source={"ctgUrl"}></TextField>
                <TextField source={"ctgJsonUrl"}></TextField>
                <TextField source={"comment"}></TextField>
                <TextField source={"createdAt"}></TextField>
                <TextField source={"updatedAt"}></TextField>
                 {/*{ctgS3Url && <img id={"image123"} src={ctgS3Url} style={imageStyle}/>}*/}
                 {ctgS3Url && <CtgImageViewer ctgS3Url={ctgS3Url}></CtgImageViewer>}
            </SimpleShowLayout>
        </Show>
    )
}

const CtgNumericalEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source={"id"}></TextInput>
                <TextInput source={"patientID"}></TextInput>
                 <TextInput source={"hospitalID"}></TextInput>
                 <TextInput source={"doctorID"}></TextInput>
                <TextInput source={"ctgUrl"}></TextInput>
                <TextInput source={"ctgJsonUrl"}></TextInput>
                <TextInput source={"comment"}></TextInput>
                <TextField source={"updatedAt"}></TextField>
            </SimpleForm>
        </Edit>
    )
}

const CtgNumericalCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm>
                 <TextInput source={"id"}></TextInput>
                <TextInput source={"patientID"}></TextInput>
                <TextInput source={"hospitalID"}></TextInput>
                 <TextInput source={"doctorID"}></TextInput>
                <TextInput source={"ctgUrl"}></TextInput>
                <TextInput source={"ctgJsonUrl"}></TextInput>
                <TextInput source={"comment"}></TextInput>
                <TextField source={"updatedAt"}></TextField>
            </SimpleForm>
        </Create>
    )
}

export {CtgNumericalList, CtgNumericalCreate, CtgNumericalShow, CtgNumericalEdit};