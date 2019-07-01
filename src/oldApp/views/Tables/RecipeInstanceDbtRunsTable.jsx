import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import _ from "lodash";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import DeveloperBoard from "@material-ui/icons/DeveloperBoard";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { RecipeInstanceDbtRunsQuery } from "queries/recipes.gql";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  ...sweetAlertStyle
};

class RecipeInstanceDbtRunsTable extends React.Component {
  render() {
    const { classes, data } = this.props;
    const { recipeInstance, loading } = data;
    const recipeName = _.get(recipeInstance, "recipe.name", "?");
    const recipeSite = _.get(recipeInstance, "site", "?");
    const creatingUserEmail = _.get(recipeInstance, "creatingUser.email", "?");
    const cardTitle = loading
      ? "..."
      : `${recipeName} - ${recipeSite} for ${creatingUserEmail}`;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <DeveloperBoard />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>{cardTitle}</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                loading={loading}
                data={_.map(
                  _.get(recipeInstance, "dbtRuns.edges", []),
                  ({ node }) => node
                )}
                filterable
                columns={[
                  {
                    Header: "Finished At",
                    accessor: "finishedAt",
                    Cell: ({ original: { finishedAtHumanized } }) =>
                      finishedAtHumanized
                  },
                  {
                    Header: "Duration",
                    accessor: "duration",
                    Cell: ({ original: { durationHumanized } }) =>
                      durationHumanized
                  },
                  {
                    Header: "Status",
                    accessor: "statusHumanized"
                  },
                  {
                    Header: "Message",
                    accessor: "statusMessage",
                    Cell: ({ value }) => (value ? value : "\u2014")
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

RecipeInstanceDbtRunsTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object
};

export default withStyles(styles)(
  compose(
    graphql(RecipeInstanceDbtRunsQuery, {
      options: ({
        match: {
          params: { recipeInstanceId }
        }
      }) => ({ variables: { recipeInstanceId } })
    })
  )(RecipeInstanceDbtRunsTable)
);
