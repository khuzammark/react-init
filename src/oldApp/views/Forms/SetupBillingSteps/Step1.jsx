import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

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
  },
  ...customSelectStyle
};

class Step1 extends React.Component {
  state = {
    paymentType: ""
  };
  sendState() {
    return this.state;
  }
  isValidated() {
    const { paymentType } = this.state;
    return paymentType !== "";
  }
  render() {
    const { classes, injectState } = this.props;
    const { paymentType } = this.state;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <h4 className={classes.infoText}>Select a payment type.</h4>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="payment-type-select">
              Select Payment Type
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={paymentType}
              onChange={e =>
                this.setState({ paymentType: e.target.value }, () =>
                  injectState(this.state)
                )
              }
              inputProps={{
                name: "simpleSelect",
                id: "payment-type-select"
              }}
            >
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="bankAccount"
              >
                Bank Account
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="creditCard"
              >
                Credit Card
              </MenuItem>
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object,
  injectState: PropTypes.func
};

export default withStyles(style)(Step1);
