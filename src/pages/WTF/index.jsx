import React, { Fragment } from 'react';
import { Hero, Stepper, CTA } from 'dpcomponents';

import Page from '../../layouts/Page';
import HeroData from '../../DummyData/hero';
import StepperData from '../../DummyData/stepper';
import ctaData from '../../DummyData/cta';

const Home = () => {
    return (
        <Fragment>
            <Hero {...HeroData} />
            <Stepper {...StepperData} />
            <CTA {...ctaData} />
        </Fragment>
    );
};

Home.propTypes = {};

export default Page(Home);
