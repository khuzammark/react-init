import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import withApollo from './withApollo';
import theme from './ui-lib/theme';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import RecipesRouter from './pages/Recipes/router';
import SitesRouter from './pages/Sites/router';
import ErrorPage from './pages/404';
import WTF from './pages/WTF';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
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
                    <Route path="/recipes" component={RecipesRouter} />
                    <Route path="/sites" component={SitesRouter} />
                    <Route path="/account" component={Account} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route component={ErrorPage} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export default withApollo(App);
