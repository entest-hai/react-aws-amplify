import {API} from "aws-amplify";
import {ctgNumericalsByDoctorID} from "../graphql/queries";

export const fetchCtgNumericalsByDoctorID = async () => {
    let resp = null
    const doctorID = localStorage.getItem('doctorID') ? localStorage.getItem("doctorID") : '0f150cec-842f-43a0-9f89-ab06625e832a'
    try {
        const apiData = await API.graphql({query: ctgNumericalsByDoctorID, variables: {doctorID: doctorID}})
        resp = apiData.data.CtgNumericalsByDoctorID
        console.log(resp)
    } catch (e) {
        console.log(e)
    }
    return resp
}