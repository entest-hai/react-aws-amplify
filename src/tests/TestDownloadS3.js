import React, {useEffect} from "react";
import { Storage } from 'aws-amplify';
import {width} from "@mui/system";

const TestDownloadS3 = () => {
    var fileReader = new FileReader()
    fileReader.onload = () => {
        console.log(JSON.parse(this.result))
    }


    useEffect(async () => {
        var image = new Image()
        const signedURL = await Storage.get("MAMS057A_raw_ctg1.png", {expires: 60});
        image.src = signedURL
        image.onerror = () => {
            console.log("ERROR")
        }
        image.onload = () => {
            console.log("OK")
        }

    })

    // useEffect(async () => {
    //     const result = await Storage.get("SHEEP001.json", {download: true})
    //     result.Body.text().then(string => {
    //         const ctg = JSON.parse(string)
    //         sessionStorage.setItem("SHEEP001",string)
    //         console.log(ctg.fHR)
    //     })
    // })

    return (
        <h1>Download From S3</h1>
    )
}

export {TestDownloadS3}