//=====================================================================================================================
// Purpose: Upload data to aws s3 and call FHR API to get imageS3Url and display the image 
// Author: TRAN MINH HAI 
// Date: 20 AUG 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content 
//********************************************************************************************************************/
// 001.   |  23 AUG 2021.     | TRAN MINH HAI      | - Refactor and add header 
// 002.   |  31 AUG 2021.     | TRAN MINH HAI      | - Call FHR API and create a CTGRecord in DynamoDB comments
// 003    |  15 NOV 2021      | TRAN MINH HAI      | - Upload ctg image and write to ctgNumericalRecord table
//=====================================================================================================================
import { Button} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {React, useState} from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from '@mui/material';
import {API, Storage} from 'aws-amplify';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {CtgImageViewer} from "../ctg/CtgImageViewer";
import {UserSessionService} from "../../services/UserSessionService";
import {createCtgNumerical, updateCtgNumerical} from "../../graphql/mutations";
import {getNumericalCtgsById} from "../../services/GraqphqlCtgNumericalService";
import {createCtgNumericalDict, writeCtgRecordToDB} from "../../models/CtgNumericalModel";

const ctgImageHeight = 450

function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};


const CreateCtgNumericalRecord = () => {
    const classes = makeStyles(() => {
        return {
            container: {
                maxWidth:window.screen.width-10,
                padding: 0,
            },
            button: {
                width:120
            },
            field: {
                marginTop: 20,
                marginBottom: 20,
                display: "block"
            },
            media: {
                height: ctgImageHeight,
                overflow: "auto"
            },
        }
    })()
    
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedJsonFile, setSelectedJsonFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const [jsonProgress, setJsonProgress] = useState(0)
    const [ctgS3Url, setCtgS3Url] = useState(null)
    const [ctgLocalUrl, setCtgLocalUrl] = useState(null)
    const [ctgJsonUrl, setCtgJsonUrl] = useState(null)

    const getSignedUrl = async (key) => {
        // console.log("get sign url from s3")
        const signedURL = await Storage.get(key, {expires: 60});
        setCtgS3Url(signedURL)
    }

    const handleUpload = async () => {
        // console.log("upload file to s3")
        const result = await Storage.put(selectedFile[0].name, selectedFile[0], {
            progressCallback(value){
                setProgress(100.0*value.loaded/value.total)
            }
        }).then(() => {
            setSelectedFile(null)
            getSignedUrl(selectedFile[0].name)
        })
    }

    const uploadFileAfterChoosen = async (selectedFile, setUploadProgress) => {
        // console.log("upload file to s3")
        const result = await Storage.put(selectedFile[0].name, selectedFile[0], {
            progressCallback(value){
                setUploadProgress(100.0*value.loaded/value.total)
            }
        }).then(() => {
            // console.log("uploaded successfully to s3 ",selectedFile[0].name)
            // setSelectedFile(null)
            // getSignedUrl(selectedFile[0].name)
        })
    }

    const chooseFileButton = 
    <label htmlFor="contained-button-file">
        <Button
            className={classes.button}
            variant={"contained"}
            color={"primary"}
            component={"span"}
            onClick={async () => {
                setProgress(0)
            }}
            >
            Choose CTG
        </Button>
    </label>

    const chooseJsonFileButton =
    <label htmlFor="contained-button-json-file">
        <Button
            className={classes.button}
            variant={"contained"}
            color={"primary"}
            component={"span"}
            onClick={async () => {
                setJsonProgress(0)
            }}
            >
            Choose Json
        </Button>
    </label>

    const uploadButton = 
    <Button
        variant={"contained"}
        color={"primary"}
        component={"span"}
        className={classes.button}
        onClick={() => {
            // handleUpload()
        }
        }
    >
        Upload 
    </Button>

    const uploadJsonFile =
    <div>
        <input 
            style={{display: "none"}}
            id={"contained-button-json-file"}
            multiple
            type={"file"}
            onChange={async (event) => {
                // console.log("select json file", event.target.files)
                setSelectedJsonFile(event.target.files)
                setCtgJsonUrl(event.target.files[0].name)
            }}>
        </input>
        {selectedJsonFile==null ? chooseJsonFileButton : chooseJsonFileButton}
    </div>


    const uploadFile =
    <div>
        <input
            style={{display: "none"}}
            id={"contained-button-file"}
            multiple
            type={"file"}
            onChange={async (event) => {
                setSelectedFile(event.target.files)
                setCtgLocalUrl(URL.createObjectURL(event.target.files[0]))
            }}>
        </input>
        {selectedFile==null ? chooseFileButton : chooseFileButton}
    </div>


    const [comment, setComment] = useState('')
    const [lost, setLost] = useState('')
    const [accepted, setAccepted] = useState('')

    const handleSubmit = async () => {
        // upload ctg image
        await uploadFileAfterChoosen(selectedFile, setProgress)
        // upload ctg json
        await uploadFileAfterChoosen(selectedJsonFile, setJsonProgress)
        // write to DB
        await UserSessionService.getUserSession()
        let now = new Date()
        let createdTime = now.getTime()
        let doctorID = UserSessionService.user.doctorID
        let hospitalID = UserSessionService.user.hospitalID
        let patientID = 'e183c626-dd86-4834-9b4a-5e136a09cce7'
        let id = selectedFile[0].name
        let ctgNumerical = await createCtgNumericalDict(
            id,
            selectedFile[0].name,
            selectedFile[0].name,
            selectedJsonFile[0].name,
            comment,
            parseFloat(lost),
            accepted,
            patientID,
            doctorID,
            hospitalID,
            createdTime)
        // console.log(ctgNumerical)
        await writeCtgRecordToDB(ctgNumerical)
    }

    const CtgInformationForm =
        <form onSubmit={ async (event) => {
            event.preventDefault()
            await handleSubmit()
        }}>
            {/*<TextField*/}
            {/*    id={"ctgJsonUrl"}*/}
            {/*    label={"ctgJsonUrl"}*/}
            {/*    placeholder={"ctgJsonUrl"}*/}
            {/*    fullWidth*/}
            {/*    required*/}
            {/*    onChange={(e) => {*/}
            {/*        setCtgJsonUrl(e.target.value)*/}
            {/*    }}*/}
            {/*    variant={"outlined"}*/}
            {/*    style={{padding:'auto',marginBottom:20, marginTop:10}}*/}
            {/*    value={accepted}*/}
            {/*    onInput={(e) => {*/}
            {/*        setCtgLocalUrl(e.target.value)*/}
            {/*    }}*/}
            {/*>*/}
            {/*</TextField>*/}
            <TextField
                id={"comment"}
                label={"comment"}
                placeholder={"comment"}
                fullWidth
                required
                onChange={(e) => {
                    setComment(e.target.value)
                }}
                variant={"outlined"}
                style={{padding:'auto',marginBottom:20}}
                value={comment}
                onInput={(e) => {
                    setComment(e.target.value)
                }}
            >
            </TextField>
            <TextField
                id={"lost"}
                label={"lost"}
                placeholder={"-1.0"}
                fullWidth
                required
                onChange={(e) => {
                    setLost(e.target.value)
                }}
                variant={"outlined"}
                style={{padding:'auto',marginBottom:20}}
                value={lost}
                onInput={(e) => {
                    setLost(e.target.value)
                }}
            >
            </TextField>
            <TextField
                id={"accepted"}
                label={"accepted"}
                placeholder={"accepted"}
                fullWidth
                required
                onChange={(e) => {
                    setAccepted(e.target.value)
                }}
                variant={"outlined"}
                style={{padding:'auto',marginBottom:20}}
                value={accepted}
                onInput={(e) => {
                    setAccepted(e.target.value)
                }}
            >
            </TextField>
            <Button
                disabled={selectedFile != null ? false: true}
                type={'submit'}
                variant={"contained"}
                color={"primary"}
                style={{marginBottom:10}}
           >
               Submit
           </Button>
            <Typography>A CTG image should be selected and comment before submit</Typography>
        </form>

    return (
       <div style={{width:'95vw', margin:'auto'}}>
            <CtgImageViewer
                ctgViewerHeight={ctgImageHeight.toString() + 'px'}
                ctgViewerWidth={'95vw'}
                ctgS3Url={ctgLocalUrl}>
            </CtgImageViewer>
            <TextField
                style={{marginBottom:10}}
                className={classes.field}
                label={selectedFile ? selectedFile[0].name : ''}
                rows={1}
                variant={"outlined"}
                color={"secondary"}
                fullWidth
                placeholder={"file name"}
                required
                onChange={(event) => {
                    // console.log(event)
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {uploadFile}
                        </InputAdornment>),
                }}>
            </TextField>
            <LinearProgressWithLabel value={progress}></LinearProgressWithLabel>
           <TextField
               style={{marginTop:10, marginBottom:20}}
                className={classes.field}
                label={selectedJsonFile ? selectedJsonFile[0].name : ''}
                rows={1}
                variant={"outlined"}
                color={"secondary"}
                fullWidth
                placeholder={"file name"}
                required
                onChange={(event) => {
                    // console.log(event)
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {uploadJsonFile}
                        </InputAdornment>),
                }}>
            </TextField>
           <LinearProgressWithLabel value={jsonProgress}></LinearProgressWithLabel>
           {CtgInformationForm}
       </div>
    )
}

export {CreateCtgNumericalRecord};