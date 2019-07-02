import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core";
import ReactRouterPropTypes from "react-router-prop-types";
import PropTypes from "prop-types";
import { Stepper, Wizard, PricingCard } from "ui-lib";
import Page from "layouts/Page";
import AccountDetailsForm from "components/AccountDetailsForm";
import BillingDetailsForm from "components/BillingDetailsForm";
import InvoiceTable from "components/InvoiceTable";
import stepperData from "DummyData/stepper";
import pricingData from "DummyData/pricingCard";
import invoiceData from "DummyData/invoice";

const styles = theme => {
  return {
    sideBarContainer: {
      maxWidth: theme.breakpoints.values.sm / 2,
      minWidth: theme.breakpoints.values.sm / 2,
      [theme.breakpoints.down("sm")]: {
        minWidth: 0,
        maxWidth: "none"
      }
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "row",
      height: "fit-content",
      justifyContent: "center",
      alignContent: "flex-start",
      margin: theme.spacing(4),
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        margin: theme.spacing(0)
      }
    },
    contentContainer: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      overflow: "auto"
    },
    cardContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignContent: "center",
      margin: theme.spacing(4, 0)
    }
  };
};

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      organization: "",
      cardName: "",
      cardNumber: "",
      expDate: "",
      cvv: ""
    };
  }

  onComplete = e => {
    const {
      props: { history }
    } = this;
    e.preventDefault();
    console.log("Values from state! ", this.state);
    history.push("/recipes");
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      state: {
        email,
        password,
        firstName,
        lastName,
        organization,
        cardName,
        cardNumber,
        expDate,
        cvv
      },
      props: { classes }
    } = this;
    const cardInformation = { cardName, cardNumber, expDate, cvv };
    return (
      <Fragment>
        <div className={classes.contentWrapper}>
          <aside className={classes.sideBarContainer}>
            <Stepper
              {...{
                ...stepperData,
                detail: true,
                hideLabels: true,
                drawer: true
              }}
            />
          </aside>
          <div className={classes.contentContainer}>
            <Wizard
              completeName="Update"
              onComplete={this.onComplete}
              steps={[
                {
                  name: "Account Details",
                  component: (
                    <AccountDetailsForm
                      handleChange={this.handleChange}
                      email={email}
                      password={password}
                      firstName={firstName}
                      lastName={lastName}
                      organization={organization}
                    />
                  )
                },
                {
                  name: "Billing Details",
                  component: (
                    <BillingDetailsForm
                      handleChange={this.handleChange}
                      cardInformation={cardInformation}
                    />
                  )
                },
                {
                  name: "Pricing",
                  component: (
                    <div className={classes.cardContainer}>
                      <PricingCard {...pricingData} />
                      <PricingCard {...pricingData} />
                      <PricingCard {...pricingData} />
                    </div>
                  ),
                  flex: true
                },
                {
                  name: "InvoiceTable",
                  component: <InvoiceTable {...invoiceData} />,
                  flex: true
                }
              ]}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

Account.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Page(withStyles(styles)(Account));
