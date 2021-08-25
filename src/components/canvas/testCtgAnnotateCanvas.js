//=====================================================================================================================
// Purpose: A canvas based view to help doctors annotate things, comments on the CTG digital images
// Author: TRAN MINH HAI 
// Date: 20 AUG 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content 
//********************************************************************************************************************/
// 001.   |  23 AUG 2021.     | TRAN MINH HAI      | - Refactor and add header 
//=====================================================================================================================
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { Card, CardMedia, Container, Paper } from "@material-ui/core";

const ctgAnnotateCanvasHeight = 700;

const TestCtgAnnotateCanvas = () => {
    //
    let isDrawingAnnotate = false; 
    let xStart = 0;
    let yStart = 0; 
    let annotateColor = "#fab6b1";
    let annotateOpacity = 0.4;

    const scale = 1; 
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [xS, setXS] = useState(0)
    const [yS, setYS] = useState(0)

    const classes = makeStyles(() => {
      return {
          root: {
              position: 'relative'
          },
          media: {
              height: ctgAnnotateCanvasHeight,
              overflow: "auto"
          },
          annotateCanvas: {
              position: 'absolute',
              top:0,
              left:0,
              zIndex: 1,
              border: '1px solid black'
          },
          ctgCanvas: {
              position: 'absolute',
              top:0,
              left: 0,
              zIndex: 0,
          },
          image: {
              display: "none"
          }

      }
  })()

    function drawImage(){
        console.log("draw image")
        const image =document.getElementById("ctgImage123");
        const ctgcanvas = document.getElementById("ctgcanvas")
        const ctgcontext = ctgcanvas.getContext("2d")
        // setup retina
        ctgcanvas.width = 3000*2;
        ctgcanvas.height = 700*2;
        // setup 
        ctgcanvas.style.width = "3000px";
        ctgcanvas.style.height = "700px";
        ctgcontext.scale(2,2);
        ctgcontext.drawImage(image,0,0,image.width,image.height)
    }

    const init = () => {
        // get canvas 
        const canvas = document.getElementById("test_canvas");
        // double pixcel for high resolution screen retina
        canvas.width = 3000*2;
        canvas.height = 700*2;
        // setup 
        canvas.style.width = "3000px";
        canvas.style.height = "700px";
        // get context 
        const context = canvas.getContext("2d");
        context.scale(2,2);
        // 
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 2; 
        contextRef.current = context;
        // detect mouse down 
        // canvas.addEventListener("mousedown", e =>{
        //     // init left-corner 
        //     xStart = e.offsetX;
        //     yStart = e.offsetY; 
        //     isDrawingAnnotate = true; 
        // })
        //  // detect mousemove 
        //  canvas.addEventListener("mousemove", e => {
        //     if (isDrawingAnnotate === true){
        //         // clean rect 
        //         // context.clearRect(0,0,canvas.width,canvas.height);
        //         // fill rect 
        //         context.fillStyle = annotateColor;
        //         context.globalAlpha = annotateOpacity
        //         // context.fillRect(xStart,yStart,e.clientX-xStart,e.clientY-yStart);
        //     }
        // })
        // // detect mouse up 
        // window.addEventListener("mouseup", e => {
        //     if (isDrawingAnnotate === true) {
        //         context.clearRect(0,0,canvas.width,canvas.height);
        //         isDrawingAnnotate = false; 
        //     }
        // })
    }

    useEffect(() => {
        init()
        return () => {
          console.log("unmount the canvas");
        }
    }, [])

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setXS(offsetX)
        setYS(offsetY)
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX*scale, offsetY*scale);
        setIsDrawing(true);
      };

      const finishDrawing = () => {
        contextRef.current.closePath();
        contextRef.current.clearRect(0,0,contextRef.current.canvas.width,contextRef.current.canvas.height);
        setIsDrawing(false);
      };

      const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
          return;
        }
        const { offsetX, offsetY } = nativeEvent;
        // plot line 
        contextRef.current.lineTo(offsetX*scale, offsetY*scale);
        contextRef.current.stroke();
        // mark rect
        contextRef.current.clearRect(0,0,contextRef.current.canvas.width,contextRef.current.canvas.height);
        contextRef.current.fillStyle = annotateColor;
        contextRef.current.globalAlpha = annotateOpacity;
        contextRef.current.fillRect(xS,yS,offsetX-xS,offsetY-yS);
      };
    

    return (
      <div className={classes.root}>
          <img
            id={"ctgImage123"}
            src={process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png"}
            onLoad={
                drawImage
            }
            className={classes.image}
        ></img>
        <canvas
            className={classes.annotateCanvas}
            id={"test_canvas"}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={finishDrawing}
        >
        </canvas>
        <canvas
            className={classes.ctgCanvas}
            id={"ctgcanvas"}>
        </canvas>
      </div>
    );
}


export {TestCtgAnnotateCanvas};