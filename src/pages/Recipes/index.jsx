import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import { Hero, RecipeIndex, mainTheme } from '../../ui-lib';

import Page from '../../layouts/Page';
import HeroData from '../../DummyData/hero';
import recipeIndexData from '../../DummyData/recipeIndex';

const useStyles = makeStyles(theme => ({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        margin: theme.spacing(4, 0)
    }
}));

const PricingPage = () => {
    const classes = useStyles(mainTheme);
    return (
        <Fragment>
            <Hero {...HeroData} />
            <div className={classes.cardContainer}>
                <RecipeIndex {...recipeIndexData} />
                <RecipeIndex {...recipeIndexData} />
                <RecipeIndex {...recipeIndexData} />
                <RecipeIndex {...recipeIndexData} />
            </div>
        </Fragment>
    );
};

PricingPage.propTypes = {};

export default Page(PricingPage);
