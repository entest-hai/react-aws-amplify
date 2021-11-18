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

export const fetchAllNumericalCtgsByDoctorID = async  (maxNumRecord) => {
    // get doctor ID from local storage 
    const doctorID = localStorage.getItem('doctorID') ? localStorage.getItem("doctorID") : '0f150cec-842f-43a0-9f89-ab06625e832a'
    // get next token from local storage or ini 
    var nextToken = null 
    // buffer records 
    var records = []
    // first fetch 
    const apiData = await API.graphql({query: ctgNumericalsByDoctorID, variables: {doctorID:doctorID}})
    // get next token 
    nextToken = apiData.data.CtgNumericalsByDoctorID.nextToken
    // parse data 
    records = [...apiData.data.CtgNumericalsByDoctorID.items]
    // continue fetch untill next token null 
    while (records.length < maxNumRecord){
        if (nextToken == null || nextToken=='null'){
            console.log("null token reach break now")
            break
        }
        // const apiData = await API.graphql({query: listCtgNumericalsByDoctorID, variables: {filter:filter, limit: 20, nextToken}})
        const apiData = await API.graphql({query: ctgNumericalsByDoctorID, variables: {doctorID:doctorID, limit: 20, nextToken}})
        // update next token
        nextToken = apiData.data.CtgNumericalsByDoctorID.nextToken
        // parse data 
        records = [...apiData.data.CtgNumericalsByDoctorID.items, ...records]
    }
    return records
}