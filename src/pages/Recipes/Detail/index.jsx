import React, { Fragment } from 'react';
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
        flexGrow: 1
    }
}));

const RecipeDetails = () => {
    const classes = useStyles(mainTheme);
    return (
        <Fragment>
            <RecipeDetail {...recipeDetailData} />
            <div className={classes.tableNavWrapper}>
                <aside className={classes.sideBarContainer}>
                    <Stepper {...stepperData} />
                </aside>
                <div className={classes.tableContainer}>
                    <SimpleTable {...simpletableData} />
                </div>
            </div>
        </Fragment>
    );
};

RecipeDetails.propTypes = {};

export default Page(RecipeDetails);
