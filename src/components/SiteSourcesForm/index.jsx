import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField } from '@material-ui/core/';

const SiteSourcesForm = ({
    handleChange,
    accounts,
    sources,
    selectedSources
}) => {
    const clickHandle = e => {
        e.preventDefault();
    };
    return (
        <Fragment>
            <Typography variant="h6" gutterbottom="true" align="center">
                Set Site Sources
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
        </Fragment>
    );
};

SiteSourcesForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    siteName: PropTypes.string.isRequired,
    siteDomain: PropTypes.string.isRequired
};

export default SiteSourcesForm;
