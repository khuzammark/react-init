import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, TextField } from "@material-ui/core/";
import { Link } from "ui-lib";

const LoginForm = ({ handleChange, email, password }) => {
  return (
    <Fragment>
      <Typography variant="h6" gutterbottom="true">
        Login
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
        id="password"
        label="Password"
        type="password"
        name="password"
        margin="normal"
        fullWidth
        value={password}
        onChange={handleChange}
        autoComplete="current-password"
      />
      <Typography
        variant="body1"
        component="p"
        align="center"
        gutterbottom="true"
        style={{ paddingTop: 16 }}
      >
        {`Don't have an account? `}
        <Link
          name="Register"
          link="/register"
          href="/register"
          color="primary"
          button={false}
        />
      </Typography>
    </Fragment>
  );
};

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;
