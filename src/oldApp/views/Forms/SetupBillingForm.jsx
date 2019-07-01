import React from "react";
import _ from "lodash";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router";
import { injectStripe, Elements } from "react-stripe-elements";

import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import { Wizard } from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import {
  AddBankAccountMutation,
  AddCreditCardMutation
} from "queries/billing.gql";
import { UserViewerQuery } from "queries/users.gql";
import wizardStyle from "assets/jss/material-dashboard-pro-react/components/wizardStyle.jsx";

import Step1 from "./SetupBillingSteps/Step1.jsx";
import Step2 from "./SetupBillingSteps/Step2.jsx";

class SetupBillingWizard extends Wizard {
  async finishButtonClick() {
    const { history, setLoading } = this.props;
    const { allStates } = this.state;
    try {
      if (_.get(allStates, "0.paymentTypes.paymentType") === "creditCard") {
        await this.addCreditCard();
      } else {
        await this.addBankAccount();
      }
      setLoading(false);
      history.push("/dashboard/billing"); // for now
    } catch (err) {
      alert(err); // for now
    }
  }

  async addBankAccount() {
    const { stripe, addBankAccount, setLoading } = this.props;
    const {
      allStates: {
        1: { routingNumber, accountNumber, accountHolderName, setAsDefault }
      }
    } = this.state;
    const { token } = await stripe.createToken("bank_account", {
      country: "US",
      currency: "usd",
      routing_number: routingNumber,
      account_number: accountNumber,
      account_holder_name: accountHolderName,
      account_holder_type: "individual"
    });
    setLoading(true);
    return addBankAccount({
      variables: {
        stripeToken: token.id,
        setAsDefault
      },
      refetchQueries: [{ query: UserViewerQuery }]
    });
  }

  async addCreditCard() {
    const { stripe, addCreditCard, setLoading } = this.props;
    const {
      allStates: {
        1: { firstName, lastName, setAsDefault }
      }
    } = this.state;
    const { token } = await stripe.createToken({
      name: `Store a new card for ${firstName} ${lastName}`
    });
    setLoading(true);
    return addCreditCard({
      variables: {
        stripeToken: token.id,
        firstName,
        lastName,
        setAsDefault
      },
      refetchQueries: [{ query: UserViewerQuery }]
    });
  }
}

const ConnectedSetupBillingWizard = withStyles(wizardStyle)(
  compose(
    graphql(AddCreditCardMutation, { name: "addCreditCard" }),
    graphql(AddBankAccountMutation, { name: "addBankAccount" })
  )(withRouter(injectStripe(SetupBillingWizard)))
);

class WizardView extends React.Component {
  state = {
    loading: false
  };
  render() {
    const { loading } = this.state;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Elements>
              <ConnectedSetupBillingWizard
                validate
                steps={[
                  {
                    stepName: "Choose a Payment Type",
                    stepComponent: Step1,
                    stepId: "paymentTypes"
                  },
                  {
                    stepName: "Configure Payment",
                    stepComponent: props => <Step2 {...props} />,
                    stepId: "paymentInfo"
                  }
                ]}
                title={"Set Up Billing."}
                subtitle={"Add a Payment Method."}
                setLoading={loading => this.setState({ loading })}
              />
            </Elements>
          )}
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
