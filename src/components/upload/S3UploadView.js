//=====================================================================================================================
// Purpose: Upload data to aws s3 and call FHR API to get imageS3Url and display the image 
// Author: TRAN MINH HAI 
// Date: 20 AUG 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content 
//********************************************************************************************************************/
// 001.   |  23 AUG 2021.     | TRAN MINH HAI      | - Refactor and add header 
// 002.   |  31 AUG 2021.     | TRAN MINH HAI      | - Call FHR API and create a CTGRecord in DynamoDB comments 
//=====================================================================================================================

import { Button, Container, Card, CardMedia, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {React, useState} from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import {API, Storage} from 'aws-amplify';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import awsmobile from '../../aws-exports';
import { fhr_api_end_point } from '../../config/apiendpoint';
import {CtgImageViewer} from "../ctg/CtgImageViewer";
import {UserSessionService} from "../../services/UserSessionService";
import {createCtgNumerical} from "../../graphql/mutations";


const ctgImageHeight = 400


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
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};


const UploadView = () => {

    const classes = makeStyles(() => {
        return {
            container: {
                maxWidth:window.screen.width-10,
                padding: 0,
            },
            button: {
                
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
    
    // const [showImage, setShowImage] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileName, setfileName] = useState(null)
    const [progress, setProgress] = useState(0)
    const [ctgS3Url, setCtgS3Url] = useState(null)

    const callFHRAPI = async() => {
        // check file type before calling api
        let extension = fileName.split(".").pop()
        if (extension=="dat" || extension=="csv") {
            fetch(fhr_api_end_point + fileName)
            .then(response => response.json())
            .then(result => {
                let ctgUrl = result.s3Url.split("/").pop()
                let ctgJsonUrl = result.ctgJsonUrl ? result.ctgJsonUrl : "STG015A.json"
                getCTGSignedS3Url(ctgUrl)
                writeCtgRecordToDB(ctgUrl, ctgJsonUrl)
            })
            .catch(error => {
                console.log('error', error)
            });
        }
        // 
    }

    async function writeCtgRecordToDB(ctgUrl, ctgJsonUrl) {
        let createdTime = new Date()
        await UserSessionService.getUserSession()
        await API.graphql({ query: createCtgNumerical, variables: { input: {
            ctgUrl: ctgUrl,
            ecgUrl: "",
            ctgJsonUrl:ctgJsonUrl,
            doctorID: UserSessionService.user.doctorID,
            patientID: 'e183c626-dd86-4834-9b4a-5e136a09cce7',
            hospitalID: UserSessionService.user.hospitalID,
            createdTime: createdTime.getTime()}}}
            );
    }

    const getCTGSignedS3Url = async(s3Url) => {
        const signedURL = await Storage.get(s3Url, {expires: 60});
        setCtgS3Url(signedURL);
    }

    const handleUpload = async () => {
        // split file and take max 30 minute 
        const result = await Storage.put(selectedFile[0].name, selectedFile[0], {
            progressCallback(value){
                setProgress(100.0*value.loaded/value.total)
            }
        }).then(() => {
            setSelectedFile(null)
            callFHRAPI(selectedFile[0].name)
            // TODO then write CTGRecord to DynamoDB 
            // or lambda write CTGRecord to DynamoDB 
        })
    }

    const chooseFileButton = 
    <label htmlFor="contained-button-file">
        <Button
            className={classes.button}
            variant={"contained"}
            color={"primary"}
            component={"span"}
            onClick={() => {
                setProgress(0)
            }}
            >
            Choose Files
        </Button>
    </label> 

    const uploadButton = 
    <Button
        variant={"contained"}
        color={"primary"}
        component={"span"}
        className={classes.button}
        onClick={handleUpload}
    >
        Upload 
    </Button>

    const uploadFile = 
    <div>
        <input 
            style={{display: "none"}}
            id={"contained-button-file"}
            multiple
            type={"file"}
            onChange={(event) => {
                setSelectedFile(event.target.files)
                setfileName(event.target.files[0].name)
            }}>
        </input>
        {selectedFile==null ? chooseFileButton : uploadButton}
    </div>

    return (
       <div style={{width:'95vw', margin:'auto'}}>
            <CtgImageViewer
                ctgViewerWidth={'95vw'}
                ctgS3Url={ctgS3Url}>
            </CtgImageViewer>
            <TextField
                className={classes.field}
                label={fileName}
                rows={1}
                variant={"outlined"}
                color={"secondary"}
                fullWidth
                placeholder={"file name"}
                required
                onChange={(event) => {

                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {uploadFile}
                        </InputAdornment>),
                }}>
            </TextField>
            <LinearProgressWithLabel value={progress}></LinearProgressWithLabel>
       </div>
    )
}

export {UploadView};