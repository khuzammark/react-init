import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql, compose } from "react-apollo";
import moment from "moment";
import { withRouter } from "react-router";
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
// import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Lock from "@material-ui/icons/Lock";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import AuthStoresLinks from "views/Components/AuthStoresLinks.jsx";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

import {
  DoGoogleAuthMutation,
  GoogleAuthsQuery,
  DeleteGoogleAuthMutation
} from "queries/auth/google.gql";

class GoogleAuthStoreTable extends React.Component {
  state = {
    authId: "",
    alert: ""
  };

  addAuthStore = async () => {
    const { location, doGoogleAuth } = this.props;
    localStorage.setItem("oauthPostRedirectUrl", location.pathname);
    const {
      data: {
        doGoogleAuth: { authorizationUrl: authorizationUrl }
      }
    } = await doGoogleAuth();
    window.location.href = authorizationUrl;
  };

  renderAlert = () => {
    const { alert, authId } = this.state;
    const { deleteGoogleAuth, googleAuths } = this.props;
    switch (alert) {
      case "deleteSuccess":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Auth Store Successfully Deleted!"
            onConfirm={() => this.setState({ alert: "" })}
            onCancel={() => this.setState({ alert: "" })}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
          />
        );
      case "confirmDelete":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Are you sure you want to delete this auth store?"
            onConfirm={async () => {
              await deleteGoogleAuth({ variables: { id: authId } });
              this.setState(
                { alert: "deleteSuccess", authId: "" },
                googleAuths.refetch
              );
            }}
            onCancel={() => this.setState({ alert: "", feedId: "" })}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.warning
            }
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { classes, googleAuths } = this.props;
    const simpleButtons = node =>
      [
        // { color: "success", icon: Edit },
        {
          color: "danger",
          icon: Close,
          onClick: () =>
            this.setState({
              authId: node.id,
              alert: "confirmDelete"
            })
        }
      ].map((prop, key) => {
        return (
          <Button
            color={prop.color}
            simple
            className={classes.actionButton}
            key={key}
            onClick={prop.onClick}
          >
            <prop.icon className={classes.icon} />
          </Button>
        );
      });
    const tableData = _.map(
      _.get(googleAuths, "googleAuths.edges", []),
      ({ node }) => [
        _.get(node, "userAuth.email"),
        _.get(node, "userAuth.user.email"),
        _.get(node, "org.name"),
        moment(node.modified).format("MMM Do YYYY, h:mm"),
        simpleButtons(node)
      ]
    );
    return (
      <GridContainer>
        {this.renderAlert()}
        <AuthStoresLinks />
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="primary">
                <Lock />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Google Account Auth</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "Google Account",
                  "User",
                  "Org",
                  "Last Updated",
                  "Actions"
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
                onClick={this.addAuthStore}
              >
                <Lock className={classes.icons} /> Add New Google Auth Store
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

GoogleAuthStoreTable.propTypes = {
  classes: PropTypes.object,
  googleAuths: PropTypes.object,
  location: PropTypes.object,
  doGoogleAuth: PropTypes.func,
  deleteGoogleAuth: PropTypes.func
};

export default withStyles({ ...extendedTablesStyle, ...sweetAlertStyle })(
  compose(
    graphql(GoogleAuthsQuery, { name: "googleAuths" }),
    graphql(DoGoogleAuthMutation, {
      name: "doGoogleAuth",
      options: {
        variables: {
          redirectUri: `${
            window.location.origin
          }/dashboard/auth-stores/google/oauth/callback`
        }
      }
    }),
    graphql(DeleteGoogleAuthMutation, { name: "deleteGoogleAuth" })
  )(withRouter(withLoader(GoogleAuthStoreTable, "linear")))
);
