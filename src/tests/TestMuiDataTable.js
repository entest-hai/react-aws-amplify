import React from "react";
import MUIDataTable from "mui-datatables";
import {Paper} from "@mui/material";
import Box from "@mui/material/Box";

const TestMuiDataTable = () => {
    const columns = ["Index", "Name", "Company", "City", "State"];
    const data = [...Array(100).keys()].map((num,index)=>{
        return [index, "Joe James", "Test Corp", "Yonkers", "NY"]
    });
    const options = {
        filterType: 'checkbox',
        pagination: false,
        tableBodyHeight:'50vh',
        setTableProps: () => {
            return {
                padding: 'none',
                size: 'small'
            }
        }
    };

    return (
         <div>
            <MUIDataTable
              title={"Employee List"}
              data={data}
              columns={columns}
              options={options}
            />
         </div>
    )
}

export {TestMuiDataTable}
// 0.90*window.innerHeight.toString()+'px'
