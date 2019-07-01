import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { RecipeDetail, mainTheme, Stepper, SimpleTable } from '../../../ui-lib';

import Page from '../../../layouts/Page';
import recipeDetailData from '../../../DummyData/recipeDetail';
import stepperData from '../../../DummyData/stepper';
import simpletableData from '../../../DummyData/simpletable';

const useStyles = makeStyles(theme => ({
    sideBarContainer: {
        maxWidth: theme.breakpoints.values.sm / 2
    },
    tableNavWrapper: {
        display: 'flex',
        felxDirection: 'wrap',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
    },
    tableContainer: {
        flexGrow: 1,
        padding: theme.spacing(0, 4)
    }
}));

const RecipeDetails = ({ authenticated, match }) => {
    const classes = useStyles(mainTheme);
    const {
        params: { id }
    } = match;
    if (id !== '1') {
        return <Redirect to="/recipes" />;
    }
    return (
        <Fragment>
            <RecipeDetail {...recipeDetailData} />
            <div className={classes.tableNavWrapper}>
                <aside className={classes.sideBarContainer}>
                    <Stepper {...{ ...stepperData, detail: true }} />
                </aside>
                <div className={classes.tableContainer}>
                    <SimpleTable {...simpletableData} />
                    {authenticated ? null : <div />}
                </div>
            </div>
        </Fragment>
    );
};

RecipeDetails.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    match: ReactRouterPropTypes.match.isRequired
};

export default Page(RecipeDetails);
