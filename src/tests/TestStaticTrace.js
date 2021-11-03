//=====================================================================================================================
// Purpose: Route and init the entire app
// Author: TRAN MINH HAI
// Date: 03 NOV 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content
//********************************************************************************************************************/
// 001.   |  03 NOV 2021.     | TRAN MINH HAI      |
// - Add zoom in zoom out feature by calling setUpCanvasConfiguration and drawCtgPaper
//********************************************************************************************************************/
//=====================================================================================================================

import React, {useEffect, useState, useRef} from "react";
import heartRateData from "../components/canvas/data";
import {makeStyles} from "@material-ui/core/styles";
import { Card, CardMedia, Container, Paper } from "@material-ui/core";
import {worker} from './SimpleWorker';
import WebWorker from "./workerSetup";
import {FHRLiveCanvas} from "./TestWorkerView";
import Button from "@material-ui/core/Button";


const FHRStaticTrace = (props) => {
    // starting time of CTG data
    // new Date('2020-06-08 10:45:26')
    const startTimeStamp = new Date('2020-06-08 10:45:26')
    // canvas id number when there are multiple canvas
    const canvasId = props.id ? props.id : 0
    // canvas id string when there are multiple canvas
    const canvasIdString = "canvas_ctg" + canvasId.toString()
    // canvas and context
    var canvas;
    // canvas context
    var ctx;
    // CTG height in number of box
    const ctgHeightNumBox = 34
    // number of CTG row per screen
    const numCtgRowPerScreen = 2
    // height of a CTG canvas
    var canvasHeight = window.screen.height/numCtgRowPerScreen
    // xOffset top-left corner of the CTG canvas
    const xOffset = props.position ? props.position.xOffset : 40;
    // yOffset top-left corner of the CTG canvas
    const yOffset = props.position ? props.position.yOffset : 10;
    // default box size
    var defaultBoxSize = window.screen.height/(1.0 * numCtgRowPerScreen * ctgHeightNumBox)
    // default text size
    var defaultTextSize = Math.floor(window.screen.height/(2.0 * ctgHeightNumBox) * 0.9)
    // box size in pixel
    // var boxSize = window.screen.height/(1.0 * numCtgRowPerScreen * ctgHeightNumBox);
    // text size changes when CTG canvas size changes
    // var textSize = Math.floor(window.screen.height/(2.0 * ctgHeightNumBox) * 0.9)
    const [boxSize, setBoxSize] = useState(defaultBoxSize)
    const [textSize, setTextSize]  = useState(defaultTextSize)
    // minimum heart rate
    const heartRateMin = 30;
    // maximum heart rate
    const heartRateMax = 310;
    // heart rate minor step
    const heartRateStep = 10;
    // time step
    const timeStep = 30;
    // maternal heart rate array from props
    const mHR = props.heartRate.mHR ? props.heartRate.mHR : [];
    // fetal heart rate array from props
    const fHR = props.heartRate.fHR ? props.heartRate.fHR: [];
    // minimum CTG width is 60 minutes
    var numMinute = Math.ceil(fHR.length/(4*60)) > 120 ? Math.ceil(fHR.length/(4*60)) + 10: 120
    // window inner width proportional to number of minutes
    var canvasWidth = boxSize * numMinute * 2
    // function to setup ctgCanvasConfiguration
    const setUpCtgCanvas = (canvas, ctx) => {
        canvas.width = (boxSize * numMinute * 2) * 2;
        // setup canvas height
        canvas.height = (boxSize * ctgHeightNumBox) * 2;
        // setup canvas style width
        canvas.style.width =  `${boxSize * numMinute * 2}px`;
        // setup canvas style height
        canvas.style.height = `${boxSize * ctgHeightNumBox}px`;
        // scale for device screen size
        ctx.scale(2,2);
        ctx.translate(0.5, 0.5);
    }
    // function to create CTG paper
    const drawCtgPaper = (ctx) => {
        const numHorizontalLine = (heartRateMax-heartRateMin)/heartRateStep;
        const numVerticalLine =  numMinute*2;
        // Paths
        ctx.strokeStyle = "black"
        ctx.fillStyle = "red";
        ctx.lineWidth = 0.85;
        // bpm horizontal line
        for (var i = 0; i < numHorizontalLine+1; i++){
            ctx.beginPath();
            ctx.moveTo(xOffset, yOffset+boxSize*i);
            ctx.lineTo(xOffset+boxSize*numVerticalLine, yOffset+boxSize*i);
            ctx.stroke();
        }
        // minute line
        for (var i = 0; i < numVerticalLine+1; i++){
            ctx.beginPath();
            ctx.moveTo(xOffset+boxSize*i, yOffset);
            ctx.lineTo(xOffset+boxSize*i, yOffset+numHorizontalLine*boxSize);
            ctx.stroke();
        }
        // mark 5 minutes
        ctx.fillStyle = "rgba(50, 50, 168, 0.2)";
        for (var i = 0; i < numMinute/5; i++){
            ctx.fillRect(xOffset+boxSize*20*i, yOffset, boxSize, numHorizontalLine*boxSize);
        }
         // mark 5 minutes
        ctx.font =  textSize.toString() +  "px Arial";
        ctx.fillStyle = "black";
        for (var i = 0; i < numMinute/5+1; i++){
            let timeStampOffset = new Date(startTimeStamp.getTime() + i * 10 * 60 * 1000)
            ctx.fillText(timeStampOffset.toLocaleTimeString(), xOffset+boxSize*20*i, textSize+yOffset+numHorizontalLine*boxSize);
        }
        // mark bpm stick
        ctx.fillStyle = "rgba(67, 153, 28, 0.2)";
        // ctx.fillRect(xOffset-boxSize, yOffset, boxSize, numHorizontalLine*boxSize);
        // mark 10bpm stick spacing
        ctx.font = textSize.toString() + "px Arial";
        ctx.fillStyle = "red";
        for (var j = 0; j < numMinute/5 + 1; j++){
            if (j == 0){
                for(var i = 0; i < heartRateMax/50; i++){
                    ctx.fillText((30 + i*50).toString(), xOffset+boxSize*20*j-textSize*0, yOffset+numHorizontalLine*boxSize-i*5*boxSize);
                    ctx.stroke();
                }
            } else {
                for(var i = 0; i < heartRateMax/50; i++){
                    ctx.fillText((30 + i*50).toString(), xOffset+boxSize*20*j-textSize*0, yOffset+numHorizontalLine*boxSize-i*5*boxSize);
                    ctx.stroke();
                }
            }
        }
        // mart time stick
        ctx.fillStyle = "rgba(67, 153, 28, 0.2)";
        // ctx.fillRect(xOffset, yOffset+numHorizontalLine*boxSize, boxSize*numVerticalLine, boxSize);

        // mark id and date time
        // let datetime = new Date();
        ctx.fillStyle = "black"
        ctx.fillText(Date().toString(), xOffset, yOffset+numHorizontalLine*boxSize+textSize*3)
    }

    // function to plot heart rate
    const drawCtgData = (ctx) => {
        const numMinute = (Math.ceil(fHR.length / (5*4*60)) + 1) * 5 ;
        const numHorizontalLine = (heartRateMax-heartRateMin)/heartRateStep;
        const numVerticalLine = numMinute*2;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        for (var i = 0; i < fHR.length - 1; i++){
            let currentX = (i*0.25*boxSize)/(timeStep);
            let currentY = ((fHR[i]-30)*boxSize)/heartRateStep;
            let nextX = ((i+1)*0.25*boxSize)/(timeStep);
            let nextY = ((fHR[i+1]-30)*boxSize)/heartRateStep;
            ctx.moveTo(xOffset+currentX,yOffset + numHorizontalLine*boxSize - currentY);
            ctx.lineTo(xOffset+nextX, yOffset + numHorizontalLine*boxSize - nextY);
        }
         ctx.stroke();
        //mHR
        ctx.beginPath();
        ctx.strokeStyle = "black";
        for (var i = 0; i < mHR.length - 1; i++){
            let currentX = (i*0.25*boxSize)/(timeStep);
            let currentY = ((mHR[i]-30)*boxSize)/heartRateStep;
            let nextX = ((i+1)*0.25*boxSize)/(timeStep);
            let nextY = ((mHR[i+1]-30)*boxSize)/heartRateStep;
            ctx.moveTo(xOffset+currentX,yOffset + numHorizontalLine*boxSize - currentY);
            ctx.lineTo(xOffset+nextX, yOffset + numHorizontalLine*boxSize - nextY);
        }
        ctx.stroke();
    }

    useEffect(() => {
        canvas = document.getElementById(canvasIdString);
        ctx = canvas.getContext("2d");
        setUpCtgCanvas(canvas, ctx)
    },[])

    useEffect(() => {
        canvas = document.getElementById(canvasIdString);
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setUpCtgCanvas(canvas, ctx)
        drawCtgPaper(ctx)
        drawCtgData(ctx)
    }, [boxSize, textSize])

    return (
        <div>
            <canvas id={canvasIdString}>
                Canvas
            </canvas>
            <Button
                onClick={() => {
                    setBoxSize(0.9*boxSize)
                    setTextSize(0.9*textSize)
                }}
            >
                Zoom In
            </Button>
            <Button
                onClick={() => {
                    setBoxSize(defaultBoxSize)
                    setTextSize(defaultTextSize)
                }}
            >
                Default
            </Button>
        </div>
    )
}

const TestFHRStaticTrace = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [heartRate, setHeartRate] = useState({mHR:[], fHR:[]})
    useEffect(async () => {
        fetch("db.json")
            .then(response => response.json())
            .then(json => {
                let heartRate = json["sheep001"]
                let mHR = heartRate.mHR
                let fHR = heartRate.fHR
                for (var i = 0; i < mHR.length; i++){
                    if (mHR[i] == null){
                        mHR[i] = Number.NaN
                    }
                    if (fHR[i] == null){
                        fHR[i] = Number.NaN
                    }
                }
                setHeartRate({mHR: mHR, fHR: fHR})
                setIsFetching(true)
            })
    }, [heartRate])

    return (
            <Paper style={{overflow:'hidden', overflowX:'scroll', margin: 50}} elevation={4}>
                {isFetching ? <FHRStaticTrace heartRate={heartRate}></FHRStaticTrace> : null}
            </Paper>
    )
}
export {FHRStaticTrace, TestFHRStaticTrace}