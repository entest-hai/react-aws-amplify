import React, {useState} from "react";
import {Button, Typography} from "@material-ui/core";
import {useScript} from "./useScript";
import {Paper} from "@material-ui/core";

const MyChartHome = () => {
    useScript('fhir-client.js')
    const [response, setResponse] = useState("")
    const [dateTime, setDateTime] = useState(null)
    const [value, setValue] = useState(null)
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

    async function fetchThings() {
        var obs = await fetch(myApp.smart.state.serverUrl + "/Observation?patient=" + myApp.smart.patient.id + "&limit=50&code=" + loincs.join(","), {
            headers: {
                "Accept": "application/json+fhir",
                "Authorization": "Bearer " + myApp.smart.state.tokenResponse.access_token
            }
        }).then(function (data) {
            return data
        })
        var response = await obs.json()
        console.log(response)
        console.log(response.entry[0].resource.effectiveDateTime)
        console.log(response.entry[0].resource.valueQuantity.value)
        setDateTime(response.entry[0].resource.effectiveDateTime)
        setValue(response.entry[0].resource.valueQuantity.value)
    }

    return (
        <div>
            <Button
                onClick={() => {
                    console.log("fetch things from EPIC")
                    window.FHIR.oauth2.ready()
                        .then(function (client) {
                            myApp.smart = client
                            fetchThings()
                            fetPatientInfor(client)
                        })
                }}
                color={"secondary"}
                variant={"contained"}
            >Fetch FHIR EPIC</Button>
            <Paper style={{marginTop: '20px'}}>
                <Typography>RESPONSE: </Typography>
                {dateTime && value &&
                <Typography>Your HgAlC was tested on {dateTime} and your HgAlC was {value}</Typography>}
                {patientInfor && <Typography>{patientInfor}</Typography>}
            </Paper>
        </div>
    )
}

export {MyChartHome};




































