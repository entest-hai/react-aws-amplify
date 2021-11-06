import React, {useEffect, useState} from "react";
import {Storage} from "aws-amplify";
import {Paper} from "@material-ui/core";
import {CtgListDoctorFacing} from "./CtgListDoctorFacing";
import {CtgStaticCanvasViewer} from "./CtgStaticCanvasViewer";

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

    return (
            <Paper style={{overflow:'hidden', overflowX:'scroll', margin: 0}} elevation={4}>
                {isFetching && <CtgStaticCanvasViewer heartRate={heartRate} ctgId={ctgId} ></CtgStaticCanvasViewer>}
                <CtgListDoctorFacing setCtgId={setCtgId} tableHeight={(window.screen.height/2.8).toString()+'px'}></CtgListDoctorFacing>
            </Paper>
    )
}

export {CtgListAndCtgStaticViewerDoctorFacing}