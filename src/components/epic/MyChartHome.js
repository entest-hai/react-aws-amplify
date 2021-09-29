import React, {useState} from "react";
import {Box, Button, Typography} from "@material-ui/core";
import {useScript} from "./useScript";
import {Paper} from "@material-ui/core";

const MyChartHome = () => {
    useScript('fhir-client.js')
    const [observation, setObservation] = useState(null)
    const [medication, setMedication] = useState(null)
    const [patientInfor, setPatientInfor] = useState(null)

    var myApp = {}
    var loincs = [encodeURIComponent("http://loinc.org|4548-4")]

    async function fetPatientInfor(client) {
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

    async function fetchMedication(client) {
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

    async function fetchObservationsClient(client) {
        client.request("/Observation?patient=" + client.patient.id + "&limit=50&code=" + loincs.join(","), {
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


    async function fetchObservations() {
        var obs = await fetch(myApp.smart.state.serverUrl + "/Observation?patient=" + myApp.smart.patient.id + "&limit=50&code=" + loincs.join(","), {
            headers: {
                "Accept": "application/json+fhir",
                "Authorization": "Bearer " + myApp.smart.state.tokenResponse.access_token
            }
        }).then(function (data) {
            return data
        })
        var response = await obs.json()
        setObservation(JSON.stringify(response))
        console.log(response)
    }

    return (
        <div>
            <Button
                onClick={() => {
                    console.log("fetch things from EPIC")
                    window.FHIR.oauth2.ready()
                        .then(function (client) {
                            myApp.smart = client
                            fetchObservationsClient(client)
                            fetPatientInfor(client)
                            fetchMedication(client)
                        })
                }}
                color={"primary"}
                variant={"contained"}
            >Click to Fetch Patient Information</Button>
            <Paper elevation={5} style={{width: '100%', height: '300px', marginTop: '25px',overflow:'auto'}}>
                <Typography variant={'h6'}>Current Patient</Typography>
                {patientInfor && <Typography>{patientInfor}</Typography>}
            </Paper>
            <Paper elevation={5} style={{width: '100%', height: '300px', marginTop: '25px',overflow:'auto'}}>
                <Typography variant={'h6'}>Observations</Typography>
                {observation && <Typography>observation</Typography>}
            </Paper>
            <Paper elevation={5} style={{width: '100%', height: '300px', marginTop: '25px',overflow:'auto'}}>
                <Typography variant={'h6'}>Medication</Typography>
                {medication && <Typography>{medication}</Typography>}
            </Paper>
        </div>
    )
}

export {MyChartHome};
















