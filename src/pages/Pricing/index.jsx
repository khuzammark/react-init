import React, { Fragment } from 'react';
import { Hero, PricingCard, mainTheme } from 'dpcomponents';
import { makeStyles } from '@material-ui/core';

import Page from '../../layouts/Page';
import HeroData from '../../DummyData/hero';
import pricingData from '../../DummyData/pricingCard';
import './styles.scss';

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
                <PricingCard {...pricingData} />
                <PricingCard {...pricingData} />
                <PricingCard {...pricingData} />
            </div>
        </Fragment>
    );
};

PricingPage.propTypes = {};

export default Page(PricingPage);
