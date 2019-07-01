import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql, compose } from "react-apollo";
import moment from "moment";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
// import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import CloudDownload from "@material-ui/icons/CloudDownload";
import PersonAdd from "@material-ui/icons/PersonAdd";

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
import {
  DataSourcesAndTargetsQuery,
  DeleteDataSource,
  DeleteDataTarget
} from "queries/data.gql";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

import {
  typeFromDataNode,
  nameFromDataNode,
  descriptionFromDataNode
} from "lib/utils";

class ExtendedTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  render() {
    const { classes, data } = this.props;
    const simpleButtons = (node, type) =>
      [
        {
          color: "danger",
          icon: Close,
          onClick: async () => {
            await this.props[`delete${type}`]({
              variables: { id: node.id },
              refetchQueries: [{ query: DataSourcesAndTargetsQuery }]
            });
          }
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
    const integrations = _.concat(
      _.get(data, "dataSources.edges"),
      _.get(data, "dataTargets.edges")
    );
    const tableData = [];
    _.forEach(integrations, ({ node }) => {
      if (typeFromDataNode[node.__typename]) {
        return tableData.push([
          nameFromDataNode[node.__typename],
          descriptionFromDataNode(node),
          "Active",
          moment(node.created).format("MMM Do YYYY, h:mm"),
          simpleButtons(node, typeFromDataNode[node.__typename])
        ]);
      }
    });
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="primary">
                <CloudDownload />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Required APIs</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "Service",
                  "Account Name",
                  "Status",
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
              <a href="/dashboard/new-api-connection">
                <Button color="primary" round className={classes.marginRight}>
                  <PersonAdd className={classes.icons} /> Add New Account
                </Button>
              </a>
              <p>Note: Multiple accounts can be added for each service.</p>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ExtendedTables.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  mutate: PropTypes.func
};

export default withStyles(extendedTablesStyle)(
  compose(
    graphql(DataSourcesAndTargetsQuery),
    graphql(DeleteDataSource, { name: "deleteDataSource" }),
    graphql(DeleteDataTarget, { name: "deleteDataTarget" })
  )(withLoader(ExtendedTables, "linear"))
);
