//=====================================================================================================================
// Purpose: Route and init the entire app
// Author: TRAN MINH HAI
// Date: 20 AUG 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content
//********************************************************************************************************************/
// 001.   |  23 AUG 2021.     | TRAN MINH HAI      | - Refactor and add header
// 28 SEP 2021 add MyChartAuth to do oauth2 with EPIC MyChart
// need to load fhir-script.js and it will get username, pass from screen
// it also get the return token or code from redirected url.
//********************************************************************************************************************/
// 002.   |  30 SEP 2021.     | TRAN MINH HAI      | - test open FHIR server
//********************************************************************************************************************/
// 003.   |  21 OCT 2021.     | TRAN MINH HAI      | -
// Add UserSessionService shared between components
// TODO: separate admin and users resources path
//********************************************************************************************************************/
// 004.   |  30 SEP 2021.     | TRAN MINH HAI      | - test open FHIR server
//********************************************************************************************************************/
// 005.   |  26 OCT 2021.     | TRAN MINH HAI      | - Authentication flow
// - Use sessionStorage.getItem nd sessionStorage.setItem
// - Use singleton pattern UserProfile.set and UserProfile.get
//********************************************************************************************************************/
// 006.   |  31 OCT 2021.     | TRAN MINH HAI      | - Keep updating canvas in background using web worker
// 007.   |  06 NOV 2021      | TRAN MINH HAI      | - Backup before migrating to Material V5.0
//********************************************************************************************************************/
// 006.   |  07 NOV 2021.     | TRAN MINH HAI      | - How to get theme.mixins.toolbar.minHeight
//=====================================================================================================================
import logo from './logo.svg';
import './App.css';
import {CTGRecords, CTGAppLayout, CreateCTGNote, AmplifyApp} from "./components/CTGApp";
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from "react-router-dom";
import { withAuthenticator,  AmplifySignOut} from "@aws-amplify/ui-react";
import { CTGNoteView } from './components/ctg/CTGNoteView';
import { UploadView } from './components/upload/S3UploadView';
import { CTGLiveView } from './components/canvas/ctgCanvas';
import { TestCtgAnnotateCanvas } from './components/canvas/testCtgAnnotateCanvas';
import {MyChartAuth} from "./components/epic/MyChartAuth";
import {MyChartHome} from "./components/epic/MyChartHome";
import {OpenFhirServer} from "./components/epic/OpenFhirServer";
import {AdminPage} from "./components/admin/Admin";
import {useEffect, useState} from "react";
import {CtgCreateNote} from "./components/ctg/CtgCreateNote";
import {LoginHomePage, LoginProfilePage, UserLoginPage} from "./authentication/UserLoginPage";
import {FHRLiveCanvas, TestWorkerView} from './tests/TestWorkerView';
import {TestGridView} from "./tests/TestGridView";
import {CtgMuiTableTest, TestFHRStaticTrace} from "./tests/TestStaticTrace";
import {ScrollBarDragger} from "./tests/TestScrollBarDragger";
import {TestDownloadS3} from "./tests/TestDownloadS3";
import {API, Auth} from "aws-amplify";
import {getDoctor} from "./graphql/queries";
import {CtgImageViewer} from "./components/ctg/CtgImageViewer";
import {TestInfiniteScroll} from "./tests/TestInfiniteScroll";
import {CtgListDoctorFacing} from "./components/ctg/CtgListDoctorFacing";
import {CtgListAndCtgStaticViewerDoctorFacing} from "./components/ctg/CtgListAndCtgStaticViewerDoctorFacing";
// for mui-datatabe
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import {TestMuiDataTable} from "./tests/TestMuiDataTable";

