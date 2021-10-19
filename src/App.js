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
//=====================================================================================================================
import logo from './logo.svg';
import './App.css';
import {CTGRecords, CTGAppLayout, CreateCTGNote, AmplifyApp} from "./components/CTGApp";
import {Create, Notes, Layout} from './tests/NoteApp';
import {createTheme, MuiThemeProvider} from "@material-ui/core";
import {purple} from "@material-ui/core/colors";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
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

    const [userID, setUserID] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)

    useEffect(async () => {
        let user = await Auth.currentAuthenticatedUser();
        console.log(user.username);
        console.log(user.attributes.sub);
        console.log(user.attributes.email);
        setUserID(user.attributes.sub)
        setUserName(user.attributes.username)
        setUserEmail(user.attributes.email)
    })


    return (
       <Router>
           <CTGAppLayout>
               <Switch>
                   <Route exact path={"/admin"}>
                       <AdminPage></AdminPage>
                   </Route>
                   <Route exact path={"/"} component={CtgImageViewer}>
                       {/*<OpenFhirServer></OpenFhirServer>*/}
                       {/*<MyChartHome></MyChartHome>*/}
                       {/*<CTGRecords></CTGRecords>*/}
                   </Route>
                   <Route path={"/ctg"}>
                       <CTGNoteView 
                            ctgRecord={{username:"patient id",ctgUrl:"doctor comments"}}>
                        </CTGNoteView>
                   </Route>
                   <Route path={"/create"}>
                        <CreateCTGNote></CreateCTGNote>
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
               </Switch>
           </CTGAppLayout>
       </Router>
    )
}


function AdminApp() {
    return (<AdminPage></AdminPage>);
}

function App() {
    return (
         <CTGApp></CTGApp>
    );
  }
  
export default withAuthenticator(App);
export {AdminApp, CTGApp, NoteApp, withAuthenticator};
