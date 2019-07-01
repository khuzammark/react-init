import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import headerLinksStyle from "assets/jss/material-dashboard-pro-react/components/headerLinksStyle";
import Persona from "./Persona.jsx";

class HeaderLinks extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Persona classes={classes} />
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
};

export default withStyles(headerLinksStyle)(HeaderLinks);
