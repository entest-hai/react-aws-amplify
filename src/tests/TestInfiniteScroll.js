import React from "react";
import {Waypoint} from "react-waypoint";
import {List, ListItem, Paper} from "@material-ui/core";

const TestInfiniteScroll = () => {

    const data = [
        {id: "100", name: "STG001", comment: "normal"},
        {id: "101", name: "STG001", comment: "normal"},
        {id: "102", name: "STG001", comment: "normal"},
        {id: "103", name: "STG001", comment: "normal"},
        {id: "104", name: "STG001", comment: "normal"},
        {id: "105", name: "STG001", comment: "normal"},
        {id: "106", name: "STG001", comment: "normal"},
        {id: "107", name: "STG001", comment: "normal"},
        {id: "108", name: "STG001", comment: "normal"},
        {id: "109", name: "STG001", comment: "normal"},
        {id: "110", name: "STG001", comment: "normal"},
        {id: "120", name: "STG001", comment: "normal"},
        {id: "130", name: "STG001", comment: "normal"},
        {id: "140", name: "STG001", comment: "normal"},
        {id: "150", name: "STG001", comment: "normal"},
        {id: "160", name: "STG001", comment: "normal"},
        {id: "170", name: "STG001", comment: "normal"},
        {id: "180", name: "STG001", comment: "normal"},
        {id: "190", name: "STG001", comment: "normal"},
        {id: "200", name: "STG001", comment: "normal"},
        {id: "201", name: "STG001", comment: "normal"},
        {id: "202", name: "STG001", comment: "normal"},
        {id: "203", name: "STG001", comment: "normal"},
        {id: "204", name: "STG001", comment: "normal"},
        {id: "205", name: "STG001", comment: "normal"},
        {id: "206", name: "STG001", comment: "normal"},
        {id: "207", name: "STG001", comment: "normal"},
        {id: "208", name: "STG001", comment: "normal"},
        {id: "209", name: "STG001", comment: "normal"},
        {id: "210", name: "STG001", comment: "normal"},
        {id: "220", name: "STG001", comment: "normal"},
        {id: "230", name: "STG001", comment: "normal"},
        {id: "240", name: "STG001", comment: "normal"},
        {id: "250", name: "STG001", comment: "normal"},
        {id: "260", name: "STG001", comment: "normal"},
        {id: "270", name: "STG001", comment: "normal"},
        {id: "280", name: "STG001", comment: "normal"},
        {id: "290", name: "STG001", comment: "normal"},
    ]

    return (
       <Paper style={{height:300, overflow:'auto'}}>
           <List>
               {data.map((record, index) => {
                  return (
                      <React.Fragment key={record.id}>
                        <ListItem>{record.id}</ListItem>
                          {
                              (index % 10 == 0)  && (
                                  <Waypoint onEnter={() => console.log(record.id, index)}></Waypoint>
                              )
                          }
                          <Waypoint onEnter={() => console.log(index)}></Waypoint>
                  </React.Fragment>
                  )
               })}
           </List>
       </Paper>
    )
}

export {TestInfiniteScroll}