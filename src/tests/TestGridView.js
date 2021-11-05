import React from "react";
import {Box, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {TestWorkerView} from "./TestWorkerView";
import {FHRLiveCanvas} from "./TestWorkerView";
import {CtgImageViewer} from "../components/ctg/CtgImageViewer";

const TestGridView = () => {
    return (
       <Box sx={{flexGrow: 1, marginLeft:30, marginRight:30, marginTop:30}}>
           <Grid container spacing={1}>
               {Array.from(Array(16)).map((_,index) => (
                   <Grid item md={12} lg={3} key={index}>
                       <Paper style={{height:(window.screen.height-200)/4.0, overflow:'auto', elevation:10, padding:0}}>
                           <FHRLiveCanvas id={index}></FHRLiveCanvas>
                       </Paper>
                   </Grid>
               ))}
           </Grid>
       </Box>
    )
}

export {TestGridView}