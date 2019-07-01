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

import DataSourceSelectors from "./DataSourceSelectors/DataSourceSelectors.jsx";

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

class Step2 extends React.Component {
  isValidated = () => true;

  render() {
    const { classes, recipe, injectState, allStates } = this.props;

    const dataSourceContentTypes = _.uniq(
      _.map(
        recipe.recipefeedconfigurationSet.edges,
        ({ node }) => node.dataSourceContentTypeName
      )
    );

    return (
      <div>
        <h4 className={classes.infoText}>
          Which data sources are you cooking with?
        </h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <DataSourceSelectors
              injectState={injectState}
              sources={_.map(dataSourceContentTypes, _.camelCase)}
              recipeConfig={_.get(allStates, "0.specs", {})}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object,
  recipe: PropTypes.object,
  injectState: PropTypes.func,
  allStates: PropTypes.any
};

export default withStyles(style)(Step2);
