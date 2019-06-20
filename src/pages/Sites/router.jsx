import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Index from '.';
import Setup from './Setup';

const SitesRouter = () => {
    return (
        <Switch>
            <Route exact path="/sites" component={Index} />
            <Route path="/sites/setup" component={Setup} />
            <Redirect to="/sites" />
        </Switch>
    );
};

export default SitesRouter;
