import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import { withRouter } from "react-router";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import Receipt from "@material-ui/icons/Receipt";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Badge from "components/Badge/Badge.jsx";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

class InvoicesTable extends React.Component {
  getTableHead = () => {
    return ["Invoice Name", "Issue Date", "Due Date", "Status", ""];
  };

  getTableData = () => {
    const { data, history } = this.props;

    return _.map(
      _.get(data, "invoices.edges", []),
      ({ node: { id, name, created, dueDate, status } }) => [
        name,
        moment(created).format("ll"),
        moment(dueDate).format("ll"),
        <Badge key={id} color={status === "BALANCE DUE" ? "danger" : "success"}>
          {status}
        </Badge>,
        <Button
          key={id}
          color="rose"
          round
          onClick={() => history.push(`/dashboard/billing/invoice/${id}`)}
        >
          View Invoice
        </Button>
      ]
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="primary">
                <Receipt />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Billing and Invoices</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={this.getTableHead()}
                tableData={this.getTableData()}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

InvoicesTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  history: PropTypes.object
};

export default withStyles({
  ...extendedTablesStyle
})(withRouter(InvoicesTable));
