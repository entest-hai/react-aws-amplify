import logo from './logo.svg';
import './App.css';
import {SimpleCtgCart, CTGCard } from "./components/CTGCard";
import {Create, Notes, Layout} from './components/AppBar';
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
    // typography: {
    //     fontFamily: "Quicksand",
    //     fontWeightLight: 400,
    //     fontWeightRegular: 500,
    //     fontWeightMedium: 600,
    //     fontWeightBold: 700
    // }
})

function App() {
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

export default App;
