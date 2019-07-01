import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import SweetAlert from "react-bootstrap-sweetalert";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

// material-ui icons
import DeleteForever from "@material-ui/icons/DeleteForever";
import Timeline from "@material-ui/icons/Timeline";
import Pause from "@material-ui/icons/Pause";
import PlayArrow from "@material-ui/icons/PlayArrow";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import BillingWarning from "components/BillingWarning/BillingWarning.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";

import { UserConsumer } from "contexts/UserContext";
import {
  DeleteRecipeInstanceMutation,
  PauseRecipeInstanceMutation,
  ResumeRecipeInstanceMutation
} from "queries/recipes.gql";
import { UserViewerQuery } from "queries/users.gql";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

function overallStatus(statuses) {
  if (_.some(statuses, x => x === "ERROR")) {
    return "ERROR";
  }
  return "SUCCESS";
}

class MySitesTable extends React.Component {
  state = {
    alert: "",
    recipeInstanceId: "",
    doToggleRecipeState: false
  };

  renderAlert = () => {
    const { alert, recipeInstanceId, doToggleRecipeState } = this.state;
    const {
      deleteRecipeInstance,
      pauseRecipeInstance,
      resumeRecipeInstance,
      classes
    } = this.props;
    switch (alert) {
      case "confirmDelete":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Are you sure?"
            onConfirm={() =>
              deleteRecipeInstance({
                variables: { recipeInstanceId },
                refetchQueries: [{ query: UserViewerQuery }]
              }).then(() =>
                this.setState({ alert: "deleteSuccess", recipeInstanceId: "" })
              )
            }
            onCancel={() => this.setState({ alert: "", recipeInstanceId: "" })}
            confirmBtnCssClass={`${classes.button} ${classes.warning}`}
          />
        );
      case "deleteSuccess":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Successfully Deleted Recipe for Site!"
            onConfirm={() => this.setState({ alert: "" })}
            onCancel={() => this.setState({ alert: "" })}
            confirmBtnCssClass={`${classes.button} ${classes.success}`}
          />
        );
      case "confirmPause":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Pause Site"
            onConfirm={() =>
              this.setState({ doToggleRecipeState: true }, () =>
                pauseRecipeInstance({
                  variables: { recipeInstanceId },
                  refetchQueries: [{ query: UserViewerQuery }]
                }).then(() =>
                  this.setState({
                    doToggleRecipeState: false,
                    alert: "pauseSuccess",
                    recipeInstanceId: ""
                  })
                )
              )
            }
            onCancel={() => this.setState({ alert: "", feedId: "" })}
            confirmBtnCssClass={`${classes.button} ${classes.warning}`}
          >
            {doToggleRecipeState ? (
              <CircularProgress />
            ) : (
              "This will stop processing and billing for this site. Are you sure?"
            )}
          </SweetAlert>
        );
      case "pauseSuccess":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Site Paused"
            onConfirm={() => this.setState({ alert: "" })}
            onCancel={() => this.setState({ alert: "" })}
            confirmBtnCssClass={`${classes.button} ${classes.success}`}
          />
        );
      case "confirmResume":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Pause Site"
            onConfirm={() =>
              this.setState({ doToggleRecipeState: true }, () =>
                resumeRecipeInstance({
                  variables: { recipeInstanceId },
                  refetchQueries: [{ query: UserViewerQuery }]
                }).then(() =>
                  this.setState({
                    doToggleRecipeState: false,
                    alert: "resumeSuccess",
                    recipeInstanceId: ""
                  })
                )
              )
            }
            onCancel={() => this.setState({ alert: "", feedId: "" })}
            confirmBtnCssClass={`${classes.button} ${classes.warning}`}
          >
            {doToggleRecipeState ? (
              <CircularProgress />
            ) : (
              "This will resume processing and billing for this site. Are you sure?"
            )}
          </SweetAlert>
        );
      case "resumeSuccess":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Site Resumed"
            onConfirm={() => this.setState({ alert: "" })}
            onCancel={() => this.setState({ alert: "" })}
            confirmBtnCssClass={`${classes.button} ${classes.success}`}
          />
        );
      default:
        return null;
    }
  };

  getTableHead = () => {
    return [
      "Recipe Name",
      "Site",
      "BigQuery Project Target",
      "Status",
      "Last Feed Run",
      "Last DBT Run",
      "DBT Status",
      "Actions"
    ];
  };

  getTableData = user => {
    const { classes } = this.props;

    return _.map(
      _.get(user, "recipeinstanceSet.edges", []),
      ({
        node: { id, configurations, recipe, feedSet, lastDbtRun, paused }
      }) => {
        const configJson = JSON.parse(configurations);
        return [
          recipe.name,
          <Link key={id} to={`/dashboard/my-sites/${id}`}>
            {configJson.site}
          </Link>,
          _.get(feedSet, "edges[0].node.target.projectName", "?"),
          overallStatus(
            _.map(feedSet.edges, ({ node }) =>
              _.get(node, "latestEvent.status")
            )
          ),
          moment(
            _.max(
              _.map(feedSet.edges, ({ node }) =>
                _.get(node, "latestEvent.created")
              )
            )
          ).format("YYYY-MM-DD"),
          lastDbtRun
            ? moment(lastDbtRun.updatedAt).format("YYYY-MM-DD")
            : "\u2014",
          lastDbtRun
            ? `${lastDbtRun.statusHumanized}${
                _.isNull(lastDbtRun.statusMessage)
                  ? ""
                  : `: ${lastDbtRun.statusMessage})`
              }`
            : "Not yet run",
          <GridContainer direction="column" key={id} alignItems="center">
            <GridItem style={{ width: "100%" }}>
              <Button
                color="danger"
                round
                style={{ width: "100%" }}
                onClick={() =>
                  this.setState({
                    recipeInstanceId: id,
                    alert: "confirmDelete"
                  })
                }
              >
                <DeleteForever className={classes.icons} /> Delete Site
              </Button>
            </GridItem>
            <GridItem style={{ width: "100%" }}>
              {paused ? (
                <Button
                  color="primary"
                  round
                  style={{ width: "100%" }}
                  onClick={() =>
                    this.setState({
                      recipeInstanceId: id,
                      alert: "confirmResume"
                    })
                  }
                >
                  <PlayArrow className={classes.icons} /> Resume Site
                </Button>
              ) : (
                <Button
                  color="primary"
                  round
                  style={{ width: "100%" }}
                  onClick={() =>
                    this.setState({
                      recipeInstanceId: id,
                      alert: "confirmPause"
                    })
                  }
                >
                  <Pause className={classes.icons} /> Pause Site
                </Button>
              )}
            </GridItem>
          </GridContainer>
        ];
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <UserConsumer>
        {user => (
          <GridContainer>
            <BillingWarning user={user} />
            <GridItem xs={12}>
              <Card>
                <CardHeader color="info" icon>
                  <CardIcon color="primary">
                    <Timeline />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>My Sites</h4>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHead={this.getTableHead()}
                    tableData={this.getTableData(user)}
                  />
                </CardBody>
              </Card>
            </GridItem>
            {this.renderAlert()}
          </GridContainer>
        )}
      </UserConsumer>
    );
  }
}

MySitesTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  deleteRecipeInstance: PropTypes.func,
  pauseRecipeInstance: PropTypes.func,
  resumeRecipeInstance: PropTypes.func,
  history: PropTypes.object
};

export default withStyles({
  ...extendedTablesStyle,
  ...sweetAlertStyle
})(
  compose(
    graphql(DeleteRecipeInstanceMutation, { name: "deleteRecipeInstance" }),
    graphql(PauseRecipeInstanceMutation, { name: "pauseRecipeInstance" }),
    graphql(ResumeRecipeInstanceMutation, { name: "resumeRecipeInstance" })
  )(withRouter(withLoader(MySitesTable, "linear")))
);
