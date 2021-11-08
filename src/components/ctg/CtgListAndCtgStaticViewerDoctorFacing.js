import React, {useEffect, useState} from "react";
import {Storage} from "aws-amplify";
import {Paper} from "@mui/material";
import {CtgListDoctorFacing} from "./CtgListDoctorFacing";
import {CtgStaticCanvasViewer} from "./CtgStaticCanvasViewer";
import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";

const CtgListAndCtgStaticViewerDoctorFacing = () => {
    const [ctgId, setCtgId] = useState("SHEEP001.json")
    const [isFetching, setIsFetching] = useState(false)
    const [heartRate, setHeartRate] = useState({mHR:[0], fHR:[0]})

    const updateHeartRate = (heartRate) => {
        let mHR = heartRate.mHR
        let fHR = heartRate.fHR
        // replace null by NaN for plotting
        for (var i = 0; i < mHR.length; i++){
            if (mHR[i] == null || mHR[i] < 10.0){
                mHR[i] = Number.NaN
            }
            if (fHR[i] == null || fHR[i] < 10.0){
                fHR[i] = Number.NaN
            }
        }
        // set mHR and fHR to upload the CTG plot
        setHeartRate({mHR: mHR, fHR: fHR})
        setIsFetching(true)
    }

    useEffect(async () => {
        // get data from sessionStorage
        try{
            const heartRate = JSON.parse(sessionStorage.getItem(ctgId))
            updateHeartRate(heartRate)
        } catch(e) {
        try {
            const result = await Storage.get(ctgId, {download: true})
            result.Body.text().then(text => {
                let heartRate = JSON.parse(text)
                updateHeartRate(heartRate)
                // buffer it to local storage
                try{
                    sessionStorage.setItem(ctgId, text)
                } catch (e) {

                }
            })
        } catch (e) {
            setHeartRate({mHR: [0], fHR: [0]})
            setIsFetching(true)
        }
        }
    }, [ctgId])

    const numCtgRowPerScreen = 2.5
    const ctgCanvasHeight = window.screen.height/numCtgRowPerScreen
    const ctgViewerControllerHeight = 80
    const tableHeight = window.innerHeight - ctgCanvasHeight - ctgViewerControllerHeight

    const classes = makeStyles((theme) => ({
        table: {
            height: tableHeight - theme.mixins.toolbar.minHeight,
            overflow: "hidden",
            marginBottom:0
        }
    }))()


    return (
        <div>
            <Paper style={{width:'100%', overflow:"auto"}}>
                {isFetching && <CtgStaticCanvasViewer numCtgRowPerScreen = {numCtgRowPerScreen} heartRate={heartRate} ctgId={ctgId} ></CtgStaticCanvasViewer>}
            </Paper>
            <Paper className={classes.table}>
                <CtgListDoctorFacing setCtgId={setCtgId} tableHeight={(tableHeight-64).toString()+'px'}></CtgListDoctorFacing>
            </Paper>
        </div>
    )
}

export {CtgListAndCtgStaticViewerDoctorFacing}