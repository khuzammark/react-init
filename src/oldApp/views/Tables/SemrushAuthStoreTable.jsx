import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql, compose } from "react-apollo";
import moment from "moment";
import { withRouter } from "react-router";
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

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
  SemrushAuthsQuery,
  DeleteSemrushAuthMutation,
  CreateSemrushAuthMutation
} from "queries/auth/semrush.gql";
import { UserViewerQuery } from "queries/users.gql";

class SemrushAuthStoreTable extends React.Component {
  state = {
    authId: "",
    apiKey: "",
    alert: "",
    name: ""
  };

  addAuthStore = () => this.setState({ alert: "enterApiKey" });

  renderAlert = () => {
    const { alert, authId, apiKey, name } = this.state;
    const { deleteSemrushAuth, createSemrushAuth, classes } = this.props;
    switch (alert) {
      case "enterApiKey":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Enter an API Key"
            onConfirm={async () => {
              await createSemrushAuth({
                variables: { apiKey: apiKey },
                refetchQueries: [
                  { query: SemrushAuthsQuery },
                  { query: UserViewerQuery }
                ]
              });
              this.setState({ alert: "createSuccess", authId: "" });
            }}
            onCancel={() => this.setState({ alert: "", authId: "" })}
            confirmBtnCssClass={`${classes.button} ${classes.warning}`}
          >
            <TextField
              id="name"
              style={{ width: "100%" }}
              label="Enter a Name for this Auth Store"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              margin="normal"
            />
            <TextField
              id="api-key"
              style={{ width: "100%" }}
              label="API Key"
              value={apiKey}
              onChange={e => this.setState({ apiKey: e.target.value })}
              margin="normal"
            />
          </SweetAlert>
        );
      case "deleteSuccess":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Auth Store Successfully Deleted!"
            onConfirm={() => this.setState({ alert: "" })}
            onCancel={() => this.setState({ alert: "" })}
            confirmBtnCssClass={`${classes.button} ${classes.success}`}
          />
        );
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
      case "confirmDelete":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Are you sure you want to delete this auth store?"
            onConfirm={async () => {
              await deleteSemrushAuth({
                variables: { id: authId },
                refetchQueries: [{ query: SemrushAuthsQuery }]
              });
              this.setState({ alert: "deleteSuccess", authId: "" });
            }}
            onCancel={() => this.setState({ alert: "", authId: "" })}
            confirmBtnCssClass={`${classes.button} ${classes.warning}`}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { classes, semrushAuths } = this.props;
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
      _.get(semrushAuths, "semrushAuths.edges", []),
      ({ node }) => [
        _.get(node, "lastAuthedBy.email"),
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
              <h4 className={classes.cardIconTitle}>Semrush Account Auth</h4>
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
                <Lock className={classes.icons} /> Add New Semrush Auth Store
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

SemrushAuthStoreTable.propTypes = {
  classes: PropTypes.object,
  semrushAuths: PropTypes.object,
  deleteSemrushAuth: PropTypes.func,
  createSemrushAuth: PropTypes.func
};

export default withStyles({ ...extendedTablesStyle, ...sweetAlertStyle })(
  compose(
    graphql(SemrushAuthsQuery, { name: "semrushAuths" }),
    graphql(DeleteSemrushAuthMutation, { name: "deleteSemrushAuth" }),
    graphql(CreateSemrushAuthMutation, { name: "createSemrushAuth" })
  )(withRouter(withLoader(SemrushAuthStoreTable, "linear")))
);
