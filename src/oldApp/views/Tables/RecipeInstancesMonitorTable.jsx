import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router";
import moment from "moment";
import _ from "lodash";
import SweetAlert from "react-bootstrap-sweetalert";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
// @material-ui/icons
import DeveloperBoard from "@material-ui/icons/DeveloperBoard";
import Refresh from "@material-ui/icons/Refresh";
import Dvr from "@material-ui/icons/Dvr";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import {
  RecipeMonitorInstancesQuery,
  TriggerSinterJobMutation,
  RunRecipeInstanceFeedsMutation
} from "queries/recipes.gql";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  ...sweetAlertStyle
};

class RecipeInstancesMonitorTable extends React.Component {
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

  renderAlert = () => {
    const {
      classes: { button, success }
    } = this.props;
    const { modalMessage } = this.state;
    return modalMessage === "" ? null : (
      <SweetAlert
        style={{ display: "block", marginTop: "-100px" }}
        title={modalMessage}
        onConfirm={() => this.setState({ modalMessage: "" })}
        onCancel={() => this.setState({ modalMessage: "" })}
        confirmBtnCssClass={`${button} ${success}`}
      />
    );
  };

  render() {
    const { classes, data, history } = this.props;
    const { triggerSinterJobLoading, rerunFeedsLoading } = this.state;
    return (
      <GridContainer>
        {this.renderAlert()}
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <DeveloperBoard />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Recipe Monitor</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                loading={data.loading}
                data={_.map(
                  _.get(data, "recipeInstances.edges", []),
                  ({ node }) => node
                )}
                filterable
                getTdProps={(state, rowInfo, { Header }) => ({
                  onClick: () => {
                    const id = _.get(rowInfo, "original.id", null);
                    if (Header !== "Actions" && id != null) {
                      history.push(
                        `/dashboard/admin/recipe-monitor/instances/${id}`
                      );
                    }
                  }
                })}
                columns={[
                  {
                    Header: "User Email",
                    accessor: "creatingUser.email"
                  },
                  {
                    Header: "Recipe Name",
                    accessor: "recipe.name"
                  },
                  {
                    Header: "Site",
                    accessor: "site"
                  },
                  {
                    Header: "Last Feed Run",
                    accessor: "lastFeedRun",
                    Cell: ({ value }) =>
                      _.isNull(value)
                        ? "\u2014"
                        : moment(value).format("YYYY-MM-DD")
                  },
                  {
                    Header: "Last DBT Run",
                    accessor: "lastDbtRun",
                    Cell: ({ value }) =>
                      value
                        ? moment(value.updatedAt).format("YYYY-MM-DD")
                        : "\u2014"
                  },
                  {
                    Header: "DBT Status",
                    accessor: "lastDbtRun",
                    Cell: ({ value }) =>
                      value
                        ? `${value.statusHumanized}${
                            _.isNull(value.statusMessage)
                              ? ""
                              : `: ${value.statusMessage})`
                          }`
                        : "Not yet run"
                  },
                  {
                    Header: "Actions",
                    accessor: "id",
                    sortable: false,
                    filterable: false,
                    Cell: ({ value }) => (
                      <div className="actions-right">
                        <Button
                          justIcon
                          round
                          simple
                          color="warning"
                          title="Re-Run Feeds"
                          onClick={this.rerunFeeds(value)}
                        >
                          {rerunFeedsLoading === value ? (
                            <CircularProgress />
                          ) : (
                            <Refresh />
                          )}
                        </Button>
                        <Button
                          justIcon
                          round
                          simple
                          color="warning"
                          title="Re-Run Models"
                          onClick={this.triggerSinterJob(value)}
                        >
                          {triggerSinterJobLoading === value ? (
                            <CircularProgress />
                          ) : (
                            <Dvr />
                          )}
                        </Button>
                      </div>
                    )
                  }
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

RecipeInstancesMonitorTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  history: PropTypes.object,
  runRecipeInstanceFeeds: PropTypes.func,
  triggerSinterJob: PropTypes.func
};

export default withStyles(styles)(
  withRouter(
    compose(
      graphql(RecipeMonitorInstancesQuery),
      graphql(RunRecipeInstanceFeedsMutation, {
        name: "runRecipeInstanceFeeds"
      }),
      graphql(TriggerSinterJobMutation, { name: "triggerSinterJob" })
    )(RecipeInstancesMonitorTable)
  )
);
