import React, {useState} from "react";
import {Button, Typography} from "@material-ui/core";
import {useScript} from "./useScript";
import {Paper} from "@material-ui/core";

const MyChartHome = () => {
    useScript('fhir-client.js')
    const [response, setResponse] = useState("")
    const [dateTime, setDateTime] = useState(null)
    const [value, setValue] = useState(0)

    var myApp = {}
    var loincs = [encodeURIComponent("http://loinc.org|4548-4")]

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
        setDateTime(response.entry[0].resource.effectiveDateTime)
        setValue(response.entry[0].resource.valueQuantity)
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
                        })
                }}
                color={"secondary"}
                variant={"contained"}
            >Fetch FHIR EPIC</Button>
            <Paper style={{marginTop: '20px'}}>
                <Typography>RESPONSE: </Typography>
                {dateTime && <Typography>Your HgAlC was tested on {dateTime} and your HgAlC was {value}</Typography>}
            </Paper>
        </div>
    )
}

export {MyChartHome};