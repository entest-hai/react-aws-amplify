import {getNumericalCtgsById} from "../services/GraqphqlCtgNumericalService";
import {createCtgNumerical, updateCtgNumerical} from "../graphql/mutations";
import {API} from 'aws-amplify';

export const createCtgNumericalDict = async (
  id, 
  name, 
  ctgUrl, 
  ctgJsonUrl, 
  comment, 
  lost, 
  accepted, 
  patientID, 
  doctorID, 
  hospitalID, 
  createdTime) => {
        const ctgNumerical = {
            id: id,
            name: name,
            ctgUrl: ctgUrl,
            ctgJsonUrl: ctgJsonUrl,
            comment: comment,
            lost: lost,
            accepted: accepted,
            patientID: patientID,
            doctorID: doctorID,
            hospitalID: hospitalID,
            createdTime: createdTime
        }
        return ctgNumerical
    }


export const writeCtgRecordToDB = async (ctgNumerical) => {
    // if already exit let update
    let existing = await getNumericalCtgsById(ctgNumerical.id)
    if (existing != null){
        // console.log("already exist, let update record", ctgNumerical)
        const resp = API.graphql({query: updateCtgNumerical, variables: {input: ctgNumerical}})
    } else {
        // console.log("let create a new record", ctgNumerical)
        const resp = API.graphql({query: createCtgNumerical, variables: {input: ctgNumerical}})
    }
}

