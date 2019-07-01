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
import Refresh from "@material-ui/icons/Refresh";
import DoneOutline from "@material-ui/icons/DoneOutline";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import { RunFeedMutation, FeedErrorsQuery } from "queries/feeds.gql";
import {
  RecipeFeedErrorsQuery,
  MarkErrorDoneMutation
} from "queries/errors.gql";
import { nameFromDataNode } from "lib/utils";

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
    rerunFeedLoading: "",
    markErrorDoneLoading: ""
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

  markErrorDone = errorId => async () => {
    const { markErrorDone } = this.props;
    this.setState({ markErrorDoneLoading: errorId });
    await markErrorDone({
      variables: { errorId },
      refetchQueries: [
        {
          query: RecipeFeedErrorsQuery
        },
        {
          query: FeedErrorsQuery
        }
      ]
    });
    this.setState({
      modalMessage: "Done!",
      markErrorDoneLoading: ""
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
    const { markErrorDoneLoading, rerunFeedLoading } = this.state;
    return (
      <GridContainer>
        {this.renderAlert()}
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <ErrorOutline />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Exception Monitor</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                loading={data.loading}
                data={_.map(
                  _.get(data, "feedErrorsForRecipes.edges", []),
                  ({ node }) => node
                )}
                filterable
                columns={[
                  {
                    Header: "User Email",
                    accessor: "feed.recipeInstance.creatingUser.email"
                  },
                  {
                    Header: "Data Source",
                    accessor: "feed.source.__typename",
                    Cell: ({ value }) => nameFromDataNode[value]
                  },
                  {
                    Header: "Exception Text",
                    accessor: "message"
                  },
                  {
                    Header: "Exception Date",
                    accessor: "created",
                    Cell: ({ value }) => moment(value).format("YYYY-MM-DD")
                  },
                  {
                    Header: "Actions",
                    id: "actions",
                    accessor: node => [node.id, node.feed.id],
                    sortable: false,
                    filterable: false,
                    Cell: ({ value: [errorId, feedId] }) => (
                      <div className="actions-right">
                        <Button
                          justIcon
                          round
                          simple
                          color="warning"
                          title="Re-Run Feeds"
                          onClick={this.rerunFeed(feedId)}
                        >
                          {rerunFeedLoading === feedId ? (
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
                          title="Mark as Done"
                          onClick={this.markErrorDone(errorId)}
                        >
                          {markErrorDoneLoading === errorId ? (
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
  runFeed: PropTypes.func,
  markErrorDone: PropTypes.func
};

export default withStyles(styles)(
  compose(
    graphql(RecipeFeedErrorsQuery),
    graphql(RunFeedMutation, {
      name: "runFeed"
    }),
    graphql(MarkErrorDoneMutation, {
      name: "markErrorDone"
    })
  )(RecipeInstancesMonitorTable)
);
