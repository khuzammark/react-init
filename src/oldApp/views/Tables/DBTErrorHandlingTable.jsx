import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import moment from "moment";
import _ from "lodash";
import SweetAlert from "react-bootstrap-sweetalert";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
// @material-ui/icons
import DoneOutline from "@material-ui/icons/DoneOutline";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Refresh from "@material-ui/icons/Refresh";
import Visibility from "@material-ui/icons/Visibility";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import {
  RecipeInstancesDBTErrorsQuery,
  RecipeInstanceDBTErrorsQuery,
  TriggerSinterJobMutation
} from "queries/recipes.gql";
import { MarkErrorDoneMutation } from "queries/errors.gql";

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
    triggerSinterJobLoading: "",
    markErrorDoneLoading: ""
  };

  triggerSinterJob = async () => {
    const { triggerSinterJob, data } = this.props;
    const recipeInstanceId = _.get(data, "recipeInstance.id");
    this.setState({ triggerSinterJobLoading: recipeInstanceId });
    await triggerSinterJob({ variables: { recipeInstanceId } });
    this.setState({
      modalMessage: "DBT Job is now re-running.",
      triggerSinterJobLoading: ""
    });
  };

  markErrorDone = errorId => async () => {
    const { markErrorDone, data } = this.props;
    this.setState({ markErrorDoneLoading: errorId });
    await markErrorDone({
      variables: { errorId },
      refetchQueries: [
        {
          query: RecipeInstancesDBTErrorsQuery
        },
        {
          query: RecipeInstanceDBTErrorsQuery,
          variables: { recipeInstanceId: data.recipeInstance.id }
        }
      ]
    });
    this.setState({
      modalMessage: "Done!",
      markErrorDoneLoading: ""
    });
  };

  viewOnDbt = runId => () =>
    window.open(`https://cloud.getdbt.com/#/accounts/85/runs/${runId}/`);

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
    const { classes, data } = this.props;
    const { markErrorDoneLoading, triggerSinterJobLoading } = this.state;
    const siteName = _.get(data, "recipeInstance.site");
    const recipeName = _.get(data, "recipeInstance.recipe.name");
    return (
      <GridContainer>
        {this.renderAlert()}
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <ErrorOutline />
              </CardIcon>
              <h4
                className={classes.cardIconTitle}
              >{`DBT Errors for ${recipeName} | ${siteName}`}</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                loading={data.loading}
                data={_.map(
                  _.get(data, "recipeInstance.unresolvedDbtErrors.edges", []),
                  ({ node }) => node
                )}
                filterable
                columns={[
                  {
                    Header: "Started At",
                    accessor: "startedAt",
                    Cell: ({ value }) => moment(value).format()
                  },
                  {
                    Header: "Finished At",
                    accessor: "finishedAt",
                    Cell: ({ value }) => moment(value).format()
                  },
                  {
                    Header: "Exception Text",
                    accessor: "message"
                  },
                  {
                    Header: "Actions",
                    id: "actions",
                    accessor: node => [node.id, node.runId],
                    sortable: false,
                    filterable: false,
                    Cell: ({ value: [id, runId] }) => (
                      <div className="actions-right">
                        <Button
                          justIcon
                          round
                          simple
                          color="warning"
                          title="View On DBT Cloud"
                          onClick={this.viewOnDbt(runId)}
                        >
                          <Visibility />
                        </Button>
                        <Button
                          justIcon
                          round
                          simple
                          color="warning"
                          title="Mark as Done"
                          onClick={this.markErrorDone(id)}
                        >
                          {markErrorDoneLoading === id ? (
                            <CircularProgress />
                          ) : (
                            <DoneOutline />
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
            <CardFooter>
              <GridItem>
                {triggerSinterJobLoading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    color="primary"
                    round
                    className={classes.marginRight}
                    onClick={this.triggerSinterJob}
                  >
                    <Refresh className={classes.icons} /> Re-Run DBT Job
                  </Button>
                )}
              </GridItem>
            </CardFooter>
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
  triggerSinterJob: PropTypes.func,
  markErrorDone: PropTypes.func
};

export default withStyles(styles)(
  compose(
    graphql(RecipeInstanceDBTErrorsQuery, {
      options: ({
        match: {
          params: { recipeInstanceId }
        }
      }) => ({
        variables: {
          recipeInstanceId
        }
      })
    }),
    graphql(MarkErrorDoneMutation, {
      name: "markErrorDone"
    }),
    graphql(TriggerSinterJobMutation, {
      name: "triggerSinterJob"
    })
  )(RecipeInstancesMonitorTable)
);
