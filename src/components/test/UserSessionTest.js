import React, {useEffect, useState} from "react";
import {API, Auth} from "aws-amplify";
import {getDoctor} from "../../graphql/queries";
import {UserSessionService} from "../../services/UserSessionService";

const UserSessionTest = () => {
    const [user,setUser] = useState({})
    useEffect(async () => {
        await UserSessionService.getUserSession()
        setUser(UserSessionService.user)
    },[])

    return (
       <div>
           userName: {UserSessionService.user.userName}, doctorName: {UserSessionService.user.doctorName}, hospital: {UserSessionService.user.hospitalID}
       </div>
    )
}

export {UserSessionTest};