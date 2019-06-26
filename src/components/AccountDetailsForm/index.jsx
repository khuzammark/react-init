import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField } from '@material-ui/core/';

const AccountDetailsForm = ({
    handleChange,
    password,
    firstName,
    lastName,
    organization
}) => {
    return (
        <Fragment>
            <Typography variant="h6" gutterbottom="true">
                Account Details
            </Typography>
            <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                value={firstName}
                fullWidth
                autoComplete="fname"
                onChange={handleChange}
            />
            <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                value={lastName}
                fullWidth
                autoComplete="lname"
                onChange={handleChange}
            />
            <TextField
                required
                id="organization"
                name="organization"
                label="Organization"
                value={organization}
                fullWidth
                autoComplete="organization"
                onChange={handleChange}
            />
            <TextField
                id="password"
                label="Password"
                type="password"
                required
                name="password"
                fullWidth
                value={password}
                onChange={handleChange}
                autoComplete="current-password"
            />
        </Fragment>
    );
};

AccountDetailsForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    organization: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
};

export default AccountDetailsForm;
