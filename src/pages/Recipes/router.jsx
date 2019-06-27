import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Index from '.';
import Detail from './Detail';

const RecipesRouter = () => {
    return (
        <Switch>
            <Route exact path="/recipes" component={Index} />
            <Route path="/recipes/detail/:id" component={Detail} />
            <Redirect to="/recipes" />
        </Switch>
    );
};

export default RecipesRouter;
