import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField } from '@material-ui/core/';
import { makeStyles } from '@material-ui/styles';
import mainTheme from '../../ui-lib/theme';

const useStyles = makeStyles(theme => ({
    input: {
        padding: theme.spacing(3, 0)
    }
}));

const SiteDetailsForm = ({ handleChange, siteName, siteDomain }) => {
    const classes = useStyles(mainTheme);
    return (
        <Fragment>
            <Typography variant="h6" gutterbottom="true" align="center">
                Set Site Details
            </Typography>
            <TextField
                required
                id="siteName"
                name="siteName"
                label="Site Name"
                className={classes.input}
                value={siteName}
                fullWidth
                onChange={handleChange}
            />
            <TextField
                required
                id="siteDomain"
                name="siteDomain"
                label="Site Domain"
                value={siteDomain}
                className={classes.input}
                fullWidth
                onChange={handleChange}
            />
        </Fragment>
    );
};

SiteDetailsForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    siteName: PropTypes.string.isRequired,
    siteDomain: PropTypes.string.isRequired
};

export default SiteDetailsForm;
