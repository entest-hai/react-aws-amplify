//=====================================================================================================================
// Purpose: Do OAUTH2 with EPIC MyChart
// Author: TRAN MINH HAI
// Date: 28 SEP 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content
//********************************************************************************************************************/
// 001.   |  23 AUG 2021.     | TRAN MINH HAI      | - Refactor and add header
// 28 SEP 2021 add MyChartAuth to do oauth2 with EPIC MyChart
// need to load fhir-script.js and it will get username, pass from screen
// it also get the return token or code from redirected url.
//=====================================================================================================================
// 28 SEP 2021 add MyChartAuth to do oauth2 with EPIC MyChart
// need to load fhir-script.js and it will get username, pass from screen
// it also get the return token or code from redirected url.
// 28 SEP 2021 Tran Minh Hai do OAUTH with EPIC patient facing app
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
import React, {useEffect, useState} from 'react';
import {Box, Button, Container} from "@material-ui/core";
import {useHistory, useLocation} from 'react-router-dom';
import {useScript} from "./useScript";


const MyChartAuth = () => {

    useScript('fhir-client.js')

    const history = useHistory()

    const doAuth = () => {
        {
            history.push({
                pathname: "/launch?iss=https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4&aud="
            })
            console.log("do auth now")
            window.FHIR && window.FHIR.oauth2.authorize({
                "client_id": "d2520a07-cbc4-4cf9-a8ce-dc493a92c552",
                'scope': 'PATIENT.READ, PATIENT.SEARCH',
                'redirect_uri': 'https://main.d25ixo3i27kpqh.amplifyapp.com/'
            })
        }
    }

    return (
        <Box sx={{display: 'flex', height: '100px', marginTop: '50vh', flexDirection: 'column', alignItems: 'center'}}>
            <Button variant={"contained"} color={"primary"} onClick={doAuth}>
                Goto MyChart
            </Button>
        </Box>
    )
}

export {MyChartAuth};