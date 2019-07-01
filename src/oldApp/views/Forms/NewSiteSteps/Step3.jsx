import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import DataTargetSelectors from "./DataTargetSelectors";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Step3 extends React.Component {
  isValidated = () => true;

  render() {
    const { classes, recipe, injectState } = this.props;

    const dataTargetContentTypes = _.uniq(
      _.map(
        recipe.recipefeedconfigurationSet.edges,
        ({ node }) => node.dataTargetContentTypeName
      )
    );

    return (
      <div>
        <h4 className={classes.infoText}>
          Which data targets are you cooking with?
        </h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <DataTargetSelectors
              injectState={injectState}
              targets={_.map(dataTargetContentTypes, _.camelCase)}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object,
  recipe: PropTypes.object,
  injectState: PropTypes.func
};

export default withStyles(style)(Step3);
