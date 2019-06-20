import React, { Fragment } from 'react';
import { Hero, Stepper, RecipeDetail, CTA } from '../../ui-lib';

import Page from '../../layouts/Page';
import HeroData from '../../DummyData/hero';
import StepperData from '../../DummyData/stepper';
import recipeDetailData from '../../DummyData/recipeDetail';
import ctaData from '../../DummyData/cta';

const Home = () => {
    return (
        <Fragment>
            <Hero {...HeroData} />
            <Stepper {...StepperData} />
            <RecipeDetail {...recipeDetailData} />
            <RecipeDetail {...recipeDetailData} />
            <CTA {...ctaData} />
        </Fragment>
    );
};

Home.propTypes = {};

export default Page(Home);
