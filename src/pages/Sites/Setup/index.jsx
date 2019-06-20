import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import { Wizard, mainTheme, Stepper } from '../../../ui-lib';

import Page from '../../../layouts/Page';
import stepperData from '../../../DummyData/stepper';
import wizardData from '../../../DummyData/wizard';

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
            <div className={classes.tableNavWrapper}>
                <aside className={classes.sideBarContainer}>
                    <Stepper {...stepperData} />
                </aside>
                <div className={classes.tableContainer}>
                    <Wizard {...wizardData} />
                </div>
            </div>
        </Fragment>
    );
};

RecipeDetails.propTypes = {};

export default Page(RecipeDetails);
