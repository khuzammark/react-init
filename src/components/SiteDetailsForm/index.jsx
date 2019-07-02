import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Typography, TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";
import mainTheme from "ui-lib/theme";
import isUrl from "utils/validation/isUrl";

const useStyles = makeStyles(theme => ({
  input: {
    padding: theme.spacing(3, 0)
  }
}));

const SiteDetailsForm = ({ handleChange, siteName, siteDomain }) => {
  const classes = useStyles(mainTheme);
  const [error, setError] = useState(false);
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
        error={error}
        value={siteDomain}
        helperText={
          error ? "Please Enter A Valid Domain Name With Protocol" : ""
        }
        className={classes.input}
        fullWidth
        onChange={e => {
          e.preventDefault();
          const isValid = isUrl(e.target.value);
          setError(!isValid);
          handleChange(e);
        }}
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
