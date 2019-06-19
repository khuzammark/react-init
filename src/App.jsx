import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Recipes from './pages/Recipes';
import WTF from './pages/WTF';
import Login from './pages/Login';
import Register from './pages/Register';
import './constants/styles.scss';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/wtf" component={WTF} />
                <Route path="/pricing" component={Pricing} />
                <Route path="/recipes" component={Recipes} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        </Router>
    );
};

App.propTypes = {};

export default App;
