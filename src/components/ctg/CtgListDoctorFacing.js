import React, {useEffect, useState} from "react";
import {Waypoint} from "react-waypoint";
import {API} from "aws-amplify";
import MUIDataTable from "mui-datatables";
import {listCtgNumericalsByDoctorID} from "../../graphql/customQueries";
import {Button} from "@mui/material";
import {useHistory} from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const CtgListDoctorFacing = (props) => {
    const history = useHistory()
    const [nextToken, setNextToken] = useState(null)
    const columns = [
        {
            name: "Index",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex
                    if (ctgRows.length - 2  == value) {
                        return (
                        <React.Fragment key={value}>
                            <Waypoint
                                onEnter={() => {
                                    console.log("waypoint reach", value)
                                    fetchMoreCtgRecords()
                                }
                                }>
                            </Waypoint>
                            {value}
                        </React.Fragment>)
                    } else {
                        return (<React.Fragment key={value}>{value}</React.Fragment>)
                    }
                }
            }
        },
        {name: "Id"},
        {name: "Name"},
        {name: "Accepted"},
        {name: "FHR Lost"},
        {name: "Comment"},
        {name: "Created Time"},
        {name: "Details"}
        ];
    const [ctgRows, setCtgRows] = useState([])
    const dateTimeToString = (time) => {
        let obj = new Date(time)
        return obj.toLocaleDateString() + "-" + obj.toLocaleTimeString()
    }

    const buildCtgRows = (ctgRecords) => {
        let newCtgRows = ctgRecords.map((record,index) => {
            return [index + ctgRows.length,
                record.id ? record.id.substring(0,8): "UNKNOWN",
                record.ctgJsonUrl ? record.ctgJsonUrl: "UNKNOWN",
                record.accepted ? record.accepted : "UNKNOWN",
                record.fHRLost ? record.fHRLost: "UNKNOWN",
                record.comment ? record.comment: "UNKNOWN",
                dateTimeToString(record.createdTime),
                <Button
                    color={"primary"}
                    variant={"contained"}
                    onClick={() => {
                        history.push({
                            pathname: '/ctg',
                            state: {
                                record: record
                            }
                        })
                    }}
                >Details</Button>
            ]
        })
        setCtgRows([...ctgRows, ...newCtgRows])
    }

    const fetchCtgRecords = async () => {
        console.log("fetch records")
        let filter = {
            doctorID: {
                eq: sessionStorage.getItem('doctorID') ? sessionStorage.getItem("doctorID") : '0f150cec-842f-43a0-9f89-ab06625e832a'
            }
        }
        try {
            const apiData = await API.graphql({query: listCtgNumericalsByDoctorID, variables: {filter:filter, limit: 10}})
            buildCtgRows(apiData.data.listCtgNumericals.items)
            setNextToken(apiData.data.listCtgNumericals.nextToken)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchMoreCtgRecords = async () => {
        let filter = {
            doctorID: {
                eq: sessionStorage.getItem('doctorID') ? sessionStorage.getItem("doctorID") : '0f150cec-842f-43a0-9f89-ab06625e832a'
            }
        }
        if (nextToken ){
            console.log("fetch more ctg records")
            const apiData = await API.graphql({query: listCtgNumericalsByDoctorID, variables: {filter:filter, limit: 10, nextToken}})
            buildCtgRows(apiData.data.listCtgNumericals.items)
            setNextToken(apiData.data.listCtgNumericals.nextToken)
        } else {
            console.log("null token no more to fetch ctg records")
        }
    }

    useEffect(async () => {
        let isMounted = true
        if(isMounted){
            await  fetchCtgRecords()
        }
        return () => {isMounted = false}
    },[])

    useEffect(() => {
        console.log("length ", ctgRows.length)
    }, [ctgRows])

    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        fixedHeader:true,
        pagination: false,
        tableBodyHeight: props.tableHeight ? props.tableHeight :  '400px',
        onRowClick(rowNode){
            if (props.setCtgId){
                props.setCtgId(rowNode[2])
            }
        }
    };

    return (
            <ThemeProvider theme={createTheme()}>
                <MUIDataTable
                      title={"CTG List"}
                      data={ctgRows}
                      columns={columns}
                      options={options}
              />
            </ThemeProvider>
    );
}

export {CtgListDoctorFacing}