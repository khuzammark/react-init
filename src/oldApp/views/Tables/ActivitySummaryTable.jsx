import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import moment from "moment";
import _ from "lodash";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Toc from "@material-ui/icons/Toc";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { UserActivitySummaryQuery } from "queries/users.gql";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class ActivitySummaryTable extends React.Component {
  render() {
    const { classes, data } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Toc />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Activity Summary</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                loading={data.loading}
                data={_.map(_.get(data, "users.edges", []), ({ node }) => node)}
                filterable
                columns={[
                  {
                    Header: "Email",
                    accessor: "email"
                  },
                  {
                    id: "orgName",
                    Header: "Org Name",
                    accessor: x => _.get(x, "orgSet.edges[0].node.name")
                  },
                  {
                    Header: "# of Sites",
                    accessor: "totalSites"
                  },
                  {
                    Header: "Signup Date",
                    accessor: "created",
                    style: { textAlign: "right" },
                    Cell: ({ value }) => moment(value).format("YYYY-MM-DD")
                  }
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ActivitySummaryTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object
};

export default withStyles(styles)(
  graphql(UserActivitySummaryQuery)(ActivitySummaryTable)
);
