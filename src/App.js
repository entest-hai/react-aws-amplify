import logo from './logo.svg';
import './App.css';
import {CTGRecords, SimpleCtgCart, CTGAppLayout, CreateCTGNote} from "./components/CTGApp";
import {Create, Notes, Layout} from './components/NoteApp';
import {createTheme, MuiThemeProvider} from "@material-ui/core";
import {purple} from "@material-ui/core/colors";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


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
                       <SimpleCtgCart></SimpleCtgCart>
                   </Route>
                   <Route path={"/create"}>
                    <CreateCTGNote></CreateCTGNote>
                   </Route>
               </Switch>
           </CTGAppLayout>
       </Router>
    )
}


export {CTGApp, NoteApp};
