import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import { Hero, mainTheme } from '../../ui-lib';

import Page from '../../layouts/Page';
import HeroData from '../../DummyData/hero';

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

const SitesIndexes = () => {
    const classes = useStyles(mainTheme);
    return (
        <Fragment>
            <Hero {...HeroData} classes={classes.none} />
        </Fragment>
    );
};

SitesIndexes.propTypes = {};

export default Page(SitesIndexes);
