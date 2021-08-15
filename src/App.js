import logo from './logo.svg';
import './App.css';
import {CTGRecords, CTGAppLayout, CreateCTGNote, AmplifyApp} from "./components/CTGApp";
import {Create, Notes, Layout} from './components/NoteApp';
import {createTheme, MuiThemeProvider} from "@material-ui/core";
import {purple} from "@material-ui/core/colors";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { withAuthenticator,  AmplifySignOut} from "@aws-amplify/ui-react";
import { CTGNoteView } from './components/CTGNoteView';

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
    return (
       <Router>
           <CTGAppLayout>
               <Switch>
                   <Route exact path={"/"}>
                       <CTGRecords></CTGRecords>
                   </Route>
                   <Route path={"/ctg"}>
                       <CTGNoteView 
                            ctgRecord={{username:"patient id",ctgUrl:"doctor comments"}}>
                        </CTGNoteView>
                   </Route>
                   <Route path={"/create"}>
                    <CreateCTGNote></CreateCTGNote>
                   </Route>
               </Switch>
           </CTGAppLayout>
       </Router>
    )
}


function App() {
    return (
      <div className="App">
       <CTGApp></CTGApp>
      </div>
    );
  }
  
export default withAuthenticator(App);
export {CTGApp, NoteApp, withAuthenticator};
