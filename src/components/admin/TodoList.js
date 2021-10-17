import {Datagrid, List, TextField} from "react-admin";
import React from "react";

const TodoList = (props) => {
    // console.log(props)
    return (
    <List {...props}>
      <Datagrid>
        <TextField source={"id"}></TextField>
        <TextField source={"name"}></TextField>
        <TextField source={"description"}></TextField>
      </Datagrid>
    </List>
  );
}


export {TodoList};