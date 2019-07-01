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
  DoFacebookAuthMutation,
  FacebookAuthsQuery,
  DeleteFacebookAuthMutation
} from "queries/auth/facebook.gql";

class FacebookAuthStoreTable extends React.Component {
  state = {
    authId: "",
    alert: ""
  };

  addAuthStore = async () => {
    const { location, doFacebookAuth } = this.props;
    localStorage.setItem("oauthPostRedirectUrl", location.pathname);
    const {
      data: {
        doFacebookAuth: { authorizationUrl: authorizationUrl }
      }
    } = await doFacebookAuth();
    window.location.href = authorizationUrl;
  };

  renderAlert = () => {
    const { alert, authId } = this.state;
    const { deleteFacebookAuth, facebookAuths } = this.props;
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
              await deleteFacebookAuth({ variables: { id: authId } });
              this.setState(
                { alert: "deleteSuccess", authId: "" },
                facebookAuths.refetch
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
    const { classes, facebookAuths } = this.props;
    const simpleButtons = node =>
      [
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
      _.get(facebookAuths, "facebookAuths.edges", []),
      ({ node }) => [
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
              <h4 className={classes.cardIconTitle}>Facebook Auth Stores</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={["Creating User", "Org", "Last Updated", "Actions"]}
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
                <Lock className={classes.icons} /> Add New Facebook Auth Store
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

FacebookAuthStoreTable.propTypes = {
  classes: PropTypes.object,
  facebookAuths: PropTypes.object,
  location: PropTypes.object,
  doFacebookAuth: PropTypes.func,
  deleteFacebookAuth: PropTypes.func
};

export default withStyles({ ...extendedTablesStyle, ...sweetAlertStyle })(
  compose(
    graphql(FacebookAuthsQuery, { name: "facebookAuths" }),
    graphql(DoFacebookAuthMutation, {
      name: "doFacebookAuth",
      options: {
        variables: {
          redirectUri: `${
            window.location.origin
          }/dashboard/auth-stores/facebook/oauth/callback`
        }
      }
    }),
    graphql(DeleteFacebookAuthMutation, { name: "deleteFacebookAuth" })
  )(withRouter(withLoader(FacebookAuthStoreTable, "linear")))
);
