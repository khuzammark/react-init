import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import { graphql, compose } from "react-apollo";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import SweetAlert from "react-bootstrap-sweetalert";

// material-ui icons
import FlashOn from "@material-ui/icons/FlashOn";
import TrendingUp from "@material-ui/icons/TrendingUp";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import { nameFromDataNode, descriptionFromDataNode } from "lib/utils";
import { RunFeedMutation } from "queries/feeds.gql";
import { RecipeInstanceFeedDetailsQuery } from "queries/recipes.gql";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

class RecipeSiteTable extends React.Component {
  state = {
    alert: "",
    feedId: "",
    doRunFeed: false,
    viewEvents: false
  };

  renderAlert = () => {
    const { alert, feedId, doRunFeed } = this.state;
    const { runFeed } = this.props;
    switch (alert) {
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
  render() {
    const {
      classes,
      data: { loading, recipeInstance }
    } = this.props;
    if (loading) {
      return <LinearProgress />;
    }

    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="primary">
                <FlashOn />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>{`${
                recipeInstance.recipe.name
              } - ${recipeInstance.site}`}</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "Source Type",
                  "Source Name",
                  "Target Type",
                  "Target Table",
                  "Status",
                  "Last Run",
                  "Rows Last Written",
                  "Actions"
                ]}
                tableData={_.map(
                  _.get(recipeInstance, "feedSet.edges", []),
                  ({ node }) => {
                    return [
                      nameFromDataNode[node.source.__typename],
                      descriptionFromDataNode(node.source),
                      nameFromDataNode[node.target.__typename],
                      node.bigqueryTablename,
                      _.get(node, "latestEvent.status", "?"),
                      moment(_.get(node, "latestEvent.created")).format("ll"),
                      _.get(node, "latestEvent.rows"),
                      <Button
                        key={node.id}
                        color="primary"
                        round
                        className={classes.marginRight}
                        onClick={() =>
                          this.setState({
                            feedId: node.id,
                            alert: "confirmRun"
                          })
                        }
                      >
                        <TrendingUp className={classes.icons} /> Run Feed Now
                      </Button>
                    ];
                  }
                )}
              />
            </CardBody>
          </Card>
        </GridItem>
        {this.renderAlert()}
      </GridContainer>
    );
  }
}

RecipeSiteTable.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object,
  deleteFeed: PropTypes.func,
  runFeed: PropTypes.func
};

export default withStyles({ ...extendedTablesStyle, ...sweetAlertStyle })(
  compose(
    graphql(RunFeedMutation, { name: "runFeed" }),
    graphql(RecipeInstanceFeedDetailsQuery, {
      options: ({
        match: {
          params: { siteId }
        }
      }) => ({
        variables: { recipeInstanceId: siteId }
      })
    })
  )(withLoader(RecipeSiteTable, "linear"))
);
