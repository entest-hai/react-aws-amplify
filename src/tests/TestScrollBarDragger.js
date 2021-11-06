import React, {useEffect} from "react";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

const ScrollBarDragger = (props) => {

    const classes = makeStyles((theme) => {
        return (
            {
                controllers: {
                   marginBottom:'8px',
                   position:"relative",
                   height:'40px'
                },
                fhrViewerScrollBar: {
                    position:"absolute",
                    right:0,
                    top:'9px',
                    left:'0px',
                    backgroundColor:"rgba(0,0,0,0.05)",
                    boxShadow:"inset 1px 1px 16px rgba(0,0,0,0.1)",
                    borderRadius:'10px',
                    display:"block",
                    height:'22px',
                    margin:0
                },
                scrollBarDraggerBar: {
                    backgroundColor: "#777",
                    boxShadow:"inset 1px 0 0 rgba(255,255,255,0.4), inset -1px 0 0 rgba(0,0,0,0.2)",
                    height:'18px',
                    margin:'2px',
                    position:"absolute",
                    width:"auto",
                    top:0,
                    bottom:0,
                    left:0,
                    right:0,
                    borderRadius:'8px'
                },
               scrollBarDragger: {
                    position:"absolute",
                    minWidth:'30px',
                    display:"block",
                    maxWidth:'100%',
                    left:'0px',
                    height:'100%',
                    cursor:"pointer",
                    zIndex:1
               }
            }
        )
    })()

    var currentX = 0

    const draggerMouseDown = (event) => {
        currentX = event.clientX
        console.log("dragger mouse down", currentX)
        event = event || window.event
        event.preventDefault()
        document.onmouseup = closeDragEelement
        document.onmousemove = elementDrag
    }

    const scrollBarMouseclick = (event) => {
        var scrollbar = document.getElementById("scrollbar")
        if(event.clientX+scrollbar.offsetWidth/2 < window.innerWidth){
            scrollbar.style.left = (event.clientX - scrollbar.offsetWidth/2) + 'px'
            console.log("scroll bar mouse click", scrollbar.offsetLeft)
            // redraw CTG
            if(props.setOffsetDraw){
                props.setOffsetDraw(scrollbar.offsetLeft)
            }
        }
        if(event.clientX+scrollbar.offsetWidth>window.innerWidth){
            scrollbar.style.left = window.innerWidth - scrollbar.offsetWidth + 'px'
            console.log("scroll bar mouse click", scrollbar.offsetLeft)
            // redraw CTG
            if (props.setOffsetDraw){
                props.setOffsetDraw(scrollbar.offsetLeft)
            }
        }
        if(event.clientX - scrollbar.offsetWidth/2 < 0){
            scrollbar.style.left='0px'
            console.log("scroll bar mouse click", scrollbar.offsetLeft)
            props.setOffsetDraw(0)
            // redraw CTG
        }
    }

    const elementDrag = (event) => {
        var scrollbar = document.getElementById("scrollbar")
        var dx = currentX - event.clientX
        currentX = event.clientX
        if((scrollbar.offsetLeft - dx + scrollbar.offsetWidth < window.innerWidth) && (scrollbar.offsetLeft-dx > 0)){
            scrollbar.style.left = (scrollbar.offsetLeft - dx) + 'px'
            // redraw CTG
            if (props.setOffsetDraw){
                props.setOffsetDraw(scrollbar.offsetLeft)
            }
        }
    }

    const closeDragEelement = (event) => {
        document.onmouseup = null
        document.onmousemove = null
    }

    return (
        <div className={classes.controllers}>
            <div
                className={classes.fhrViewerScrollBar}
                id={"dragger"}
                onMouseDown={scrollBarMouseclick}
            >
                <div
                    className={classes.scrollBarDragger}
                    style={{width: props.screenSizeToDataLenghth ?  props.screenSizeToDataLenghth.toString()+'%' : '20%'}}
                    id={"scrollbar"}
                    onMouseDown={draggerMouseDown}
                >
                    <div className={classes.scrollBarDraggerBar}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {ScrollBarDragger}