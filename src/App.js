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
// 001.   |  30 SEP 2021.     | TRAN MINH HAI      | - test open FHIR server
//********************************************************************************************************************/
// 002.   |  21 OCT 2021.     | TRAN MINH HAI      | -
// Add UserSessionService shared between components
// TODO: separate admin and users resources path
//********************************************************************************************************************/
// 001.   |  30 SEP 2021.     | TRAN MINH HAI      | - test open FHIR server
//********************************************************************************************************************/
// 002.   |  26 OCT 2021.     | TRAN MINH HAI      | - Authentication flow
// - Use sessionStorage.getItem nd sessionStorage.setItem
// - Use singleton pattern UserProfile.set and UserProfile.get
//=====================================================================================================================
import logo from './logo.svg';
import './App.css';
import {CTGRecords, CTGAppLayout, CreateCTGNote, AmplifyApp} from "./components/CTGApp";
import {Create, Notes, Layout} from './tests/NoteApp';
import {Button, createTheme, MuiThemeProvider} from "@material-ui/core";
import {purple} from "@material-ui/core/colors";
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from "react-router-dom";
import { withAuthenticator,  AmplifySignOut} from "@aws-amplify/ui-react";
import { CTGNoteView } from './components/ctg/CTGNoteView';
import { UploadView } from './components/upload/S3UploadView';
import { CTGLiveView } from './components/canvas/ctgCanvas';
import { CanvasPlotApp } from './components/canvas/ctgAnnotateCanvas';
import { TestImageViewer } from './tests/TestImageViewer';
import { PersistentDrawerLeft } from './tests/TestDrawer';
import { TestCtgAnnotateCanvas } from './components/canvas/testCtgAnnotateCanvas';
import {MyChartAuth} from "./components/epic/MyChartAuth";
import {MyChartHome} from "./components/epic/MyChartHome";
import {OpenFhirServer} from "./components/epic/OpenFhirServer";
import {AdminPage} from "./components/admin/Admin";
import {useEffect, useState} from "react";
import {Auth} from "aws-amplify";
import {CtgImageViewer} from "./components/ctg/CtgImageViewer";
import {CtgCreateNote} from "./components/ctg/CtgCreateNote";
import {ProtectedRouteTest} from "./components/test/ProtectedRouteTest";
import {ProtectedComponent} from "./components/test/ProtectedComponent";
import {LoginHomePage, LoginProfilePage, UserLoginPage} from "./authentication/UserLoginPage";
import {LoginPage} from "./components/admin/LoginPage";
import {UserProfile} from "./services/UserSessionService";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fefefe"
        },
        secondary: purple
    },
})

function NoteApp() {
  return (
    <MuiThemeProvider theme={theme}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path={"/"}>
                        <Notes>
                        </Notes>
                    </Route>
                    <Route path={"/create"}>
                        <Create>
                        </Create>
                    </Route>
                </Switch>
            </Layout>
        </Router>
    </MuiThemeProvider>
  );
}


function CTGApp() {
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem('cognitoUserID'),[sessionStorage.getItem('cognitoUserID')])
      if (!authenticated){
          return (
              <UserLoginPage setAuthenticated={setAuthenticated}></UserLoginPage>
          )
      }
      else if (sessionStorage.getItem('username')=='admin'){
          return (
              <AdminPage setAuthenticated={setAuthenticated}></AdminPage>
          )
      }
      return (
           <Router>
           <Switch>
               <CTGAppLayout setAuthenticated={setAuthenticated}>
                   <Route exact path={"/"}>
                       <CTGRecords></CTGRecords>
                   </Route>
                   <Route path={"/ctg"}>
                       <CTGNoteView
                            ctgRecord={{username:"patient id",ctgUrl:"doctor comments"}}>
                       </CTGNoteView>
                   </Route>
                   <Route path={"/create"}>
                        <CtgCreateNote></CtgCreateNote>
                   </Route>
                   <Route path={"/upload"}>
                       <UploadView></UploadView>
                   </Route>
                   <Route path={"/livefhr"}>
                        <CTGLiveView></CTGLiveView>
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
               </CTGAppLayout>
           </Switch>
       </Router>
      )
}


function AdminApp() {
    const [token, setToken] = useState(sessionStorage.getItem('cognitoUserID'))
    if (!token) {
        return <UserLoginPage setToken={setToken} ></UserLoginPage>
    }

    return (
       <div>
           <h1>Application</h1>
           <Button
            onClick={() => {
                sessionStorage.clear('cognitoUserID')
                setToken(null)
            }}
           >
               Log out
           </Button>
           <BrowserRouter>
           <Switch>
               <Route path={"/home"}>
                   <LoginHomePage></LoginHomePage>
               </Route>
               <Route path={"/user"}>
                   <LoginProfilePage></LoginProfilePage>
               </Route>
           </Switch>
       </BrowserRouter>
       </div>
    )
}

function App() {
    return (
         <CTGApp></CTGApp>
    );
  }
  
export default (App);
export {AdminApp, CTGApp, NoteApp, withAuthenticator};
