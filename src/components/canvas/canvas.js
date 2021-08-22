// import React from 'react';
// import { useEffect, useRef, useState } from 'react';

// const Canvas = () => {

//     const canvasRef = useRef(null);
//     const contextRef = useRef(null);
//     const [isDrawing, setIsDrawing] = useState(false);

//     useEffect(() => {
//         console.log(window.innerWidth, window.innerHeight);
//         const canvas = canvasRef.current;
//         // double pixcel for high resolution screen retina
//         canvas.width = window.innerWidth * 2;
//         canvas.height = window.innerHeight *2;
//         canvas.style.width =  `${window.innerWidth}px`;
//         canvas.style.height = `${window.innerHeight}px`;

//         const context = canvas.getContext("2d");
//         context.scale(2,2);
//         context.lineCap = "round";
//         context.strokeStyle = "black";
//         context.lineWidth = 5; 
//         contextRef.current = context;

//     }, [])

//     const startDrawing = ({ nativeEvent }) => {
//         const { offsetX, offsetY } = nativeEvent;
//         contextRef.current.beginPath();
//         contextRef.current.moveTo(offsetX, offsetY);
//         setIsDrawing(true);
//       };

//       const finishDrawing = () => {
//         contextRef.current.closePath();
//         setIsDrawing(false);
//       };

//       const draw = ({ nativeEvent }) => {
//         if (!isDrawing) {
//           return;
//         }
//         const { offsetX, offsetY } = nativeEvent;
//         contextRef.current.lineTo(offsetX, offsetY);
//         contextRef.current.stroke();
//       };
    

//     return (
//         <canvas
//             onMouseDown={startDrawing}
//             onMouseMove={draw}
//             onMouseUp={finishDrawing}
//             ref={canvasRef}>
//         </canvas>
//     );
// }


// export {Canvas};