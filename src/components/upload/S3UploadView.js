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

import { Button, Container, makeStyles, Card, CardMedia, Paper} from '@material-ui/core';
import {React, useState} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Storage } from 'aws-amplify';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import awsmobile from '../../aws-exports';
import { fhr_api_end_point } from '../../config/apiendpoint';


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
                getCTGSignedS3Url(result.s3Url.split("/").pop())
            })
            .catch(error => {
                console.log('error', error)
            });
        }
        // 
    }

    const getCTGSignedS3Url = async(s3Url) => {
        const signedURL = await Storage.get(s3Url, {expires: 60});
        setCtgS3Url(signedURL);
        // setShowImage(true)
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
       <div>
            <Container maxWidth={"lg"}>
                <Card>
                    <CardMedia className={classes.media}>
                        <Paper style={{overflow:'auto'}} elevation={4}>
                            {ctgS3Url != null ? <img src={ctgS3Url}/> : 
                            <Skeleton variant={"rect"} width={"100%"} height={ctgImageHeight} animation={false}></Skeleton>}
                        </Paper>
                    </CardMedia>
                </Card>
            </Container>
            <Container>
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
        </Container>
       </div>
    )
}

export {UploadView};