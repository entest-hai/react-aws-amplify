import React from "react";
import MUIDataTable from "mui-datatables";
import {Paper} from "@mui/material";
import Box from "@mui/material/Box";

const TestMuiDataTable = () => {
    const columns = ["Name", "Company", "City", "State"];
    const data = [...Array(50).keys()].map((num,index)=>{
        return ["Joe James", "Test Corp", "Yonkers", "NY"]
    });
    const options = {
        filterType: 'checkbox',
        pagination: false
    };

    return (
         <div>
             <Box style={{height:500, backgroundColor:'blue', width:'100%'}}></Box>
             <Paper style={{height: window.innerHeight - 500, overflow: 'auto'}}>
                <MUIDataTable
                  title={"Employee List"}
                  data={data}
                  columns={columns}
                  options={options}
                />
            </Paper>
         </div>
    )
}

export {TestMuiDataTable}

// 'calc(100vh - 500px)'