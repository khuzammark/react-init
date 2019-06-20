import React, { Fragment } from 'react';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { CTAButton, mainTheme } from '../../ui-lib';
import Page from '../../layouts/Page';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(8, 4)
    },
    type: {
        margin: theme.spacing(8)
    }
}));

const ErrorPage404 = () => {
    const classes = useStyles(mainTheme);

    return (
        <Fragment>
            <Container maxWidth="md" className={classes.container}>
                <Typography
                    component="h2"
                    align="center"
                    color="primary"
                    variant="h2"
                    className={classes.type}
                >
                    {`Seems like you've fallen off path, this place doesn't exist`}
                </Typography>
                <CTAButton name="Start Over" link="/" color="primary" />
            </Container>
        </Fragment>
    );
};

export default Page(ErrorPage404);
