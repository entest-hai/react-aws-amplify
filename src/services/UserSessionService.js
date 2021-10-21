// 21 OCT 2021  TRAN MINH HAI
// simple and test user session
// should be singleton later

import React from "react";
import {API, Auth} from "aws-amplify";
import {getDoctor} from "../graphql/queries";

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

export {UserSessionService}