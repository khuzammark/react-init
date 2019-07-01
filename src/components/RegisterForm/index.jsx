import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox
} from "@material-ui/core/";

const RegisterForm = ({
  handleChange,
  email,
  password,
  firstName,
  lastName,
  organization,
  agreeTOS
}) => {
  return (
    <Fragment>
      <Typography variant="h6" gutterbottom="true">
        Register
      </Typography>
      <TextField
        required
        id="email"
        name="email"
        label="Email"
        value={email}
        fullWidth
        autoComplete="email"
        onChange={handleChange}
      />
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
      <FormControlLabel
        control={
          <Checkbox
            color="secondary"
            required
            onChange={handleChange}
            name="agreeTOS"
            checked={agreeTOS}
            value="yes"
          />
        }
        label="I agree to the terms and conditions"
      />
    </Fragment>
  );
};

RegisterForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  agreeTOS: PropTypes.bool.isRequired
};

export default RegisterForm;
