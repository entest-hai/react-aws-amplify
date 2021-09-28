//==============================================================================
// <!-- launch.html -->
// <!-- use nonProductionID: -->
// <!-- femom-doctor-facing-app -->
// <!-- nonProductClientID: 94410a76-e36d-4e03-ad50-8a2f6e295217 -->
// <!-- clientID: d61c55c5-0ac3-4178-b852-ce8c469c7340 -->
// <!-- https://main.d25ixo3i27kpqh.amplifyapp.com -->
// <!-- patient-dev example -->
// <!-- clientID: 6eeb1b28-47d2-4674-8c98-9746c0e0ae7d -->
// <!-- username: fhircamila -->
// <!-- pass: epicepic1 -->
// <!-- https://epic.patientdev.repl.co/app.html -->
// <!-- femom-patient facing app -->
// <!-- nonProductionID: d2520a07-cbc4-4cf9-a8ce-dc493a92c552 -->
// <!-- clientID: 219515c3-296f-4b0c-98cf-0c91ac0387d5 -->
// <!-- https://main.d25ixo3i27kpqh.amplifyapp.com -->
//==============================================================================
import React, {useEffect, useState}  from 'react';
import {Box, Button, Container} from "@material-ui/core";
import { useHistory, useLocation } from 'react-router-dom';

const MyChartAuth = () => {

    const history = useHistory()

     const doAuth = () => {
         {
             history.push({
                            pathname: "/launch?iss=https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4&aud="
                        })

             window.FHIR && window.FHIR.oauth2.authorize({
            "client_id": "d2520a07-cbc4-4cf9-a8ce-dc493a92c552",
            'scope':  'PATIENT.READ, PATIENT.SEARCH',
            'redirect_uri': 'https://main.d25ixo3i27kpqh.amplifyapp.com/'
        })
         }
     }

      useEffect(() => {
        const script = document.createElement("script");
        script.src = 'fhir-client.js';
        document.body.appendChild(script);

        setTimeout(()=>{
            console.log("auth")
        }, 3000)



  }, [])

    return (
        <Box sx={{display:'flex',height:'100px',marginTop:'50vh',flexDirection:'column', alignItems:'center'}}>
            <Button variant={"contained"} color={"primary"} onClick={doAuth}>
                Goto MyChart
            </Button>
        </Box>
    )
}

export {MyChartAuth};