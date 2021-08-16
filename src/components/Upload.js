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
import awsmobile from '../aws-exports';
import { fhr_api_end_point } from './apiendpoint';


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
    
    const [showImage, setShowImage] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileName, setfileName] = useState(null)
    const [progress, setProgress] = useState(0)
    const [ctgS3Url, setCtgS3Url] = useState(null)

    const callFHRAPI = async() => {
        fetch(fhr_api_end_point + fileName)
            .then(response => response.json())
            .then(result => {
                console.log(result.s3Url)
                getCTGSignedS3Url("STG049B_raw_ctg.png")
        })
        .catch(error => console.log('error', error));
    }

    const getCTGSignedS3Url = async(s3Url) => {
        const signedURL = await Storage.get(s3Url, {expires: 60});
        console.log("fetch image", signedURL)
        setCtgS3Url(signedURL);
        setShowImage(true)
    }

    const handleUpload = async () => {
        const result = await Storage.put(selectedFile[0].name, selectedFile[0], {
            progressCallback(value){
                setProgress(100.0*value.loaded/value.total)
            }
        }).then(() => {
            console.log("uploaded")
            setSelectedFile(null)
            callFHRAPI(selectedFile[0].name)
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
                            {showImage ? <img src={ctgS3Url}/> : 
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