const CtgLiveWebWorker = () => {
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem('cognitoUserID'),[sessionStorage.getItem('cognitoUserID')])
    useEffect(async () => {
        try {
        let user = await  Auth.signIn("hai", "Hai@865525")
        sessionStorage.setItem('username',user.username)
        sessionStorage.setItem('cognitoUserID',user.attributes.sub)
        setAuthenticated(user.attributes.sub)
        } catch (e) {
            console.log("error auth")
        }
    },)

    if (!authenticated){
        return <UserLoginPage setAuthenticated={setAuthenticated}></UserLoginPage>
    }

    return (
        <ThemeProvider theme={createTheme()}>
            <Router>
                <Switch>
                    <Route exact path={"/"}>
                        <CtgImageViewer
                            ctgS3Url={process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png"}
                        ></CtgImageViewer>
                    </Route>
                    <Route exact path={"/sheep"}>
                        <CtgListAndCtgStaticViewerDoctorFacing>
                        </CtgListAndCtgStaticViewerDoctorFacing>
                    </Route>
                    <Route exact path={"/grid"}>
                        <TestGridView></TestGridView>
                    </Route>
                    <Route path={"/ctg"}>
                       <CTGNoteView></CTGNoteView>
                   </Route>
                    <Route path={"/search"}>
                        <CtgListDoctorFacing tableHeight={'93vh'}>
                        </CtgListDoctorFacing>
                    </Route>
                    <Route path={"/ctg"}>
                       <CTGNoteView></CTGNoteView>
                   </Route>
                    {/*<Route exact path={"/scroll"}>*/}
                    {/*    <ScrollBarDragger></ScrollBarDragger>*/}
                    {/*</Route>*/}
                    {/*<Route exact path={"/s3"}>*/}
                    {/*    <TestDownloadS3></TestDownloadS3>*/}
                    {/*</Route>*/}
                    {/*<Route exact path={"/upload"}>*/}
                    {/*    <UploadView></UploadView>*/}
                    {/*</Route>*/}
                    {/*<Route exact path={"/view"}>*/}
                    {/*    <CtgImageViewer ctgS3Url={process.env.PUBLIC_URL+"/images/STG049B_raw_ctg.png"}></CtgImageViewer>*/}
                    {/*</Route>*/}
                    {/*<Route exact path={"/ctg"}>*/}
                    {/*    <CTGNoteView></CTGNoteView>*/}
                    {/*</Route>*/}
                    {/*<Route exact path={"/records"}>*/}
                    {/*    <CTGRecords></CTGRecords>*/}
                    {/*</Route>*/}
                    {/*<Route exact path={"/inf"}>*/}
                    {/*    <TestInfiniteScroll></TestInfiniteScroll>*/}
                    {/*</Route>*/}
                </Switch>
            </Router>
        </ThemeProvider>
    )
}

function CTGApp() {
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem('cognitoUserID'),[sessionStorage.getItem('cognitoUserID')])
      if (!authenticated){
          return (
              <ThemeProvider theme={createTheme()}>
                  <UserLoginPage setAuthenticated={setAuthenticated}></UserLoginPage>
              </ThemeProvider>
          )
      }
      else if (sessionStorage.getItem('username')=='admin'){
          return (
              <ThemeProvider theme={createTheme()}>
                  <Router>
                      <Switch>
                          <Route exact path={"/"}>
                              <AdminPage setAuthenticated={setAuthenticated}></AdminPage>
                          </Route>
                          <Route path={"/ctg"}>
                              <CtgImageViewer ctgS3Url={null}></CtgImageViewer>
                          </Route>
                      </Switch>
                  </Router>
              </ThemeProvider>
          )
      }
      return (
             <ThemeProvider theme={createTheme()}>
               <Router>
                   <Switch>
                       <CTGAppLayout setAuthenticated={setAuthenticated}>
                           <Route path={"/search"}>
                               <CtgListDoctorFacing
                                    tableHeight={'87vh'}
                               >
                               </CtgListDoctorFacing>
                           </Route>
                           <Route path={"/ctg"}>
                               <CTGNoteView></CTGNoteView>
                           </Route>
                           <Route path={"/create"}>
                                <CtgCreateNote></CtgCreateNote>
                           </Route>
                           <Route path={"/upload"}>
                               <UploadView></UploadView>
                           </Route>
                           <Route path={"/live"}>
                               <TestWorkerView></TestWorkerView>
                           </Route>
                           <Route path={"/grid"}>
                                <TestGridView></TestGridView>
                           </Route>
                           <Route path={"/edit"}>
                               <TestCtgAnnotateCanvas></TestCtgAnnotateCanvas>
                           </Route>
                           <Route path={"/mychart"}>
                               <MyChartAuth></MyChartAuth>
                           </Route>
                           <Route path={"/openfhir"}>
                               <OpenFhirServer></OpenFhirServer>
                           </Route>
                           <Route exact path={"/"}>
                               <CtgListAndCtgStaticViewerDoctorFacing>
                               </CtgListAndCtgStaticViewerDoctorFacing>
                           </Route>
                       </CTGAppLayout>
                   </Switch>
                </Router>
             </ThemeProvider>
      )
}
  
export {CTGApp, CtgLiveWebWorker};
