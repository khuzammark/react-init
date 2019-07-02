import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core/";
import { DropDown } from "ui-lib";

const SiteSourcesForm = ({ handleSelect, sources }) => {
  return (
    <Fragment>
      <Typography variant="h6" gutterbottom="true" align="center">
        Set Site Sources
      </Typography>
      <DropDown sets={sources} handleSelect={handleSelect} single />
    </Fragment>
  );
};

SiteSourcesForm.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  sources: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default SiteSourcesForm;
