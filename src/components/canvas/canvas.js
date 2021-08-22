import React from 'react';
import { useEffect, useRef, useState } from 'react';

const CanvasPlotApp = () => {

    const scale = 1; 
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

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
        context.lineWidth = 5; 
        contextRef.current = context;
    }

    useEffect(() => {
        init()
        window.addEventListener('resize', function(){
            init()
        })
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
        console.log(nativeEvent);
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX*scale, offsetY*scale);
        contextRef.current.stroke();
      };
    

    return (
        <canvas
            id={"test_canvas"}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={finishDrawing}>
        </canvas>
    );
}




export {CanvasPlotApp};