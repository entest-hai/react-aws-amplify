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

const ctgAnnotateCanvasHeight = 600;

const CanvasPlotApp = () => {
    const scale = 1; 
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const classes = makeStyles(() => {
      return {
          root: {
              flexGrow: 1,
              overflow: "auto"
  
          },
          media: {
              height: ctgAnnotateCanvasHeight,
              overflow: "auto"
          }    
      }
  })()

    const init = () => {
        // get canvas 
        const canvas = document.getElementById("test_canvas");
        // double pixcel for high resolution screen retina
        canvas.width = window.innerWidth*2;
        canvas.height = window.innerHeight*2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        // set border and background color 
        canvas.style.border = `1px solid black`;
        canvas.style.background = '#c2e7ed';
        // get context 
        const context = canvas.getContext("2d");
        context.scale(2,2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 2; 
        contextRef.current = context;
    }

    useEffect(() => {
        init()
        return () => {
          console.log("unmount the canvas");
        }
    }, [])

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX*scale, offsetY*scale);
        setIsDrawing(true);
      };

      const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
      };

      const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
          return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX*scale, offsetY*scale);
        contextRef.current.stroke();
      };
    

    return (
      <Container maxWidth={"lg"}>
            <Card>
            <CardMedia className={classes.media}>
                <Paper style={{overflow:'auto'}} elevation={4}>
                <canvas
                  id={"test_canvas"}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={finishDrawing}>
                </canvas>
                </Paper>
            </CardMedia>
        </Card>
       </Container>
    );
}


export {CanvasPlotApp};