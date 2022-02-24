import React, {useEffect, useState, useRef} from "react";
import heartRateData from "../components/canvas/data";
import makeStyles from '@mui/styles/makeStyles';
import { Card, CardMedia, Container, Paper } from "@mui/material";
import {worker} from './SimpleWorker';
import WebWorker from "./workerSetup";
const ctgImageHeight = 550
const FHRLiveCanvas = (props) => {
    // ctg id
    const ctgId = props.ctgId ? props.ctgId : "1234567"
    // starting time of CTG data
    const startTimeStamp = new Date('2020-06-08 10:45:26'.replace(/-/g, "/"))
    // heart rate line width
    const heartRateLineWidth = props.heartRateLineWidth ? props.heartRateLineWidth : 0.5
    const canvasId = props.id ? props.id : 0
    const canvasIdString = "canvas_ctg" + canvasId.toString()
    // canvas and context 
    var canvas;
    var ctx;
    // parameters for CTG paper
    const ctgHeightNumBox = props.ctgHeigthNumBox ? props.ctgHeigthNumBox : 30
    // number of ctg row per screen
    const numCtgRowPerScreen = props.numCtgRowPerScreen ? props.numCtgRowPerScreen : 4
    // xOffset top-left corner of the CTG canvas
    const xOffset = props.xOffset ? props.xOffset : 0;
    // yOffset top-left corner of the CTG canvas
    const yOffset = props.yOffset ? props.yOffset : 0;
    // default box size
    var defaultBoxSize = (window.screen.height-110)/(1.0 * numCtgRowPerScreen * ctgHeightNumBox)
    // default text size
    var defaultTextSize = Math.floor(window.screen.height/(2.0 * ctgHeightNumBox) * 0.8)
    const boxSize = defaultBoxSize;
    const textSize = defaultTextSize
    const heartRateMin = 20;
    const heartRateMax = 280;
    const heartRateStep = 10;
    const timeStep = 30;
    const numMinute = 120
    // heart rate data state
    const [mHR, setmHR] = useState([]);
    const [fHR, setfHR] = useState([]);
    // interval of counter 
    let interval = useRef();
    // counter
    var counter = 0;

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
    const createCTGPaper = (ctx) => {
        const numHorizontalLine = (heartRateMax-heartRateMin)/heartRateStep;
        const numVerticalLine = numMinute*2;
        // mark fetal heart rate region 100 to 200 bpm
        ctx.fillStyle = "rgba(252, 215, 227, 0.5)";
        ctx.fillRect(xOffset,yOffset+boxSize*(heartRateMax-200)/10,boxSize*numVerticalLine,boxSize*10)
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
         ctx.fillStyle = "rgba(33, 246, 30, 0.2)";
        for (var i = 0; i < numMinute/10; i++){
            ctx.fillRect(xOffset+boxSize*20*i, yOffset, boxSize*2, numHorizontalLine*boxSize);
        }
         // mark 10 minutes
        ctx.font =  textSize.toString() +  "px Arial";
        ctx.fillStyle = "black";
        for (var i = 0; i < numMinute/5+1; i++){
            let timeStampOffset = new Date(startTimeStamp.getTime() + i * 10 * 60 * 1000)
            ctx.fillText(timeStampOffset.toLocaleTimeString(), xOffset+boxSize*20*i, textSize+yOffset+numHorizontalLine*boxSize);
        }
        // mark bpm stick
        ctx.fillStyle = "rgba(67, 153, 28, 0.2)";
        // mark 10bpm stick spacing
        ctx.font = textSize.toString() + "px Arial";
        ctx.fillStyle = "red";
        for (var j = 0; j < numMinute/5 + 1; j++){
            for (var i = 0; i < heartRateMax/50; i++){
                ctx.fillText((50 + i*50).toString(), xOffset+boxSize*20*j-textSize*0, yOffset+numHorizontalLine*boxSize-i*5*boxSize-(50-heartRateMin)/10*boxSize);
                ctx.stroke();
            }
        }
        // mart time stick
        ctx.fillStyle = "rgba(67, 153, 28, 0.2)";
        // mark id and date time
        ctx.fillStyle = "black"
        ctx.fillText(Date().toString() + " ID: " + ctgId, xOffset, yOffset+numHorizontalLine*boxSize+textSize*3)
    }

    // function to plot heart rate
    const plotHeartRate = (ctx) => {
        const numMinute = (Math.ceil(fHR.length / (5*4*60)) + 1) * 5 ;
        const numHorizontalLine = (heartRateMax-heartRateMin)/heartRateStep;
        const numVerticalLine = numMinute*2;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = heartRateLineWidth;
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

    // timer 
    const updateHeartRate = () => {
        interval = setInterval(() => {
            if (counter < 200) {
                console.log("update heart rate", counter);
                setmHR([...heartRateData.mHR.slice(1, counter*20)]);
                setfHR([...heartRateData.fHR.slice(1, counter*20)]);
                counter += 1;
            } else {
                console.log("clear timer");
                clearInterval(interval);
            }
        }, 1000)
    }

    useEffect(() => {
        canvas = document.getElementById(canvasIdString);
        ctx = canvas.getContext("2d");
        setUpCtgCanvas(canvas, ctx)
        createCTGPaper(ctx);
    }, [])

    useEffect(() => {
        canvas = document.getElementById(canvasIdString);
        ctx = canvas.getContext("2d");
        plotHeartRate(ctx);
    }, [mHR, fHR])

    useEffect(() => {
        updateHeartRate();
        return () => {
            console.log("unmount the ctg live");
            clearInterval(interval);
        }
    },[])

    // useEffect( async () => {
    //     const simpleWorker = new WebWorker(worker)
    //     simpleWorker.addEventListener('message', event => {
    //         // console.log(event.data.mHR)
    //         // update heart rate
    //         setmHR(mHR => [...mHR, ...event.data.mHR]);
    //         setfHR(fHR => [...fHR, ...event.data.fHR])
    //     })

    // },[])

    return (
        <canvas id={canvasIdString}>
            Canvas
        </canvas>
    )
}

const TestWorkerView1 = () => {
    const [mHR, setmHR] = useState([]);
    const [fHR, setfHR] = useState([]);
    useEffect( async () => {
        const simpleWorker = new WebWorker(worker)
        simpleWorker.addEventListener('message', event => {
            // console.log(event.data.mHR)
            // update heart rate
            setmHR(mHR => [...mHR, ...event.data.mHR]);
            setfHR(fHR => [...fHR, ...event.data.fHR])
        })
    },[])

    return (
        <div>
            <h1>mHR length: {mHR.length} fHR length: {fHR.length}</h1>
        </div>
    )
}

const TestWorkerView = () => {
    const classes = makeStyles(() => {
        return {
            root: {
                flexGrow: 1,
                overflow: "auto"
            },
            media: {
                height: ctgImageHeight,
                overflow: "auto"
            }    
        }
    })()

    return (
       <Paper style={{overflow:'auto', elevation:10, padding:0, margin:10}}>
           <FHRLiveCanvas heartRateLineWidth={1} numCtgRowPerScreen={2} ctgHeightNumBox={31} xOffset={0} yOffset={0}></FHRLiveCanvas>
       </Paper>
    )
}

export {TestWorkerView, TestWorkerView1, FHRLiveCanvas}