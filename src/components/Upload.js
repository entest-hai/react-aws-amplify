import { Button, Container, makeStyles} from '@material-ui/core';
import {React, useState} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Storage } from 'aws-amplify';

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

        }
    })

    const [selectedFile, setSelectedFile] = useState(null)
    const [fileName, setfileName] = useState(null)

    const handleUpload = async () => {
        const result = await Storage.put("HaiTest1002.dat", selectedFile[0]).then(() => {
            console.log("uploaded")
        })
        // const file = selectedFile[0]
        // const chunkSize = 1048576 
        // for (let start = 0; start < file.size; start += chunkSize) {
        //     const chunk = file.slice(start, start + chunkSize)
        //     const result = await Storage.put(chunk, 'HaiTest1002.dat')
        //     console.log("upload ", chunk.size, result)
        //   }
    }

    const chooseFileButton = 
    <label htmlFor="contained-button-file">
        <Button
            className={classes.button}
            variant={"contained"}
            color={"primary"}
            component={"span"}>
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
        </Container>
    )
}

export {UploadView};