import {API} from "aws-amplify";
import {ctgNumericalsByDoctorID, getCtgNumerical} from "../graphql/queries";

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


export const getNumericalCtgsById = async  (id) => {
    try {
        const resp = await API.graphql({query: getCtgNumerical, variables:{id:id}})
        // console.log(resp.data.getCtgNumerical)
        return resp.data.getCtgNumerical
    } catch (e) {
        console.log("not able to get ", id)
        return null
    }
}