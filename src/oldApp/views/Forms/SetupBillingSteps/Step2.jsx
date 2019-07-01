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

import AddCreditCard from "./AddCreditCard.jsx";
import AddBankAccount from "./AddBankAccount.jsx";

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
    const { classes, injectState, allStates } = this.props;
    return (
      <div>
        <h4 className={classes.infoText}>Please enter your payment info.</h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            {_.get(allStates, "0.paymentTypes.paymentType", "") ===
            "creditCard" ? (
              <AddCreditCard injectState={injectState} />
            ) : (
              <AddBankAccount injectState={injectState} />
            )}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object,
  injectState: PropTypes.func,
  allStates: PropTypes.any
};

export default withStyles(style)(Step2);
