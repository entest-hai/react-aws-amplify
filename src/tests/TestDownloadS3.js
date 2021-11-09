// 09 NOV 2021 TRAN MINH HAI
// check S3 file exit
// 10 NOV 2021 TRAN MINH HAI
// download image and json file from S3

import React, {useEffect} from "react";
import { Storage } from 'aws-amplify';
import {width} from "@mui/system";
import {Button} from "@mui/material";

const TestDownloadS3 = () => {
    var fileReader = new FileReader()
    fileReader.onload = () => {
        console.log(JSON.parse(this.result))
    }

    // handle file does not exist in S3
    // useEffect(async () => {
    //     var image = new Image()
    //     const signedURL = await Storage.get("MAMS057A_raw_ctg1.png", {expires: 60});
    //     image.src = signedURL
    //     image.onerror = () => {
    //         console.log("ERROR")
    //     }
    //     image.onload = () => {
    //         console.log("OK")
    //     }
    // })

    const downloadImageFile = async  () => {
        const fileName = "STG063A_raw_ctg1.png"
        const result = await Storage.get(fileName, {download: true})
        const url = URL.createObjectURL(result.Body)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName

        const clickHandler = () => {
            setTimeout(() => {
              URL.revokeObjectURL(url);
              a.removeEventListener('click', clickHandler);
            }, 150);
          };
        a.addEventListener('click', clickHandler, false)
        a.click()
        return a
    }

    const downloadImageBlob = async (filename) => {
        const signedURL = await Storage.get(filename, {expires: 60});
        fetch(signedURL)
            .then(res => res.blob())
            .then(blob => {
                var a = document.createElement("a")
                a.href = window.URL.createObjectURL(blob)
                a.download = filename
                a.click()
                a.remove()
            })
            .catch((e) => {
                console.log("error download file", e)
            })
    }


    const downloadJson = async () => {
        const result = await Storage.get("SHEEP001.json", {download: true})
        result.Body.text().then(string => {
            const ctg = JSON.parse(string)
            sessionStorage.setItem("SHEEP001",string)
            console.log(ctg.fHR)
        })
    }


    return (
       <div>
            <Button
            variant={"contained"}
            color={"primary"}
            onClick={downloadJson}
        >Download Json</Button>
            <Button
            variant={"contained"}
            color={"primary"}
            onClick={() => {
                downloadImageBlob("STG063A_raw_ctg.png")
            }}
        >Download Image</Button>
       </div>
    )
}

export {TestDownloadS3}