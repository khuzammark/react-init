import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router";
import _ from "lodash";
// react component for creating dynamic tables
import Table from "components/Table/Table.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
// @material-ui/icons
import ErrorOutline from "@material-ui/icons/ErrorOutline";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { RecipeFeedErrorsQuery } from "queries/errors.gql";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import { nameFromDataNode } from "lib/utils";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class ExceptionMonitorTable extends React.Component {
  state = {
    modalMessage: "",
    rerunFeedsLoading: "",
    triggerSinterJobLoading: ""
  };

  rerunFeeds = recipeInstanceId => async e => {
    e.preventDefault();
    const { runRecipeInstanceFeeds } = this.props;
    this.setState({ rerunFeedsLoading: recipeInstanceId });
    await runRecipeInstanceFeeds({ variables: { recipeInstanceId } });
    this.setState({
      modalMessage: "Feeds now re-running.",
      rerunFeedsLoading: ""
    });
  };

  triggerSinterJob = recipeInstanceId => async e => {
    e.preventDefault();
    const { triggerSinterJob } = this.props;
    this.setState({ triggerSinterJobLoading: recipeInstanceId });
    await triggerSinterJob({ variables: { recipeInstanceId } });
    this.setState({
      modalMessage: "Successfully triggered model re-run.",
      triggerSinterJobLoading: ""
    });
  };

  render() {
    const { classes, data, history } = this.props;
    if (data.loading) {
      return <LinearProgress />;
    }
    const counted = _.countBy(
      _.map(_.get(data, "feedErrorsForRecipes.edges"), ({ node }) =>
        [
          _.get(node, "feed.recipeInstance.recipe.name"),
          nameFromDataNode[_.get(node, "feed.source.__typename")],
          `${node.message.slice(0, 50)}...`
        ].join("|||")
      )
    );
    const tableData = _.map(counted, (count, val) => [
      ...val.split("|||"),
      count
    ]);
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="primary">
                <ErrorOutline />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Exception Summary</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "Recipe",
                  "Data Source",
                  "Exception Text",
                  "Count of Open Exceptions"
                ]}
                tableData={tableData}
                customCellClasses={[classes.center]}
                customClassesForCells={[4]}
                customHeadCellClasses={[classes.center]}
                customHeadClassesForCells={[4]}
              />
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                round
                className={classes.marginRight}
                onClick={() =>
                  history.push(
                    "/dashboard/admin/exception-monitor/exception-handling"
                  )
                }
              >
                <ErrorOutline className={classes.icons} /> Exception Handling
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ExceptionMonitorTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  history: PropTypes.object,
  triggerSinterJob: PropTypes.func,
  runRecipeInstanceFeeds: PropTypes.func
};

export default withStyles(styles)(
  withRouter(compose(graphql(RecipeFeedErrorsQuery))(ExceptionMonitorTable))
);
