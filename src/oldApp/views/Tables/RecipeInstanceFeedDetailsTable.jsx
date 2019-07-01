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
import DeveloperBoard from "@material-ui/icons/DeveloperBoard";
import Refresh from "@material-ui/icons/Refresh";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { RecipeInstanceFeedDetailsQuery } from "queries/recipes.gql";
import { RunFeedMutation } from "queries/feeds.gql";
import { nameFromDataNode, descriptionFromDataNode } from "lib/utils";

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

class RecipeInstanceFeedDetailsTable extends React.Component {
  state = {
    modalMessage: "",
    rerunFeedLoading: "",
    triggerSinterJobLoading: ""
  };

  rerunFeed = feedId => async () => {
    const { runFeed } = this.props;
    this.setState({ rerunFeedLoading: feedId });
    await runFeed({ variables: { feedId } });
    this.setState({
      modalMessage: "Feed is now re-running.",
      rerunFeedLoading: ""
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
    const { classes, data } = this.props;
    const { rerunFeedLoading } = this.state;
    const { recipeInstance, loading } = data;
    const recipeName = _.get(recipeInstance, "recipe.name", "?");
    const recipeSite = _.get(recipeInstance, "site", "?");
    const creatingUserEmail = _.get(recipeInstance, "creatingUser.email", "?");
    const cardTitle = loading
      ? "..."
      : `${recipeName} - ${recipeSite} for ${creatingUserEmail}`;
    return (
      <GridContainer>
        {this.renderAlert()}
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <DeveloperBoard />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>{cardTitle}</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                loading={loading}
                data={_.map(
                  _.get(recipeInstance, "feedSet.edges", []),
                  ({ node }) => node
                )}
                filterable
                columns={[
                  {
                    id: "sourceType",
                    Header: "Source Type",
                    accessor: "source",
                    Cell: ({ value }) => nameFromDataNode[value.__typename]
                  },
                  {
                    id: "sourceName",
                    Header: "Source Name",
                    accessor: "source",
                    Cell: ({ value }) => descriptionFromDataNode(value)
                  },
                  {
                    id: "status",
                    Header: "Status",
                    accessor: "latestEvent.status"
                  },
                  {
                    id: "error",
                    Header: "Error",
                    accessor: "latestEvent.latestError",
                    Cell: ({ value }) =>
                      !value
                        ? "\u2014"
                        : `${value.errorClass}: ${value.message}`
                  },
                  {
                    id: "lastFeedRun",
                    Header: "Last Feed Run",
                    accessor: "latestEvent.modified",
                    Cell: ({ value }) => moment(value).format("YYYY-MM-DD")
                  },
                  {
                    id: "rowsLastWritten",
                    Header: "Rows Last Written",
                    accessor: "latestEvent.rows"
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
                          title="Re-Run Feed"
                          onClick={this.rerunFeed(value)}
                        >
                          {rerunFeedLoading === value ? (
                            <CircularProgress />
                          ) : (
                            <Refresh />
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

RecipeInstanceFeedDetailsTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  runFeed: PropTypes.func
};

export default withStyles(styles)(
  compose(
    graphql(RecipeInstanceFeedDetailsQuery, {
      options: ({
        match: {
          params: { recipeInstanceId }
        }
      }) => ({ variables: { recipeInstanceId } })
    }),
    graphql(RunFeedMutation, { name: "runFeed" })
  )(RecipeInstanceFeedDetailsTable)
);
