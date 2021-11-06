//=====================================================================================================================
// Purpose: Admin site to manage things
// Author: TRAN MINH HAI
// Date: 18 OCT 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content
//********************************************************************************************************************/
// 001.   |  18 OCT 2021.     | TRAN MINH HAI      |
// 1. Setup Amplify user group, admin group, and admin user https://docs.amplify.aws/cli/auth/groups/
// 2. Setup react-admin Amplify framework to query tables
// 3. Setup react-admin Amplify framework to do admin query on cognitoUser and cognitoUserGroup
//    https://github.com/MrHertal/react-admin-amplify#admin-queries
// 4. Update Hospital, Doctor, Patient, Ctg model, relation, and correct their names
// 5. Update CtgRecords view and CtgRecordNote view which write to Ctg table
// 6. Add more test user group, doctor user group and patient user group from Amplify CLI
// 7. AdminSub: 380e5cfa-9607-4796-8f78-4ed6c701acd0, email: htranminhhai20@gmail.com, username: admin
// 8. username: biorithm, sub: 0089ab02-ee04-48b1-bc4e-5e8f06397077, email: hai@bio-rithm.com
// 9. username: hai, sub: 0f150cec-842f-43a0-9f89-ab06625e832a, email: hai@bio-rithm.com
//=====================================================================================================================
import React, {useEffect, useState} from "react";
// import {LoginPage} from "./LoginPage";
import {Dashboard} from "./Dashboard";
import { Admin, } from "react-admin";
import { Resource } from "react-admin";
import * as mutations from "./../../graphql/mutations";
import * as queries from "./../../graphql/queries";
import { Auth } from 'aws-amplify';

import {
    buildAuthProvider,
    buildDataProvider,
    CognitoGroupList,
    CognitoUserList,
    CognitoUserShow,
} from "react-admin-amplify";
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
import {
    CognitoUserCreate,
    CognitoUserCreateCustom,
    CognitoUserEditCustom,
    CognitoUserListCustom
} from "./CognitoUserList";
import {Button} from "@mui/material";
import {CtgNumericalCreate, CtgNumericalEdit, CtgNumericalList, CtgNumericalShow} from "./CtgNumericalList";
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



const AdminPage = ({setAuthenticated}) => {

    const MyLogoutButton = () => {
    return (
        <Button
            color={"secondary"}
            variant={"contained"}
            style={{paddingLeft:40,paddingRight:40}}
            onClick={() => {
                sessionStorage.clear()
                setAuthenticated(null)
                // window.location.reload()
            }}
        >
            SIGN OUT
        </Button>
    )
}

    useEffect(async () => {
        let user = await Auth.currentAuthenticatedUser();
        console.log('current user', user)
    })

    return (
    <Admin
      logoutButton={MyLogoutButton}
      title={"Biorithm Admin"}
      authProvider={authProvider}
      dataProvider={dataProvider}
      // loginPage={LoginPage}
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
                name={"CtgNumericals"}
                list={CtgNumericalList}
                show={CtgNumericalShow}
                edit={CtgNumericalEdit}
                create={CtgNumericalCreate}
            >
            </Resource>,
            <Resource
                name={"cognitoUsers"}
                options={{label: "Cognito User"}}
                list={CognitoUserListCustom}
                show={CognitoUserShow}
                edit={CognitoUserEditCustom}
                create={CognitoUserCreateCustom}
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