import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router";
import { compose, graphql } from "react-apollo";
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import AddAlert from "@material-ui/icons/AddAlert";

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

import { UserConsumer } from "contexts/UserContext";
import { DoFacebookAuthMutation } from "queries/auth/facebook.gql";
import { DoGoogleAuthMutation } from "queries/auth/google.gql";
import { DoShopifyAuthMutation } from "queries/auth/shopify.gql";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

import MajesticAuth from "./MajesticAuth";
import SemrushAuth from "./SemrushAuth";
import DeepcrawlAuth from "./DeepcrawlAuth";
import ShopifyAuth from "./ShopifyAuth";

class AuthRequiredTable extends React.Component {
  state = {
    alert: ""
  };

  triggerAuthFlow = (user, authName) => async () => {
    const { location, doFacebookAuth, doGoogleAuth } = this.props;
    const authRequired = _.flatten(
      _.map(_.get(user, "org.recipes.edges", []), "node.authRequired")
    );
    // if we have more auth stores to configure, come back to this page on redirect.
    // otherwise, continue the onboarding flow by going to the recipes page.
    if (authRequired.length == 1) {
      localStorage.setItem("oauthPostRedirectUrl", "/dashboard/recipes");
    } else {
      localStorage.setItem("oauthPostRedirectUrl", location.pathname);
    }
    switch (authName) {
      case "MajesticAuth": {
        this.setState({ alert: "enterMajesticApiKey" });
        break;
      }
      case "SemrushAuth": {
        this.setState({ alert: "enterSemrushApiKey" });
        break;
      }
      case "DeepcrawlAuth": {
        this.setState({ alert: "enterDeepcrawlApiKey" });
        break;
      }
      case "ShopifyAuth": {
        this.setState({ alert: "enterShopifyAuthShop" });
        break;
      }
      case "FacebookAuth": {
        const {
          data: {
            doFacebookAuth: { authorizationUrl: authorizationUrl }
          }
        } = await doFacebookAuth();
        window.location.href = authorizationUrl;
        break;
      }
      case "GoogleAuth": {
        const {
          data: {
            doGoogleAuth: { authorizationUrl: authorizationUrl }
          }
        } = await doGoogleAuth();
        window.location.href = authorizationUrl;
      }
    }
  };

  renderAlert = () => {
    const { alert } = this.state;
    const { classes } = this.props;
    const clearAlert = () => this.setState({ alert: "" });
    const alertSuccess = () => this.setState({ alert: "createSuccess" });
    switch (alert) {
      case "enterMajesticApiKey":
        return (
          <MajesticAuth clearAlert={clearAlert} alertSuccess={alertSuccess} />
        );
      case "enterSemrushApiKey":
        return (
          <SemrushAuth clearAlert={clearAlert} alertSuccess={alertSuccess} />
        );
      case "enterDeepcrawlApiKey":
        return (
          <DeepcrawlAuth clearAlert={clearAlert} alertSuccess={alertSuccess} />
        );
      case "enterShopifyAuthShop":
        return <ShopifyAuth clearAlert={clearAlert} />;
      case "createSuccess":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Auth Store Successfully Created!"
            onConfirm={() => this.setState({ alert: "" })}
            onCancel={() => this.setState({ alert: "" })}
            confirmBtnCssClass={`${classes.button} ${classes.success}`}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <UserConsumer>
        {user => {
          const tableData = _.flatten(
            _.map(_.get(user, "org.recipes.edges", []), ({ node }) =>
              _.map(node.authRequired, authName => [
                node.name,
                authName.replace(/Auth$/, ""),
                <Button
                  key={`${node.name}-${authName}`}
                  round
                  color="primary"
                  className={classes.marginRight}
                  onClick={this.triggerAuthFlow(user, authName)}
                >
                  <AddAlert /> Configure Auth
                </Button>
              ])
            )
          );
          return (
            <GridContainer>
              <GridItem xs={12}>
                <Card>
                  <CardHeader color="info" icon>
                    <CardIcon color="primary">
                      <AddAlert />
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>Auth Required</h4>
                  </CardHeader>
                  <CardBody>
                    {this.renderAlert()}
                    <Table
                      tableHead={["Recipe", "Account Type", "Actions"]}
                      tableData={tableData}
                      customCellClasses={[classes.right]}
                      customClassesForCells={[2]}
                      customHeadCellClasses={[classes.right]}
                      customHeadClassesForCells={[2]}
                    />
                  </CardBody>
                  <CardFooter>
                    <p>
                      This section lists accounts needed to support the recipes
                      you have activated.
                    </p>
                    <p>
                      Note: Multiple accounts can be added for each service.
                    </p>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          );
        }}
      </UserConsumer>
    );
  }
}

AuthRequiredTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  location: PropTypes.object,
  doFacebookAuth: PropTypes.func,
  doGoogleAuth: PropTypes.func,
  doShopifyAuth: PropTypes.func,
  createMajesticAuth: PropTypes.func,
  createSemrushAuth: PropTypes.func,
  createDeepcrawlAuth: PropTypes.func
};

export default withStyles({ ...extendedTablesStyle, ...sweetAlertStyle })(
  compose(
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
    graphql(DoShopifyAuthMutation, { name: "doShopifyAuth" })
  )(withRouter(AuthRequiredTable))
);
