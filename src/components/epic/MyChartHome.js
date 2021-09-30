//=====================================================================================================================
// Purpose: Perform FHIR OAUTH2 with EPIC system
// Author: TRAN MINH HAI
// Date: 30 SEP 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content
//********************************************************************************************************************/
// 001.   |  30 SEP 2021.     | TRAN MINH HAI      | - Refactor and add header
//=====================================================================================================================
import React, {useState} from "react";
import {Box, Button, Typography} from "@material-ui/core";
import {useScript} from "./useScript";
import {Paper} from "@material-ui/core";

const MyChartHome = () => {
    useScript('fhir-client.js')
    const [client, setClient] = useState(null)
    const [observation, setObservation] = useState(null)
    const [medication, setMedication] = useState(null)
    const [patientInfor, setPatientInfor] = useState(null)



    async function fetPatientInfor() {

        window.FHIR.oauth2.ready()
            .then(function (client) {
                // myApp.smart = client
                setClient(client)
            })

        client.patient.read().then(
            function (pt) {
                setPatientInfor(JSON.stringify(pt, null, 4))
                console.log(JSON.stringify(pt, null, 4))
            },
            function (error) {
                setPatientInfor("ERROR fetch patient infor")
                console.log(error.stack)
            }
        )
    }

    async function fetchMedication() {
        client.request("/MedicationRequest?patient=" + client.patient.id, {
            resolveReferences: ["medicationReference"],
            graph: true
        })
            // Reject if no MedicationRequests are found
            .then(function (data) {
                if (!data.entry || !data.entry.length) {
                    throw new Error("No medications found for the selected patient");
                }
                return data.entry;
            })
            // Render the current patient's medications (or any error)
            .then(
                function (meds) {
                    setMedication(JSON.stringify(meds,null,4))
                },
                function (error) {
                    setMedication("ERROR fetch medication")
                    console.log(error.stack)
                }
            );
    }

    async function fetchObservations() {
        client.request("/Observation?patient=" + client.patient.id + "&limit=50&code=" + [encodeURIComponent("http://loinc.org|4548-4")].join(","), {
            resolveReferences: ["observationReference"],
            graph: true
        })
            // Reject if no MedicationRequests are found
            .then(function (data) {
                if (!data.entry || !data.entry.length) {
                    throw new Error("No medications found for the selected patient");
                }
                return data.entry;
            })
            // Render the current patient's medications (or any error)
            .then(
                function (obs) {
                    setObservation(JSON.stringify(obs, null, 4))
                },
                function (error) {
                    setObservation("ERROR fetch observations")
                    console.log(error.stack)
                }
            );
    }

    return (
        <div>
            <Button
                onClick={() => {

                }}
                color={"primary"}
                variant={"contained"}
            >Fetch Patient Information</Button>
            <Paper elevation={5} style={{width: '100%', height: '300px', marginTop: '25px',overflow:'auto', marginBottom:'20px'}}>
                {patientInfor && <Typography>{patientInfor}</Typography>}
            </Paper>
             <Button
                onClick={() => {
                    fetchObservations()
                }}
                color={"primary"}
                variant={"contained"}
                style={{width: '250px'}}
            >Fetch Observation</Button>
            <Paper elevation={5} style={{width: '100%', height: '300px', marginTop: '25px',overflow:'auto', marginBottom:'20px'}}>
                {observation && <Typography>{observation}</Typography>}
            </Paper>
             <Button
                onClick={() => {
                    fetchMedication()
                }}
                color={"primary"}
                variant={"contained"}
                style={{width: '250px'}}
            >Fetch Medication</Button>
            <Paper elevation={5} style={{width: '100%', height: '300px', marginTop: '25px',overflow:'auto', marginBottom:'20px'}}>
                {medication && <Typography>{medication}</Typography>}
            </Paper>
        </div>
    )
}

export {MyChartHome};


//======================================================================================================================
// 30 SEP 2021
// Old fetchObservations function not using the Client SMART object
// var myApp = {}
// var loincs = [encodeURIComponent("http://loinc.org|4548-4")]
// async function fetchObservations() {
//     var obs = await fetch(myApp.smart.state.serverUrl + "/Observation?patient=" + myApp.smart.patient.id + "&limit=50&code=" + loincs.join(","), {
//         headers: {
//             "Accept": "application/json+fhir",
//             "Authorization": "Bearer " + myApp.smart.state.tokenResponse.access_token
//         }
//     }).then(function (data) {
//         return data
//     })
//     var response = await obs.json()
//     setObservation(JSON.stringify(response))
//     console.log(response)
// }
//======================================================================================================================










