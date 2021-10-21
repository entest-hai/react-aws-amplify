import React, {useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import {UserSessionService} from "../../services/UserSessionService";
import {AdminPage} from "../admin/Admin";

const ProtectedRouteTest = ({path,component,render,requiredRole,...rest}) => {

    const [adminAuthenticated, setAdminAuthenticated] = useState(false)

    useEffect(async () => {
        await UserSessionService.getUserSession()
        setAdminAuthenticated(UserSessionService.user.userName == "admin")
    })

    return (
        <Route
            path={path}
            {...rest}
            render={props => {
                if (adminAuthenticated){
                    return (<AdminPage></AdminPage>)
                } else {
                    return (<h1>Error this route is not allowed to users</h1>)
                }
            }}
        >
        </Route>
    )
}

export {ProtectedRouteTest};