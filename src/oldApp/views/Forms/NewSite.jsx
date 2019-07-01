import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";

import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import { Wizard } from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { RecipeQuery, CreateRecipeInstanceMutation } from "queries/recipes.gql";
import { UserViewerQuery } from "queries/users.gql";
import wizardStyle from "assets/jss/material-dashboard-pro-react/components/wizardStyle.jsx";

import Step1 from "./NewSiteSteps/Step1.jsx";
import Step2 from "./NewSiteSteps/Step2.jsx";
import Step3 from "./NewSiteSteps/Step3.jsx";

class NewSiteWizard extends Wizard {
  async finishButtonClick() {
    const {
      mutate,
      history,
      setLoading,
      match: {
        params: { recipeId }
      }
    } = this.props;
    const {
      allStates: {
        0: {
          specs: { backfillDate, site, domain }
        },
        1: sourceData,
        2: targetData
      }
    } = this.state;
    setLoading(true);
    const variables = {
      recipeId,
      domain,
      backfillDate,
      site,
      ..._.get(sourceData, "shopifyDataSourceData", {}),
      ..._.get(sourceData, "googleAnalyticsDataSourceData", {}),
      ..._.get(sourceData, "googleWebmastersDataSourceData", {}),
      ..._.get(sourceData, "GoogleAdsAdPerformanceReportDataSourceData", {}),
      ..._.get(
        sourceData,
        "GoogleAdsCampaignPerformanceReportDataSourceData",
        {}
      ),
      ..._.get(sourceData, "GoogleAdsFinalUrlReportDataSourceData", {}),
      ..._.get(sourceData, "majesticBacklinkDataSourceData", {}),
      ..._.get(sourceData, "semrushDomainOrganicKeywordsDataSourceData", {}),
      ..._.get(sourceData, "deepcrawlAllPagesReportDataSourceData", {}),
      ..._.get(sourceData, "shopifyCustomersDataSourceData", {}),
      ..._.get(sourceData, "shopifyProductsDataSourceData", {}),
      ..._.get(sourceData, "shopifyOrdersDataSourceData", {}),
      ..._.get(sourceData, "shopifyRefundsDataSourceData", {}),
      ..._.get(sourceData, "facebookAdsDataSourceData", {}),
      ..._.get(sourceData, "facebookAdCreativesDataSourceData", {}),
      ..._.get(sourceData, "facebookAdInsightsDataSourceData", {}),
      ..._.get(targetData, "bigQueryDataTargetData", {})
    };
    await mutate({
      variables,
      refetchQueries: [{ query: UserViewerQuery }]
    });
    setLoading(false);
    history.push("/dashboard/my-sites"); // for now
  }
}

const ConnectedNewSiteWizard = withStyles(wizardStyle)(
  graphql(CreateRecipeInstanceMutation)(withRouter(NewSiteWizard))
);

class WizardView extends React.Component {
  state = {
    loading: false
  };
  render() {
    const { loading } = this.state;
    const {
      match: {
        params: { recipeId }
      },
      data
    } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          {loading || data.loading ? (
            <CircularProgress />
          ) : (
            <ConnectedNewSiteWizard
              recipeId={recipeId}
              validate
              steps={[
                { stepName: "Specs", stepComponent: Step1, stepId: "specs" },
                {
                  stepName: "Sources",
                  stepComponent: props => (
                    <Step2 {...props} recipe={data.recipe} />
                  ),
                  stepId: "sources"
                },
                {
                  stepName: "Targets",
                  stepComponent: props => (
                    <Step3 {...props} recipe={data.recipe} />
                  ),
                  stepId: "targets"
                }
              ]}
              title={data.recipe.name}
              subtitle={data.recipe.descriptionLong}
              setLoading={loading => this.setState({ loading })}
            />
          )}
        </GridItem>
      </GridContainer>
    );
  }
}

WizardView.propTypes = {
  match: PropTypes.object,
  data: PropTypes.object
};

export default graphql(RecipeQuery, {
  options: ({
    match: {
      params: { recipeId }
    }
  }) => ({
    variables: { recipeId }
  })
})(WizardView);
