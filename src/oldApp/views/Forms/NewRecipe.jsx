import React from "react";
import { withRouter } from "react-router";
import { graphql } from "react-apollo";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// core components
import { Wizard } from "components/Wizard/Wizard.jsx";
import wizardStyle from "assets/jss/material-dashboard-pro-react/components/wizardStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { CreateRecipeMutation } from "queries/recipes.gql";
import Step1 from "./NewRecipeSteps/Step1.jsx";
import Step2 from "./NewRecipeSteps/Step2.jsx";
import Step3 from "./NewRecipeSteps/Step3.jsx";

import { RecipesQuery } from "queries/recipes.gql";
import { UserViewerQuery } from "queries/users.gql";

class NewRecipeWizard extends Wizard {
  async finishButtonClick() {
    const { mutate, setLoading, history } = this.props;
    const {
      allStates: {
        0: {
          specs: { recipedescription, recipedescriptionlong, recipename }
        },
        1: {
          feeds: {
            googleAnalytics,
            googleSearchConsole,
            GoogleAdsAdPerformanceReport,
            GoogleAdsCampaignPerformanceReport,
            GoogleAdsFinalUrlReport,
            semrush,
            majestic,
            deepcrawl,
            shopifyCustomers,
            shopifyProducts,
            shopifyOrders,
            shopifyRefunds,
            facebookAds,
            facebookAdCreatives,
            facebookAdInsights,
            adobeAnalytics
          }
        },
        2: {
          models: { gitUrl, gaDimensions, gaMetrics }
        }
      }
    } = this.state;
    setLoading(true);
    await mutate({
      variables: {
        name: recipename,
        description: recipedescription,
        descriptionLong: recipedescriptionlong,
        googleAnalytics,
        googleSearchConsole,
        GoogleAdsAdPerformanceReport,
        GoogleAdsCampaignPerformanceReport,
        GoogleAdsFinalUrlReport,
        semrush,
        majestic,
        deepcrawl,
        shopifyCustomers,
        shopifyProducts,
        shopifyOrders,
        shopifyRefunds,
        facebookAds,
        facebookAdCreatives,
        facebookAdInsights,
        adobeAnalytics,
        gitUrl,
        gaDimensions,
        gaMetrics
      },
      refetchQueries: [{ query: RecipesQuery }, { query: UserViewerQuery }]
    });
    setLoading(false);
    history.push("/dashboard/recipes");
  }
}

const ConnectedNewRecipeWizard = withStyles(wizardStyle)(
  graphql(CreateRecipeMutation)(withRouter(NewRecipeWizard))
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
            <ConnectedNewRecipeWizard
              steps={[
                { stepName: "Specs", stepComponent: Step1, stepId: "specs" },
                { stepName: "Feeds", stepComponent: Step2, stepId: "feeds" },
                { stepName: "Models", stepComponent: Step3, stepId: "models" }
              ]}
              validate
              title="Chef a New Analysis Recipe"
              subtitle="Consisting of data feeds + SQL models."
              setLoading={loading => this.setState({ loading })}
            />
          )}
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
