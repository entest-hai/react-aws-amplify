import React, {useEffect, useState} from "react";
import {LoginPage} from "./LoginPage";
import {Dashboard} from "./Dashboard";
import { Admin, } from "react-admin";
import { Resource } from "react-admin";
import * as mutations from "./../../graphql/mutations";
import * as queries from "./../../graphql/queries";
import {buildAuthProvider, buildDataProvider, CognitoGroupList, CognitoUserList, CognitoUserShow} from "react-admin-amplify";
import awsExports from "./../../aws-exports";
import { Amplify } from "@aws-amplify/core";
import {API} from "@aws-amplify/api";
import {getUser, listCtgImages, listHeartRates, listUsers} from "./../../graphql/queries";
import {TodoList} from "./TodoList";
import {CtgImageCreate, CtgImageEdit, CtgImageList, CtgImageShow} from "./CtgImageList";
import {HeartRateList} from "./HeartRateList";
import {PatientCreate, PatientEdit, PatientList, PatientShow} from "./PatientList";
import {DoctorCreate, DoctorEdit, DoctorList, DoctorShow} from "./DoctorList";
import {HospitalCreate, HospitalEdit, HospitalList, HospitalShow} from "./HospitalList";
import {CtgCreate, CtgEdit, CtgList, CtgShow} from "./CtgList";
Amplify.configure(awsExports);

const authProvider = buildAuthProvider({
    authGroups: ["Admin"],
})

const dataProvider = buildDataProvider({
    queries,
    mutations,
}, {
    authMode: awsExports.aws_appsync_authenticationType,
    storageBucket: awsExports.aws_user_files_s3_bucket,
    storageRegion: awsExports.aws_user_files_s3_bucket_region,
    enableAdminQueries: true,
})

const AdminPage = () => {
    console.log(awsExports);
    useEffect(async () => {
        console.log("query users");
        const userData = await API.graphql({
        query: listHeartRates
      });
      console.log(userData);
    })

    return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      loginPage={LoginPage}
      dashboard={Dashboard}
    >
        {(permissions) => [
            <Resource
                name={"Hospitals"}
                list={HospitalList}
                show={HospitalShow}
                edit={HospitalEdit}
                create={HospitalCreate}
            >
            </Resource>,
            <Resource
                name={"Doctors"}
                list={DoctorList}
                show={DoctorShow}
                edit={DoctorEdit}
                create={DoctorCreate}
            >
            </Resource>,
            <Resource
                name={"Patients"}
                list={PatientList}
                show={PatientShow}
                edit={PatientEdit}
                create={PatientCreate}
            >
            </Resource>,
            <Resource
                name={"Ctgs"}
                list={CtgList}
                show={CtgShow}
                edit={CtgEdit}
                create={CtgCreate}
            ></Resource>,
            <Resource
                name={"cognitoUsers"}
                options={{label: "Cognito User"}}
                list={CognitoUserList}
                show={CognitoUserShow}
            >
            </Resource>,
            <Resource
                name={"cognitoGroups"}
                options={{label: "Cognito Groups"}}
                list={CognitoGroupList}
            >
            </Resource>,
            <Resource
                name={"HeartRates"}
                list={HeartRateList}>
            </Resource>,
            <Resource
                name="Todos"
                list={TodoList}
            />
        ]}
    </Admin>
    )
}

export {AdminPage};