import React, { Component, Fragment } from 'react';
import { Hero } from 'dpcomponents';

import Page from '../../layouts/Page';
import HeroData from '../../DummyData/hero';

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Hero {...HeroData} />
            </Fragment>
        );
    }
}

Home.propTypes = {};

export default Page(Home);
