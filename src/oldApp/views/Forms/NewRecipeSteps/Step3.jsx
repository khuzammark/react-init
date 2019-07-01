import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import CodeIcon from "@material-ui/icons/Code";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import MultiAutocomplete from "components/MultiAutocomplete/MultiAutocomplete.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  ...customSelectStyle
};

const gaDimensionSuggestions = [
  "source",
  "medium",
  "campaign",
  "landingPagePath",
  "hostname",
  "date"
].map(suggestion => ({
  value: suggestion,
  label: suggestion
}));

const gaMetricsSuggestions = [
  "sessions",
  "itemRevenue",
  "transactionRevenue",
  "transactions",
  "avgTimeOnPage",
  "bounceRate",
  "goalCompletionsAll"
]
  .concat(_.map(_.range(1, 21), x => `goal${x}Completions`))
  .map(suggestion => ({
    value: suggestion,
    label: suggestion
  }));

class Step3 extends React.Component {
  state = {
    gitUrl: "",
    gaDimensions: [],
    gaMetrics: []
  };
  sendState() {
    return this.state;
  }
  isValidated() {
    return true;
  }
  changeField = field => e => {
    const { injectState } = this.props;
    this.setState({ [field]: e.target.value }, () =>
      injectState({ models: this.state })
    );
  };
  changeMultiSelect = field => values => {
    const { injectState } = this.props;
    this.setState(
      { [field]: _.map(values, "value") },
      injectState({ models: this.state })
    );
  };
  render() {
    const { classes, allStates } = this.props;
    const { gaDimensions, gaMetrics } = this.state;
    const ga = _.get(allStates, "[1].feeds.ga", false);
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            {`How do you access your DBT project via Git?`}
          </h4>
          <p className={classes.infoText}>
            {"For private repositories on GitHub, you can use a "}
            <a href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/">
              personal access token
            </a>
            {" to grant access to this repo."}
          </p>
          <p className={classes.infoText}>
            By default, SQL models will be run nightly.
          </p>
        </GridItem>
        <GridItem xs={12} sm={10}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <CustomInput
              success={this.state.recipedescriptionState === "success"}
              error={this.state.recipedescriptionState === "error"}
              labelText={
                <span>Enter a git repo in the format of https://***/*.git</span>
              }
              id="recipedescription"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.changeField("gitUrl"),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <CodeIcon className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
        </GridItem>
        {ga ? (
          <React.Fragment>
            <GridItem xs={12} sm={10}>
              <FormControl fullWidth className={classes.selectFormControl}>
                <MultiAutocomplete
                  suggestions={gaDimensionSuggestions}
                  placeholder="Select Dimensions"
                  onChange={this.changeMultiSelect("gaDimensions")}
                  value={_.map(gaDimensions, value => ({
                    label: value,
                    value
                  }))}
                  label="GA Dimensions"
                />
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={10}>
              <FormControl fullWidth className={classes.selectFormControl}>
                <MultiAutocomplete
                  suggestions={gaMetricsSuggestions}
                  placeholder="Select Metrics"
                  onChange={this.changeMultiSelect("gaMetrics")}
                  value={_.map(gaMetrics, value => ({ label: value, value }))}
                  label="GA Metrics"
                />
              </FormControl>
            </GridItem>
          </React.Fragment>
        ) : null}
      </GridContainer>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object,
  injectState: PropTypes.func,
  allStates: PropTypes.any
};

export default withStyles(style)(Step3);
