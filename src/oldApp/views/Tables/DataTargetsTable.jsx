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
import SaveAlt from "@material-ui/icons/SaveAlt";

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

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

import { DataTargetsQuery, DeleteDataTarget } from "queries/data.gql";
import { nameFromDataNode, descriptionFromDataNode } from "lib/utils";

class DataTargetsTable extends React.Component {
  state = {
    dataTargetId: "",
    alert: ""
  };

  renderAlert = () => {
    const { alert, dataTargetId } = this.state;
    const { deleteDataTarget, dataTargets } = this.props;
    switch (alert) {
      case "deleteSuccess":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title="Data Target Successfully Deleted!"
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
            title="Are you sure you want to delete this data target?"
            onConfirm={async () => {
              await deleteDataTarget({ variables: { id: dataTargetId } });
              this.setState(
                { alert: "deleteSuccess", authId: "" },
                dataTargets.refetch
              );
            }}
            onCancel={() => this.setState({ alert: "", dataTargetId: "" })}
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
    const { classes, dataTargets, history } = this.props;
    const simpleButtons = node =>
      [
        // { color: "success", icon: Edit },
        {
          color: "danger",
          icon: Close,
          onClick: () =>
            this.setState({
              dataTargetId: node.id,
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
      _.get(dataTargets, "dataTargets.edges", []),
      ({ node }) => [
        nameFromDataNode[node.__typename],
        descriptionFromDataNode(node),
        _.get(node, "org.name"),
        moment(node.created).format("MMM Do YYYY, h:mm"),
        simpleButtons(node)
      ]
    );
    return (
      <GridContainer>
        {this.renderAlert()}
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="primary">
                <SaveAlt />
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
                onClick={() =>
                  history.push("/dashboard/admin/data-targets/new")
                }
              >
                <SaveAlt className={classes.icons} /> Add New Data Target
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

DataTargetsTable.propTypes = {
  classes: PropTypes.object,
  dataTargets: PropTypes.object,
  deleteDataTarget: PropTypes.func,
  history: PropTypes.object
};

export default withStyles({ ...extendedTablesStyle, ...sweetAlertStyle })(
  compose(
    graphql(DataTargetsQuery, { name: "dataTargets" }),
    graphql(DeleteDataTarget, { name: "deleteDataTarget" })
  )(withRouter(withLoader(DataTargetsTable, "linear", "dataTargets")))
);
