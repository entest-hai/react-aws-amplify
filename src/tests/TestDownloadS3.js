import React, {useEffect} from "react";
import { Storage } from 'aws-amplify';

const TestDownloadS3 = () => {
    var fileReader = new FileReader()
    fileReader.onload = () => {
        console.log(JSON.parse(this.result))
    }
    useEffect(async () => {
        const result = await Storage.get("SHEEP001.json", {download: true})
        result.Body.text().then(string => {
            const ctg = JSON.parse(string)
            sessionStorage.setItem("SHEEP001",string)
            console.log(ctg.fHR)
        })
    })

    return (
        <h1>Download From S3</h1>
    )
}

export {TestDownloadS3}