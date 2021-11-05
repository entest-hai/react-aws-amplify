// 21 OCT 2021 TRAN MINH HAI
// use UserSessionService test

import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {API, Auth} from "aws-amplify";
import {createCtg as createCTGImageMutation} from "../../graphql/mutations";
import {createCtgNumerical} from "../../graphql/mutations";
import {getDoctor} from "../../graphql/queries";
import {Button, Container, Paper, TextField} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Skeleton from "@material-ui/lab/Skeleton";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {KeyboardArrowRight} from "@material-ui/icons";
import {UserSessionService} from "../../services/UserSessionService";
import {CtgImageViewer} from "./CtgImageViewer";

const CtgCreateNote = () => {

    const history = useHistory()
    const [details, setDetails] = useState('')
    const [detailsError, setDetailsError] = useState(false)
    const [patientId, setPatientId] = useState('')
    const [patientIdError, setPatientIdError] = useState(false)
    const [ctgUrl, setCtgUrl] = useState('')
    const ctgImageHeight = 400
    const [showImage, setShowImage] = useState(false)

    const classes = makeStyles((theme) => {
        return {
            searchForm: {
                display: "flex"
            },
            input: {
                flex: 1,
            },
            textField: {
                flex: 1,
                marginTop: 20,
                marginBottom: 5,
            },
            media: {
                height: ctgImageHeight,
                overflow: "auto"
            },
            saveButton: {
                float: "left",
                marginTop: 5,
                paddingLeft: 20,
                paddingRight: 20
            },
            field: {
            marginTop: 20,
            marginBottom: 20,
            display: "block"
        },
        }
    })()

    useEffect(async () => {
        console.log(ctgUrl)
    }, [ctgUrl])

    // TODO: search patient ID and clean things here
    async function writeCtgRecordToDB() {
        let createdTime = new Date()
        await UserSessionService.getUserSession()
        await API.graphql({ query: createCtgNumerical, variables: { input: {
            ctgJsonUrl: "STG095A.json",
            ctgUrl: "095A_raw.csv.png",
            ecgUrl: "",
            doctorID: UserSessionService.user.doctorID,
            patientID: 'e183c626-dd86-4834-9b4a-5e136a09cce7',
            hospitalID: UserSessionService.user.hospitalID,
            comment: details ? details : "",
            createdTime: createdTime.getTime()}}
        }
            );
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        setDetailsError(false)
        setPatientIdError(false)

        console.log(patientId, details)

        if (details==''){
            setDetailsError(true)
        }

        if (patientId==''){
            setPatientIdError(true)
        }

        if (patientId && details) {
            writeCtgRecordToDB().then(() => history.push("/"))
        }
    }

    return (
       <Container maxWidth={window.screen.width-10}>
          {/* <Card>
                <CardMedia className={classes.media}>
                    <Paper style={{overflow:'auto'}} elevation={4}>
                        {showImage ? <img src={process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png"}/> :
                        <Skeleton variant={"rect"} width={"100%"} height={ctgImageHeight} animation={false}></Skeleton>}
                    </Paper>
                </CardMedia>
            </Card>*/}
            <CtgImageViewer ctgS3Url={showImage ? process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png" : null}></CtgImageViewer>
           <form noValidate autoComplete="off" onSubmit={handleSubmit}>
               <TextField
                   className={classes.field}
                    label={"Patient Id & Click Search"}
                    rows={1}
                    variant={"outlined"}
                    color={"secondary"}
                    fullWidth
                    placeholder={"Hai"}
                    required
                    error={patientIdError}
                    onChange={(event) => {
                        setPatientId(event.target.value)

                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                onClick={() =>{
                                    setShowImage(true)
                                }}>
                                    <SearchIcon></SearchIcon>
                                </IconButton>
                            </InputAdornment>
                            ),
                    }}>
               </TextField>
                  <TextField
                      className={classes.field}
                    label="Doctor comments"
                    onChange={(event) => {
                        setDetails(event.target.value)
                    }}
                    variant="outlined"
                    color="secondary"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    error={detailsError}
                  >
                  </TextField>
                   <Button
                       type="submit"
                       color="primary"
                       variant="contained"
                       endIcon={<KeyboardArrowRight></KeyboardArrowRight>}
                   >
                   Submit
                </Button>
           </form>
       </Container>
    );
}

export {CtgCreateNote}