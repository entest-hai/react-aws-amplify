import {Datagrid, List, TextField} from "react-admin";
import React from "react";

const HeartRateList = (props) => {
    // console.log(props)
    return (
    <List {...props}>
      <Datagrid>
        <TextField source={"id"}></TextField>
      </Datagrid>
    </List>
  );
}


export {HeartRateList};