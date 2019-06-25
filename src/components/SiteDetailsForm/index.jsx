import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField } from '@material-ui/core/';

const SiteDetailsForm = ({ handleChange, siteName, siteDomain }) => {
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
