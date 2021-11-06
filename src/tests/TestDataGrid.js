import React, {useEffect, useState} from "react";
import {UserSessionService} from "../services/UserSessionService";
import {API} from "aws-amplify";
import {DataGrid, GridToolbarExport} from "@mui/x-data-grid";

const CtgGridTableTest = ()  => {
    const listCtgNumericalsByDoctorID = `
        query ListCtgNumericalsByDoctorID(
            $filter: ModelCtgNumericalFilterInput
            $limit: Int
            $nextToken: String
        ) {
          listCtgNumericals(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
              id
              comment
              ctgJsonUrl
              ctgUrl
              doctorID
              hospitalID
              patientID
              sessionTime
              createdTime
            }
            nextToken
          }
    }
`;

    const [rows, setRows] = useState([])

    const columns = [
        {field: 'index', headerName: 'Index', width: 150},
        {field: 'id', headerName: "ID", width: 400},
        {field: 'name', headerName: 'Name', width: 200},
        {field: 'createdTime', headerName: "Created Time", width: 200},
        {field: 'length', headerName: "Length in Minute", width: 200},
        {field: 'comment', headerName: "Comments", width: 400}
    ]

    const createRow = (index, id, name, createdTime, length, comment) => {
        return {index, id, name, createdTime, length, comment}
    }

    const dateTimeToString = (time) => {
        let obj = new Date(time)
        return obj.toLocaleDateString() + "-" + obj.toLocaleTimeString()
    }

    const buildRows = (records) => {
        let recordRows = records.map((record, index) => {
            let name = record.ctgJsonUrl ? record.ctgJsonUrl : "UNKNOWN"
            let createdTime = record.createdTime ? dateTimeToString(record.createdTime) : "UNKNOWN"
            let comment = record.comment? record.comment : "UNKNOWN"
            let length = record.length? record.length: "UNKNOWN"
            return (
                createRow(index, record.id, name,  createdTime, length, comment)
            )
        })
        setRows(recordRows)
    }

    useEffect(async () => {
        let isMounted = true
        await UserSessionService.getUserSession()
        let filter = {
            doctorID: {
                eq: sessionStorage.getItem('doctorID') ? sessionStorage.getItem("doctorID") : '0f150cec-842f-43a0-9f89-ab06625e832a'
            }
        }
        // catch error when calling graphql qpi
        try {
            let apiData = await API.graphql({query: listCtgNumericalsByDoctorID, variables: {filter:filter, limit: 50}});
            if (isMounted){
                buildRows(apiData.data.listCtgNumericals.items)
            }
        } catch (e) {

        }
        return () => {isMounted = false}
    }, [])

    return (
     <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        components={{
          Toolbar: GridToolbarExport,
        }}
      />
    </div>
    )
}

export {CtgGridTableTest}