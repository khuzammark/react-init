import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router";
import { graphql, compose } from "react-apollo";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

// material-ui icons
import AddCircle from "@material-ui/icons/AddCircle";
import Kitchen from "@material-ui/icons/Kitchen";
import Build from "@material-ui/icons/Build";
import Clear from "@material-ui/icons/Clear";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import BillingWarning from "components/BillingWarning/BillingWarning.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import { UserConsumer } from "contexts/UserContext";
import { userShouldEnableBilling } from "lib/utils";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import {
  RecipesQuery,
  ActivateRecipeMutation,
  DeactivateRecipeMutation
} from "queries/recipes.gql";
import { UserViewerQuery } from "queries/users.gql";

class ActivateRecipesTable extends React.Component {
  state = {
    recipeLoading: ""
  };

  toggleRecipe = (recipeId, activatedForOrg) => async e => {
    e.preventDefault();
    const { activateRecipe, deactivateRecipe, history } = this.props;
    this.setState({ recipeLoading: recipeId });
    if (activatedForOrg) {
      await deactivateRecipe({
        variables: { recipeId },
        refetchQueries: [{ query: RecipesQuery }, { query: UserViewerQuery }]
      });
      this.setState({ recipeLoading: "" });
    } else {
      await activateRecipe({
        variables: { recipeId },
        refetchQueries: [{ query: RecipesQuery }, { query: UserViewerQuery }]
      });
      this.setState({ recipeLoading: "" });
      history.push("/dashboard/recipes");
    }
  };

  getTableHead = () => {
    return ["Recipe Name", "Recipe Description", ""];
  };

  getTableData = user => {
    const { data, classes } = this.props;
    const { recipeLoading } = this.state;

    return _.map(
      _.get(data, "recipes.edges", []),
      ({
        node: { id, name, descriptionShort, activatedForOrg, recipeinstanceSet }
      }) => [
        name,
        descriptionShort,
        recipeLoading === id ? (
          <CircularProgress />
        ) : (
          (() => {
            if (activatedForOrg) {
              if (recipeinstanceSet.totalCount > 0) {
                return null;
              }
              return (
                <Button
                  key={id}
                  color="primary"
                  round
                  className={classes.marginRight}
                  onClick={this.toggleRecipe(id, activatedForOrg)}
                >
                  <Clear className={classes.icons} /> Deactivate this Recipe
                </Button>
              );
            }
            if (userShouldEnableBilling(user)) {
              return null;
            }
            return (
              <Button
                key={id}
                color="primary"
                round
                className={classes.marginRight}
                onClick={this.toggleRecipe(id, activatedForOrg)}
              >
                <AddCircle className={classes.icons} /> Activate This Recipe
              </Button>
            );
          })()
        )
      ]
    );
  };

  render() {
    const { classes, history } = this.props;
    return (
      <UserConsumer>
        {user => (
          <GridContainer>
            <BillingWarning user={user} />
            <GridItem xs={12}>
              <Card>
                <CardHeader color="info" icon>
                  <CardIcon color="primary">
                    <Build />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>Activate Recipes</h4>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHead={this.getTableHead()}
                    tableData={this.getTableData(user)}
                  />
                </CardBody>
                <CardFooter>
                  Recipes let you configure feeds for multiple data sources at
                  once.
                  {user.isSuperUser ? (
                    <Button
                      color="primary"
                      round
                      className={classes.marginRight}
                      onClick={() =>
                        history.push("/dashboard/recipes/new-recipe")
                      }
                    >
                      <Kitchen className={classes.icons} /> Chef a New Recipe
                    </Button>
                  ) : null}
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        )}
      </UserConsumer>
    );
  }
}

ActivateRecipesTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  deleteFeed: PropTypes.func,
  runFeed: PropTypes.func,
  history: PropTypes.object,
  activateRecipe: PropTypes.func,
  deactivateRecipe: PropTypes.func
};

export default withStyles({
  ...extendedTablesStyle
})(
  compose(
    graphql(RecipesQuery),
    graphql(ActivateRecipeMutation, { name: "activateRecipe" }),
    graphql(DeactivateRecipeMutation, { name: "deactivateRecipe" })
  )(withRouter(withLoader(ActivateRecipesTable, "linear")))
);
