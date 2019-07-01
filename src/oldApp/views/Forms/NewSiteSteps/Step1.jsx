import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import LocalPizza from "@material-ui/icons/LocalPizza";
import Layers from "@material-ui/icons/Layers";
import CalendarToday from "@material-ui/icons/CalendarToday";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  }
};

class Step1 extends React.Component {
  state = {
    site: "",
    siteState: "",
    domain: "",
    domainState: "",
    backfillDate: "",
    backfillDateState: ""
  };
  sendState() {
    return this.state;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (
      this.state.siteState === "success" &&
      this.state.domainState === "success"
    ) {
      return true;
    } else {
      if (this.state.siteState !== "success") {
        this.setState({ siteState: "error" });
      }
      if (this.state.domainState !== "success") {
        this.setState({ domainState: "error" });
      }
    }
    return false;
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <h4 className={classes.infoText}>
            Configure the basics for this recipe.
          </h4>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            success={this.state.siteState === "success"}
            error={this.state.siteState === "error"}
            labelText={
              <span>
                Site <small>(required)</small>
              </span>
            }
            id="recipename"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "site", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <LocalPizza className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            success={this.state.domainState === "success"}
            error={this.state.domainState === "error"}
            labelText={
              <span>
                Domain <small>(required)</small>
              </span>
            }
            id="domain"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "domain", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Layers className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            success={this.state.backfillDateState === "success"}
            error={this.state.backfillDateState === "error"}
            helpText={
              <span>
                Backfill Date <small>(required)</small>
              </span>
            }
            id="backfillDate"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              placeholder: "",
              type: "date",
              onChange: event =>
                this.change(event, "backfillDate", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <CalendarToday className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
