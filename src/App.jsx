import React from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import { useQuery } from 'react-apollo-hooks';
import HealthQuery from './queries/health.gql';
import ApolloWrapper from './ApolloWrapper';
import theme from './ui-lib/theme';
import Error from './components/Error';
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

function App() {
    const { data, loading, error } = useQuery(HealthQuery);
    let inner = (
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
    );
    if (!_.isEmpty(error) || !_.get(data, "health.healthy")) {
        inner = (
            <Error message={_.get(data, "health.error", error)} />
        );
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {loading ? <LinearProgress /> : inner}
        </ThemeProvider>
    );
};

function WrappedApp() {
    return (
        <ApolloWrapper>
            <App />
        </ApolloWrapper>
    );
}

export default WrappedApp;
