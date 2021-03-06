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
import React, {useEffect, useState} from "react";
import {ScrollBarDragger} from "../../tests/TestScrollBarDragger";
import {worker} from "../../tests/SimpleWorker";

const CtgStaticCanvasViewer = (props) => {
    // starting time of CTG data
    // new Date('2020-06-08 10:45:26')
    const startTimeStamp = new Date('2020-06-08 10:45:26'.replace(/-/g, "/"))
    // canvas id number when there are multiple canvas
    const canvasId = props.id ? props.id : 0
    // canvas id string when there are multiple canvas
    const canvasIdString = "canvas_ctg" + canvasId.toString()
    // canvas and context
    var canvas;
    // canvas context
    var ctx;
    // CTG height in number of box
    const ctgHeightNumBox = 33
    // number of CTG row per screen
    const numCtgRowPerScreen = props.numCtgRowPerScreen ? props.numCtgRowPerScreen : 2.5
    // xOffset top-left corner of the CTG canvas
    const xOffset = props.position ? props.position.xOffset : 10;
    // yOffset top-left corner of the CTG canvas
    const yOffset = props.position ? props.position.yOffset : 10;
    // default box size
    var defaultBoxSize = window.screen.height/(1.0 * numCtgRowPerScreen * ctgHeightNumBox)
    // default text size
    var defaultTextSize = Math.floor(window.screen.height/(2.0 * ctgHeightNumBox) * 0.9)
    // set box size and change when zoom in
    const [boxSize, setBoxSize] = useState(defaultBoxSize)
    // set text size and change when zoom in
    const [textSize, setTextSize]  = useState(defaultTextSize)
    // offset to plot
    const [offsetDraw, setOffsetDraw] = useState(0)
    // number of heart rate per screen or buffer screen size
    var numMinute = Math.floor(window.screen.width / (2.0 * boxSize))
    // minimum heart rate
    const heartRateMin = 20;
    // maximum heart rate
    const heartRateMax = 290;
    // heart rate minor step
    const heartRateStep = 10;
    // time step
    const timeStep = 30;
    // maternal heart rate array from props
    const mHR = props.heartRate.mHR ? props.heartRate.mHR : [];
    // fetal heart rate array from props
    const fHR = props.heartRate.fHR ? props.heartRate.fHR: [];
    // ctg id
    const ctgId = props.ctgId ? props.ctgId : "UNKNOWN"
    // data length in minute
    const ctgDataInMinute = props.heartRate.fHR ? props.heartRate.fHR.length/(4*60) : numMinute
    // ratio between screen size and data length
    const screenSizeToDataLenghth = numMinute/ctgDataInMinute*100.0
    // convert scroll bar offset to heart rate offset
    const convertScrollBarOffsetToHeartRateOffset = (scrollBarOffset) => {
        return parseInt(scrollBarOffset/window.innerWidth*props.heartRate.fHR.length)
    }

    const convertScrollBarOffsetToPixelOffsetOneBox = (scrollBarOffset) => {
        return (Math.floor(1.0*convertScrollBarOffsetToHeartRateOffset(scrollBarOffset)/120)*120 - convertScrollBarOffsetToHeartRateOffset(scrollBarOffset))/120.0*boxSize
    }

    const convertScrollBarOffsetToPixelOffsetTenMinuteBlock = (scrollBarOffset) => {
        return (Math.floor(1.0*convertScrollBarOffsetToHeartRateOffset(scrollBarOffset)/(10*60*4))*(10*60*4) - convertScrollBarOffsetToHeartRateOffset(scrollBarOffset))/120.0*boxSize
    }

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
        // mark fetal heart rate region 100 to 200 bpm
        ctx.fillStyle = "rgba(252, 215, 227, 0.5)";
        ctx.fillRect(xOffset,yOffset+boxSize*(heartRateMax-200)/10,boxSize*numVerticalLine,boxSize*10)
        // Paths
        ctx.strokeStyle = "black"
        ctx.fillStyle = "red";
        ctx.lineWidth = 0.85;
        // bpm horizontal line
        var scrollBarOffsetInPixel =  convertScrollBarOffsetToPixelOffsetOneBox(offsetDraw)
        for (var i = 0; i < numHorizontalLine+1; i++){
            ctx.beginPath();
            ctx.moveTo(xOffset, yOffset+boxSize*i);
            ctx.lineTo(xOffset+boxSize*numVerticalLine, yOffset+boxSize*i);
            ctx.stroke();
        }
        // vertical line 0.5 minute
        for (var i = 0; i < numVerticalLine+1; i++){
            ctx.beginPath();
            ctx.moveTo(xOffset+scrollBarOffsetInPixel+boxSize*i, yOffset);
            ctx.lineTo(xOffset+scrollBarOffsetInPixel+boxSize*i, yOffset+numHorizontalLine*boxSize);
            ctx.stroke();
        }
        // rect box mark 10 minute block
        scrollBarOffsetInPixel =convertScrollBarOffsetToPixelOffsetTenMinuteBlock(offsetDraw)
        // ctx.fillStyle = "rgba(50, 50, 168, 0.2)";
        ctx.fillStyle = "rgba(33, 246, 30, 0.2)";
        for (var i = 0; i < numMinute/5; i++){
            ctx.fillRect(xOffset+scrollBarOffsetInPixel+boxSize*20*i, yOffset, boxSize*2, numHorizontalLine*boxSize);
        }
        // time stamp for each 10 minute block
        ctx.font =  textSize.toString() +  "px Arial";
        ctx.fillStyle = "black";
        for (var i = 0; i < numMinute/5+1; i++){
            let timeStampOffset = new Date(startTimeStamp.getTime() + convertScrollBarOffsetToHeartRateOffset(offsetDraw)*250 + i * 10 * 60 * 1000)
            ctx.fillText(timeStampOffset.toLocaleTimeString(), xOffset+scrollBarOffsetInPixel+boxSize*20*i, textSize+yOffset+numHorizontalLine*boxSize);
        }
        // mark bpm stick
        ctx.fillStyle = "rgba(67, 153, 28, 0.2)";
        // mark bpm stick for each 10 minutes block
        ctx.font = textSize.toString() + "px Arial";
        ctx.fillStyle = "red";
        for (var j = 0; j < numMinute/5 + 1; j++){
            if (j == 0){
                for(var i = 0; i < heartRateMax/50; i++){
                    ctx.fillText((50 + i*50).toString(), xOffset+scrollBarOffsetInPixel+boxSize*20*j-textSize*0, yOffset+numHorizontalLine*boxSize-i*5*boxSize-(50-heartRateMin)/10*boxSize);
                    ctx.stroke();
                }
            } else {
                for(var i = 0; i < heartRateMax/50; i++){
                    ctx.fillText((50 + i*50).toString(), xOffset+scrollBarOffsetInPixel+boxSize*20*j-textSize*0, yOffset+numHorizontalLine*boxSize-i*5*boxSize-(50-heartRateMin)/10*boxSize);
                    ctx.stroke();
                }
            }
        }        // let datetime = new Date();
        ctx.fillStyle = "black"
        ctx.fillText(Date().toString() + " offset: " + convertScrollBarOffsetToHeartRateOffset(offsetDraw).toString() + " ID: "  + ctgId, xOffset, yOffset+numHorizontalLine*boxSize+textSize*3)
    }

    // function to plot heart rate
    const drawCtgData = (ctx) => {
        let offsetDrawInNumHeartRate = convertScrollBarOffsetToHeartRateOffset(offsetDraw)
        let mHRBuffer = []
        let fHRBuffer = []
        // check bound condition
        if (offsetDrawInNumHeartRate + numMinute <= mHR.length){
            mHRBuffer = mHR.slice(offsetDrawInNumHeartRate, offsetDrawInNumHeartRate + numMinute * 4 * 60)
        } else {
            mHRBuffer = mHR.slice(offsetDrawInNumHeartRate)
        }
        if(offsetDrawInNumHeartRate + numMinute <= fHR.length){
            fHRBuffer = fHR.slice(offsetDrawInNumHeartRate, offsetDrawInNumHeartRate + numMinute * 4 * 60)
        } else {
            fHRBuffer = fHR.slice(offsetDrawInNumHeartRate)
        }
        const numHorizontalLine = (heartRateMax-heartRateMin)/heartRateStep;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        for (var i = 0; i < fHRBuffer.length - 1; i++){
            if (Number.isNaN(fHRBuffer[i]) || Number.isNaN(fHRBuffer[i+1])){

            } else {
                let currentX = (i*0.25*boxSize)/(timeStep);
                let currentY = ((fHRBuffer[i]-30)*boxSize)/heartRateStep;
                let nextX = ((i+1)*0.25*boxSize)/(timeStep);
                let nextY = ((fHRBuffer[i+1]-30)*boxSize)/heartRateStep;
                ctx.moveTo(xOffset+currentX,yOffset + numHorizontalLine*boxSize - currentY);
                ctx.lineTo(xOffset+nextX, yOffset + numHorizontalLine*boxSize - nextY);
            }

        }
         ctx.stroke();
        //mHR
        ctx.beginPath();
        ctx.strokeStyle = "black";
        for (var i = 0; i < mHRBuffer.length - 1; i++){
            if (Number.isNaN(mHRBuffer[i]) || Number.isNaN(mHRBuffer[i+1])){

            } else {
                let currentX = (i*0.25*boxSize)/(timeStep);
                let currentY = ((mHRBuffer[i]-30)*boxSize)/heartRateStep;
                let nextX = ((i+1)*0.25*boxSize)/(timeStep);
                let nextY = ((mHRBuffer[i+1]-30)*boxSize)/heartRateStep;
                ctx.moveTo(xOffset+currentX,yOffset + numHorizontalLine*boxSize - currentY);
                ctx.lineTo(xOffset+nextX, yOffset + numHorizontalLine*boxSize - nextY);
            }
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
    }, [boxSize, textSize, offsetDraw, mHR, fHR])

    return (
        <div>
            <canvas id={canvasIdString}>
                Canvas
            </canvas>
            <ScrollBarDragger
                setOffsetDraw={setOffsetDraw}
                screenSizeToDataLenghth={screenSizeToDataLenghth}>
            </ScrollBarDragger>
        </div>
    )
}

export {CtgStaticCanvasViewer}
