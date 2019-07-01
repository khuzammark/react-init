import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import LocalPizza from "@material-ui/icons/LocalPizza";
import Layers from "@material-ui/icons/Layers";

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
  constructor(props) {
    super(props);
    this.state = {
      recipename: "",
      recipenameState: "",
      recipedescription: "",
      recipedescriptionState: "",
      recipedescriptionlong: "",
      recipedescriptionlongState: ""
    };
  }
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
      this.state.recipenameState === "success" &&
      this.state.recipedescriptionState === "success" &&
      this.state.recipedescriptionlongState === "success"
    ) {
      return true;
    } else {
      if (this.state.recipenameState !== "success") {
        this.setState({ recipenameState: "error" });
      }
      if (this.state.recipedescriptionState !== "success") {
        this.setState({ recipedescriptionState: "error" });
      }
      if (this.state.recipedescriptionlongState !== "success") {
        this.setState({ recipedescriptionlongState: "error" });
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
            What shall we call this recipe, and what does it do?
          </h4>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            success={this.state.recipenameState === "success"}
            error={this.state.recipenameState === "error"}
            labelText={
              <span>
                Recipe Name <small>(required)</small>
              </span>
            }
            id="recipename"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "recipename", "length", 3),
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
            success={this.state.recipedescriptionState === "success"}
            error={this.state.recipedescriptionState === "error"}
            labelText={
              <span>
                Recipe Short Description <small>(required)</small>
              </span>
            }
            id="recipedescription"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event =>
                this.change(event, "recipedescription", "length", 3),
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
            success={this.state.recipedescriptionlongState === "success"}
            error={this.state.recipedescriptionlongState === "error"}
            labelText={
              <span>
                Recipe Long Description <small>(required)</small>
              </span>
            }
            id="recipedescription"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              rows: 3,
              multiline: true,
              onChange: event =>
                this.change(event, "recipedescriptionlong", "length", 3),
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
        </GridItem>
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
