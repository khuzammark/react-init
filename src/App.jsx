import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import './constants/styles.scss';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
};

App.propTypes = {};

export default App;
