import React, {useEffect, useState, useRef} from "react";
import heartRateData from "../components/canvas/data";
import {makeStyles} from "@material-ui/core/styles";
import { Card, CardMedia, Container, Paper } from "@material-ui/core";
import {worker} from './SimpleWorker';
import WebWorker from "./workerSetup";

const ctgImageHeight = 550
const windowinnerWidth = 1920
const windowinnerHeight = 1080

const FHRLiveCanvas = (props) => {

    // canvas and context 
    var canvas;
    var ctx;

    // parameters for CTG paper
    const xOffset = props.position ? props.position.xOffset : 50;
    const yOffset = props.position ? props.position.yOffset : 50;
    const boxSize = 20;
    const heartRateMin = 30;
    const heartRateMax = 240;
    const heartRateStep = 10;
    const timeStep = 30;

    // counter 
    var counter = 0;
    // heart rate data state
    // const mHRIn = props.heartRate.mHR;
    // const fHRIn = props.heartRate.fHR;

    const [mHR, setmHR] = useState([]);
    const [fHR, setfHR] = useState([]);

    // interval of counter 
    let interval = useRef();

    // function to create CTG paper
    const createCTGPaper = (ctx) => {
        const numMinute = (Math.ceil(heartRateData.fHR.length / (5*4*60)) + 1) * 5 ;
        const numHorizontalLine = (heartRateMax-heartRateMin)/heartRateStep;
        const numVerticalLine = numMinute*2;
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
            ctx.fillRect(xOffset+20*10*i, yOffset, 20, numHorizontalLine*boxSize);
        }
         // mark 5 minutes
        ctx.font = "15px Arial";
        ctx.fillStyle = "red";
        for (var i = 0; i < numMinute/5+1; i++){
            ctx.fillText((i*5).toString(), xOffset+20*10*i, 20+yOffset+numHorizontalLine*boxSize);
        }
        // mark bpm stick
        ctx.fillStyle = "rgba(67, 153, 28, 0.2)";
        ctx.fillRect(xOffset-30, yOffset, 30, numHorizontalLine*boxSize);
        // mark 10bpm stick spacing
        ctx.font = "15px Arial";
        ctx.fillStyle = "red";
        for(var i = 0; i < 5; i++){
            ctx.fillText((30 + i*50).toString(), xOffset-30, yOffset+numHorizontalLine*boxSize-i*5*20);
            ctx.stroke();
        }
        // mart time stick
        ctx.fillStyle = "rgba(67, 153, 28, 0.2)";
        ctx.fillRect(xOffset, yOffset+numHorizontalLine*boxSize, boxSize*numVerticalLine, 30);

        // mark id and date time
        // let datetime = new Date();
        ctx.fillStyle = "black"
        ctx.fillText(Date().toString(), xOffset, yOffset+numHorizontalLine*boxSize+45)
    }

    // function to plot heart rate
    const plotHeartRate = (ctx) => {
        const numMinute = (Math.ceil(fHR.length / (5*4*60)) + 1) * 5 ;
        const numHorizontalLine = (heartRateMax-heartRateMin)/heartRateStep;
        const numVerticalLine = numMinute*2;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
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

    // const updateHeartRate = () => {
    //     interval = setInterval(() => {
    //         if (counter < 200) {
    //             console.log("update heart rate", counter);
    //             setmHR([...mHRIn.slice(1, counter*20)]);
    //             setfHR([...fHRIn.slice(1, counter*20)]);
    //             counter += 1;
    //         } else {
    //             console.log("clear timer");
    //             clearInterval(interval);
    //         }
    //     }, 1000)
    // }


    useEffect(() => {
       // get canvas and contextsc
        canvas = document.getElementById("ctg_canvas");
        ctx = canvas.getContext("2d");
        canvas.width = windowinnerWidth * 2;
        canvas.height = windowinnerHeight *2;
        canvas.style.width =  `${windowinnerWidth}px`;
        canvas.style.height = `${windowinnerHeight}px`;
        // TODO: scale for device screen size
        ctx.scale(2,2);
        ctx.translate(0.5, 0.5);
        createCTGPaper(ctx);
    }, [])

    useEffect(() => {
        canvas = document.getElementById("ctg_canvas");
        ctx = canvas.getContext("2d");
        plotHeartRate(ctx);
    }, [mHR, fHR])


    // useEffect(() => {
    //     updateHeartRate();
    //     return () => {
    //         console.log("unmount the ctg live");
    //         clearInterval(interval);
    //     }
    // },[])


    useEffect( async () => {
        const simpleWorker = new WebWorker(worker)
        simpleWorker.addEventListener('message', event => {
            console.log(event.data.mHR)
            // update heart rate 
            setmHR(mHR => [...mHR, ...event.data.mHR]);
            setfHR(fHR => [...fHR, ...event.data.fHR])
        })
      
    },[])

    return (
        <canvas id="ctg_canvas">
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
            console.log(event.data.mHR)
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
       <Container maxWidth={"lg"}>
            <Card>
            <CardMedia className={classes.media}>
                <Paper style={{overflow:'auto'}} elevation={4}>
                    <FHRLiveCanvas heartRate={heartRateData} position={{xOffset: 50, yOffset: 50}}></FHRLiveCanvas>
                </Paper>
            </CardMedia>
        </Card>
       </Container>
    )
}

export {TestWorkerView, TestWorkerView1}