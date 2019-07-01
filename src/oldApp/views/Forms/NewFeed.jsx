import React from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";

import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import { Wizard } from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import wizardStyle from "assets/jss/material-dashboard-pro-react/components/wizardStyle.jsx";
import { CreateFeedMutation } from "queries/feeds.gql";
import Step1 from "./FeedSteps/Step1.jsx";
import Step2 from "./FeedSteps/Step2.jsx";
import Step3 from "./FeedSteps/Step3.jsx";

class FeedWizard extends Wizard {
  async finishButtonClick() {
    const { mutate, history, setLoading } = this.props;
    const {
      allStates: {
        0: {
          specs: { feedname, feeddescription, backfillDate }
        },
        1: { dataSourceId },
        2: { dataTargetId }
      }
    } = this.state;
    setLoading(true);
    await mutate({
      variables: {
        sourceId: dataSourceId,
        targetId: dataTargetId,
        name: feedname,
        description: feeddescription,
        startDate: backfillDate
      }
    });
    setLoading(false);
    history.push("/dashboard/admin/feeds"); // for now
  }
}

const ConnectedRecipeWizard = withStyles(wizardStyle)(
  graphql(CreateFeedMutation)(withRouter(FeedWizard))
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
            <ConnectedRecipeWizard
              validate
              steps={[
                { stepName: "Specs", stepComponent: Step1, stepId: "specs" },
                { stepName: "Source", stepComponent: Step2, stepId: "source" },
                { stepName: "Target", stepComponent: Step3, stepId: "target" }
              ]}
              title="Create a New Feed"
              subtitle="Consisting of data sources and targets."
              setLoading={loading => this.setState({ loading })}
            />
          )}
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
