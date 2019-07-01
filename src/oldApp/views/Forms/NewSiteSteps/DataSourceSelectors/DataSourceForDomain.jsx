import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";

const DataSourceForDomain = ({ source, classes, domain }) => (
  <FormControl fullWidth className={classes.selectFormControl}>
    <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
      Using {domain} for {_.startCase(source)}
    </InputLabel>
  </FormControl>
);

DataSourceForDomain.propTypes = {
  source: PropTypes.string,
  domain: PropTypes.string,
  classes: PropTypes.object
};

export default withStyles(styles)(DataSourceForDomain);
