import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router";
import { graphql, compose } from "react-apollo";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

// material-ui icons
import DeleteForever from "@material-ui/icons/DeleteForever";
import TrendingUp from "@material-ui/icons/TrendingUp";
import Timeline from "@material-ui/icons/Timeline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

import {
  DeleteFeedMutation,
  RunFeedMutation,
  FeedsQuery
} from "queries/feeds.gql";
import { nameFromDataNode, descriptionFromDataNode } from "lib/utils";

class FeedTable extends React.Component {
  state = {
    alert: "",
    feedId: "",
    doRunFeed: false,
    viewEvents: false
  };

  renderAlert = () => {
    const { alert, feedId, doRunFeed } = this.state;
    const { deleteFeed, runFeed } = this.props;
    switch (alert) {
      case "confirmDelete":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Are you sure?"
            onConfirm={() =>
              deleteFeed({
                variables: { feedId },
                refetchQueries: [{ query: FeedsQuery }]
              }).then(() =>
                this.setState({ alert: "deleteSuccess", feedId: "" })
              )
            }
            onCancel={() => this.setState({ alert: "", feedId: "" })}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.warning
            }
          />
        );
      case "deleteSuccess":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Feed Successfully Deleted!"
            onConfirm={() => this.setState({ alert: "" })}
            onCancel={() => this.setState({ alert: "" })}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
          />
        );
      case "confirmRun":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Run Feed"
            onConfirm={() =>
              this.setState({ doRunFeed: true }, () =>
                runFeed({ variables: { feedId } }).then(() =>
                  this.setState({ alert: "runSuccess", feedId: "" })
                )
              )
            }
            onCancel={() => this.setState({ alert: "", feedId: "" })}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.warning
            }
          >
            {doRunFeed ? <CircularProgress /> : "Are you sure?"}
          </SweetAlert>
        );
      case "runSuccess":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Running Feed"
            onConfirm={() => this.setState({ alert: "" })}
            onCancel={() => this.setState({ alert: "" })}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
          />
        );
      default:
        return null;
    }
  };

  getTableHead = () => {
    const { viewEvents } = this.state;

    if (viewEvents) {
      return [
        "Feed Name",
        "Feed Description",
        "Status",
        "Last Updated",
        "Rows Last Written"
      ];
    }

    return [
      "Feed Name",
      "Feed Description",
      "Source Type",
      "Source Name",
      "Target Type",
      "Target Name",
      "",
      "",
      "Actions"
    ];
  };

  getTableData = () => {
    const { data, classes } = this.props;
    const { viewEvents } = this.state;

    if (viewEvents) {
      return _.map(
        _.get(data, "feeds.edges", []),
        ({ node: { name, description, latestEvent } }) => [
          name,
          description,
          _.get(latestEvent, "status", "NOT YET RUN"),
          latestEvent
            ? moment(latestEvent.modified).format("MMM Do YYYY, h:mm")
            : "",
          _.get(latestEvent, "rows", "")
        ]
      );
    }

    return _.map(
      _.get(data, "feeds.edges", []),
      ({ node: { id, name, description, source, target } }) => [
        name,
        description,
        nameFromDataNode[source.__typename],
        descriptionFromDataNode(source),
        nameFromDataNode[target.__typename],
        descriptionFromDataNode(target),
        "",
        <Button
          key={id}
          color="danger"
          round
          className={classes.marginRight}
          onClick={() => this.setState({ feedId: id, alert: "confirmDelete" })}
        >
          <DeleteForever className={classes.icons} /> Delete Feed
        </Button>,
        <Button
          key={id}
          color="primary"
          round
          className={classes.marginRight}
          onClick={() => this.setState({ feedId: id, alert: "confirmRun" })}
        >
          <TrendingUp className={classes.icons} /> Run Feed Now
        </Button>
      ]
    );
  };

  render() {
    const { classes, history } = this.props;
    const { viewEvents } = this.state;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="primary">
                <Timeline />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Feeds</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={this.getTableHead()}
                tableData={this.getTableData()}
              />
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                round
                className={classes.marginRight}
                onClick={() => history.push("/dashboard/admin/feeds/new")}
              >
                <Timeline className={classes.icons} /> Add New Feed
              </Button>

              <Button
                color="primary"
                round
                className={classes.marginRight}
                onClick={() => this.setState({ viewEvents: !viewEvents })}
              >
                <TrendingUp className={classes.icons} />{" "}
                {viewEvents ? "Feed Details" : "Event Details"}
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        {this.renderAlert()}
      </GridContainer>
    );
  }
}

FeedTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  deleteFeed: PropTypes.func,
  runFeed: PropTypes.func,
  history: PropTypes.object
};

export default withStyles({
  ...extendedTablesStyle,
  ...sweetAlertStyle
})(
  compose(
    graphql(FeedsQuery),
    graphql(DeleteFeedMutation, { name: "deleteFeed" }),
    graphql(RunFeedMutation, { name: "runFeed" })
  )(withRouter(withLoader(FeedTable, "linear")))
);
