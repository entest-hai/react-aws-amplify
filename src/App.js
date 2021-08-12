import logo from './logo.svg';
import './App.css';
import {Create, Notes} from './components/AppBar';
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
            <Switch>
                <Route exact path={"/"}>
                    <Notes></Notes>
                </Route>
                <Route path={"/create"}>
                    <Create></Create>
                </Route>
            </Switch>
        </Router>
    </MuiThemeProvider>
  );
}

export default App;
