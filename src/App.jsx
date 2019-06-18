import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import './constants/styles.scss';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/pricing" component={Pricing} />
            </Switch>
        </Router>
    );
};

App.propTypes = {};

export default App;
