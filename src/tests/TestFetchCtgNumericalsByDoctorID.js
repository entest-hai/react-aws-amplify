import React, {useEffect, useState} from "react";
import {fetchCtgNumericalsByDoctorID} from "../services/GraqphqlCtgNumericalService";

const TestFetchCtgNumericalsByDoctorID = () => {

    const [ctgs, setCtgs] = useState([])

    useEffect(async () => {
        const resp = await fetchCtgNumericalsByDoctorID()
    }, [])

    return (
        <h1>Fetch Ctg Numerical by Doctor ID</h1>
    )
}

export {TestFetchCtgNumericalsByDoctorID}

