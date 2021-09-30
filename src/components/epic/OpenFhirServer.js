import React, {useEffect, useState} from "react";
import {Box, Button, Typography} from "@material-ui/core";
import {useScript} from "./useScript";
import {Paper} from "@material-ui/core";


const OpenFhirServer = () => {
    useScript('fhir-client.js')
    const [client, setClient] = useState(null)
    const [observation, setObservation] = useState(null)
    const [medication, setMedication] = useState(null)
    const [patientInfor, setPatientInfor] = useState(null)

    useEffect(() => {

        console.log("OK")
    }, [])

    async function fetPatientInfor() {
        var client = window.FHIR.client({
            serverUrl: "https://r3.smarthealthit.org",
            tokenResponse: {
                patient: "2e27c71e-30c8-4ceb-8c1c-5641e066c0a4"
            }
        })

        setClient(client)

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
                    setMedication(JSON.stringify(meds, null, 4))
                },
                function (error) {
                    setMedication("ERROR fetch medication")
                    console.log(error.stack)
                }
            );
    }

    async function fetchObservations() {
        client.request("/Observation?patient=" + client.patient.id, {
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
                    fetPatientInfor()
                }}
                color={"primary"}
                variant={"contained"}
                style={{width: '250px'}}
            >Fetch Patient Information</Button>
            <Paper elevation={5} style={{width: '100%', height: '300px', marginTop: '20px', overflow: 'auto', marginBottom:'20px'}}>
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
            <Paper elevation={5} style={{width: '100%', height: '300px', marginTop: '20px', overflow: 'auto', marginBottom:'20px'}}>
                {observation && <Typography>{observation}</Typography>}
            </Paper>
            <Button
                onClick={() => {
                    fetchMedication()
                }}
                color={"primary"}
                variant={"contained"}
                style={{width: '250px'}}
            >Fetch Medications</Button>
            <Paper elevation={5} style={{width: '100%', height: '300px', marginTop: '20px', overflow: 'auto', marginBottom:'20px'}}>
                {medication && <Typography>{medication}</Typography>}
            </Paper>
        </div>
    )
}

export {OpenFhirServer};