import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './ui-lib/theme';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Recipes from "./pages/Recipes";
import Detail from "./pages/Detail";
import ErrorPage from './pages/404';
import WTF from './pages/WTF';
import Login from './pages/Login';
import Register from './pages/Register';
import './constants/styles.scss';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/wtf" component={WTF} />
                    <Route path="/pricing" component={Pricing} />
                    <Route path="/recipes" component={Recipes} />
                    <Route path="/recipe-detail" component={Detail} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route component={ErrorPage} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

App.propTypes = {};

export default App;
