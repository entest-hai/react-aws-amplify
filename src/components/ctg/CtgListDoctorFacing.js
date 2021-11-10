// 08 NOV 2021
// use localStorage to cache data from api call

import React, {useEffect, useState} from "react";
import {Waypoint} from "react-waypoint";
import {API} from "aws-amplify";
import MUIDataTable from "mui-datatables";
import {listCtgNumericalsByDoctorID} from "../../graphql/customQueries";
import {Button} from "@mui/material";
import {useHistory} from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import {CtgNumericalService, DownloadFileService} from "../../services/UserSessionService";

const CtgListDoctorFacing = (props) => {
    const history = useHistory()
    // const [nextToken, setNextToken] = useState(null)
    const [ctgRows, setCtgRows] = useState([])


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
        {name: "Created Time"},
        {name: "Details"},
        {name: "Download"},
        {name: "Comment"}
        ];

    const dateTimeToString = (time) => {
        let obj = new Date(time * 1000)
        return obj.toLocaleDateString() + "-" + obj.toLocaleTimeString()
    }

    const buildCtgRows = (ctgRecords) => {
        let newCtgRows = ctgRecords.map((record,index) => {
            return [index + ctgRows.length,
                record.id ? record.id.substring(0,8): "UNKNOWN",
                record.ctgJsonUrl ? record.ctgJsonUrl: "UNKNOWN",
                record.accepted ? record.accepted.substring(0,8) : "UNKNOWN",
                record.lost ? record.lost: "UNKNOWN",
                // record.createdAt ? record.createdAt: "UNKNOWN",
                record.createdTime ? dateTimeToString(record.createdTime ) : "UNKNOWN",
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
                >
                    Details
                </Button>,
                <Button
                    color={"primary"}
                    variant={"contained"}
                    disabled={record.ctgUrl ? false : true}
                    onClick={() => {
                        DownloadFileService.downloadImageFromS3(record.ctgUrl)
                    }}
                >
                    Download
                </Button>,
                record.comment ? record.comment.substring(0,50): "UNKNOWN"
            ]
        })
        setCtgRows([...ctgRows, ...newCtgRows])
    }

    const fetchCtgRecords = async () => {
        let ctgNumericals = CtgNumericalService.getCtgNumericals()
        if (ctgNumericals){
            console.log("fetch records from local storage")
            buildCtgRows(ctgNumericals)
        } else {
            console.log("fetch records from graphql")
            let filter = {
                doctorID: {
                    eq: sessionStorage.getItem('doctorID') ? sessionStorage.getItem("doctorID") : '0f150cec-842f-43a0-9f89-ab06625e832a'
                }
            }
            try {
                const apiData = await API.graphql({query: listCtgNumericalsByDoctorID, variables: {filter:filter, limit: 10}})
                buildCtgRows(apiData.data.listCtgNumericals.items)
                CtgNumericalService.setCtgNumericals(apiData.data.listCtgNumericals.items)
                // setNextToken(apiData.data.listCtgNumericals.nextToken)
                CtgNumericalService.setNextToken(apiData.data.listCtgNumericals.nextToken)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const fetchMoreCtgRecords = async () => {
        let nextToken = CtgNumericalService.getNextToken()
        let filter = {
            doctorID: {
                eq: sessionStorage.getItem('doctorID') ? sessionStorage.getItem("doctorID") : '0f150cec-842f-43a0-9f89-ab06625e832a'
            }
        }
        if (nextToken != "null"){
            console.log("fetch more ctg records")
            const apiData = await API.graphql({query: listCtgNumericalsByDoctorID, variables: {filter:filter, limit: 10, nextToken}})
            buildCtgRows(apiData.data.listCtgNumericals.items)
            CtgNumericalService.setCtgNumericals(apiData.data.listCtgNumericals.items)
            CtgNumericalService.setNextToken(apiData.data.listCtgNumericals.nextToken)
            // setNextToken(apiData.data.listCtgNumericals.nextToken)
        } else {
            console.log("null token no more to fetch ctg records")
        }
    }

    useEffect(async () => {
        let isMounted = true
        if(isMounted){
            await fetchCtgRecords()
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
        tableBodyHeight: props.tableHeight ? props.tableHeight :  '500px',
        setTableProps: () => {
            return {
                padding: 'none',
                size: 'small'
            }
        },
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
    )
}

export {CtgListDoctorFacing}