// 08 NOV 2021
// use localStorage to cache data from api call
// default doctor ID: '0f150cec-842f-43a0-9f89-ab06625e832a'

import React, {useEffect, useState} from "react";
import {Waypoint} from "react-waypoint";
import {API} from "aws-amplify";
import MUIDataTable from "mui-datatables";
// import {listCtgNumericalsByDoctorID} from "../../graphql/customQueries";
import {Button} from "@mui/material";
import {useHistory} from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import {CtgNumericalService, DownloadFileService} from "../../services/UserSessionService";
import {ctgNumericalsByDoctorID} from "../../graphql/queries";

const CtgListDoctorFacing = (props) => {
    const maxNumRecordForInitFetch = 200
    const history = useHistory()
    const [ctgRows, setCtgRows] = useState([])
    const [fetchMaxNow, setFetchMaxNow] = useState(false)

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
                                    // console.log("waypoint reach", value)
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
        // let ctgRecords = CtgNumericalService.getCtgNumericals()
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
        // console.log("build ctg rows ", [...ctgRows].length)
    }

    const fetchCtgRecords = async () => {
        const doctorID = localStorage.getItem('doctorID') ? localStorage.getItem("doctorID") : '0f150cec-842f-43a0-9f89-ab06625e832a'
        let ctgNumericals = CtgNumericalService.getCtgNumericals()
        if (ctgNumericals){
            console.log("fetch records from local storage")
            buildCtgRows(ctgNumericals)
        } else {
            console.log("fetch records from graphql")
            // let filter = {
            //     doctorID: {
            //         eq: doctorID
            //     }
            // }
            try {
                // const apiData = await API.graphql({query: ctgNumericalsByDoctorID, variables: {filter:filter, limit: 30}})
                const apiData = await  API.graphql({query: ctgNumericalsByDoctorID, variables: {doctorID:doctorID, limit:30}})
                buildCtgRows(apiData.data.CtgNumericalsByDoctorID.items)
                CtgNumericalService.setCtgNumericals(apiData.data.CtgNumericalsByDoctorID.items)
                CtgNumericalService.setNextToken(apiData.data.CtgNumericalsByDoctorID.nextToken)
            } catch (e) {
                console.log(e)
            }
        }
        setFetchMaxNow(true)
    }

    const fetchMoreCtgRecords = async () => {
        const doctorID = localStorage.getItem('doctorID') ? localStorage.getItem("doctorID") : '0f150cec-842f-43a0-9f89-ab06625e832a'
        let nextToken = CtgNumericalService.getNextToken()
        let filter = {
            doctorID: {
                eq: doctorID
            }
        }
        if (nextToken != "null" && localStorage.getItem('isFetchingMax')){
            console.log("fetch more ctg records")
            // const apiData = await API.graphql({query: CtgNumericalsByDoctorIDByDoctorID, variables: {filter:filter, limit: 20, nextToken}})
            const apiData = await API.graphql({query: ctgNumericalsByDoctorID, variables: {doctorID:doctorID, limit: 20, nextToken}})
            buildCtgRows(apiData.data.CtgNumericalsByDoctorID.items)
            CtgNumericalService.setCtgNumericals(apiData.data.CtgNumericalsByDoctorID.items)
            CtgNumericalService.setNextToken(apiData.data.CtgNumericalsByDoctorID.nextToken)
        } else {
            console.log("null token no more to fetch ctg records")
        }
    }


    const fetchMaxCtgRecords = async  () => {
        const doctorID = localStorage.getItem('doctorID') ? localStorage.getItem("doctorID") : '0f150cec-842f-43a0-9f89-ab06625e832a'
        var nextToken = CtgNumericalService.getNextToken()
        var records = []
        let filter = {
                doctorID: {
                    eq: doctorID
                }
            }
        //
        if (nextToken == null || nextToken=="null"){
            return null
        }
        // init fetch
        // const apiData = await API.graphql({query: listCtgNumericalsByDoctorID, variables: {filter:filter, limit: 20, nextToken}})
        const apiData = await API.graphql({query: ctgNumericalsByDoctorID, variables: {doctorID:doctorID, limit: 20, nextToken}})
        records = [...apiData.data.CtgNumericalsByDoctorID.items, ...records]
        var nextToken = apiData.data.CtgNumericalsByDoctorID.nextToken
        // fetch 20 times or untill null token returned
        while (records.length < maxNumRecordForInitFetch){
            if (nextToken == null || nextToken=='null'){
                console.log("null token reach break now")
                break
            }
            // const apiData = await API.graphql({query: listCtgNumericalsByDoctorID, variables: {filter:filter, limit: 20, nextToken}})
            const apiData = await API.graphql({query: ctgNumericalsByDoctorID, variables: {doctorID:doctorID, limit: 20, nextToken}})
            nextToken = apiData.data.CtgNumericalsByDoctorID.nextToken
            records = [...apiData.data.CtgNumericalsByDoctorID.items, ...records]
            // console.log(records.length)
        }
        // update ui and nextoken it can be not null
        buildCtgRows(records)
        CtgNumericalService.setCtgNumericals(records)
        CtgNumericalService.setNextToken(nextToken)
        localStorage.setItem('isFetchingMax','finished')
    }


    useEffect(async () => {
        let isMounted = true
        if(isMounted){
            await fetchCtgRecords()
        }
        return () => {isMounted = false}
    },[])

    useEffect(async () => {
         fetchMaxCtgRecords().catch(e => {console.log(e)})
    }, [fetchMaxNow])

    useEffect(() => {
        // console.log("length ", ctgRows.length)
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