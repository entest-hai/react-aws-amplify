// 21 OCT 2021  TRAN MINH HAI
// simple and test user session
// should be singleton later
import React from "react";
import {API, Auth} from "aws-amplify";
import {getDoctor} from "../graphql/queries";

class UserProfile {

    static instance = null
    static username = null
    static password = null
    static cognitoUserID = null
    static doctorID = null
    static doctorName = null
    static hospitalID = null

    static async getInstance(){
        if (this.instance == null){
           this.instance = new UserProfile()
        } else {
            console.log("user profile already exist")
        }
        return this.instance
    }

    static setInstance(username,password,cognitoUserID,doctorID,doctorName,hospitalID){
        this.username = username
        this.password = password
        this.cognitoUserID = cognitoUserID
        this.doctorID = doctorID
        this.doctorName = doctorName
        this.hospitalID = hospitalID
    }
}


class UserSessionService {

    static user  = {
        userName: null,
        doctorName: null,
        doctorEmail: null,
        doctorID: null,
        hospitalID: null
    }

    static async getUserSession(){
        // reset
        this.user.userName = null
        this.user.doctorName = null
        this.user.doctorEmail = null
        this.user.doctorID = null
        this.user.hospitalID = null

        try {
            let user = await Auth.currentAuthenticatedUser();
            this.user.userName = user.username
            try {
                 let apiData = await API.graphql({query: getDoctor, variables:{id: String(user.attributes.sub)}});
                 this.user.doctorName = apiData.data.getDoctor.name
                 this.user.doctorID = apiData.data.getDoctor.id
                 this.user.hospitalID = apiData.data.getDoctor.hospitalID
            } catch (e) {}
        }catch (e) {}
    }
}


class CtgNumericalService {

    static setNextToken(nextToken){
        localStorage.setItem("nextToken", nextToken)
    }

    static getNextToken(){
        return localStorage.getItem("nextToken")
    }

    static setCtgNumericals(ctgNumericals){

        let currentCtgNumericals = JSON.parse(localStorage.getItem("listCtgNumericals"))

        if (currentCtgNumericals != null){
            localStorage.setItem("listCtgNumericals", JSON.stringify([...currentCtgNumericals, ...ctgNumericals]))
            // localStorage.setItem("listCtgNumericals", JSON.stringify(ctgNumericals))
        } else {
            localStorage.setItem("listCtgNumericals", JSON.stringify(ctgNumericals))
        }

        // console.log("set ctgs to local storage", localStorage.getItem("listCtgNumericals"))

    }

    static getCtgNumericals(){
        return JSON.parse(localStorage.getItem("listCtgNumericals"))
    }
}

export {UserSessionService, UserProfile, CtgNumericalService}