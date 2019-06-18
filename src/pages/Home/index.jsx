import React, { Component, Fragment } from 'react';
import { Hero, Stepper, RecipeDetail, CTA } from 'dpcomponents';

import Page from '../../layouts/Page';
import HeroData from '../../DummyData/hero';
import StepperData from '../../DummyData/stepper';
import recipeDetailData from '../../DummyData/recipeDetail';
import ctaData from '../../DummyData/cta';

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Hero {...HeroData} />
                <Stepper {...StepperData} />
                <RecipeDetail {...recipeDetailData} />
                <RecipeDetail {...recipeDetailData} />
                <CTA {...ctaData} />
            </Fragment>
        );
    }
}

Home.propTypes = {};

export default Page(Home);
