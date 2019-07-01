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
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import More from "@material-ui/icons/More";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
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

// for some reason, we need this to get the title of the card to be black.
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

import {
  RecipesQuery,
  ActivateRecipeMutation,
  DeactivateRecipeMutation
} from "queries/recipes.gql";
import { UserViewerQuery } from "queries/users.gql";

class RecipesPage extends React.Component {
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

  render() {
    const { classes, history, data } = this.props;
    const { recipeLoading } = this.state;
    const recipes = _.orderBy(_.map(_.get(data, "recipes.edges", []), "node"), [
      "activatedForOrg",
      "desc"
    ]);

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
                  <h4 className={classes.cardIconTitle}>Recipes</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer alignItems="stretch">
                    {_.map(
                      recipes,
                      ({
                        id,
                        name,
                        descriptionShort,
                        activatedForOrg,
                        recipeinstanceSet,
                        pricePerMonth
                      }) => (
                        <GridItem xs={4} key={id}>
                          <Card>
                            <CardHeader color="info" icon>
                              <CardIcon color="primary">
                                <LibraryBooks />
                              </CardIcon>
                              <span className={classes.cardIconTitle}>
                                {name}
                              </span>
                            </CardHeader>
                            <CardBody>
                              <GridContainer direction="column">
                                <GridItem>
                                  <b>{descriptionShort}</b>
                                </GridItem>
                                <GridItem>
                                  {`$${pricePerMonth} per month`}
                                </GridItem>
                              </GridContainer>
                            </CardBody>
                            <CardFooter>
                              <GridContainer direction="column">
                                <GridItem>
                                  <Button
                                    color="primary"
                                    round
                                    fullWidth
                                    onClick={() =>
                                      history.push(
                                        `/dashboard/activate-recipes/details/${id}`
                                      )
                                    }
                                  >
                                    <More className={classes.icons} />
                                    Learn More
                                  </Button>
                                </GridItem>
                                <GridItem>
                                  {recipeLoading === id ? (
                                    <CircularProgress />
                                  ) : (
                                    (() => {
                                      if (activatedForOrg) {
                                        return (
                                          <Button
                                            key={id}
                                            color="primary"
                                            round
                                            fullWidth
                                            disabled={
                                              recipeinstanceSet.totalCount > 0
                                            }
                                            className={classes.marginRight}
                                            onClick={this.toggleRecipe(
                                              id,
                                              activatedForOrg
                                            )}
                                          >
                                            <Clear className={classes.icons} />{" "}
                                            Deactivate this Recipe
                                          </Button>
                                        );
                                      }
                                      return (
                                        <Button
                                          key={id}
                                          color="primary"
                                          round
                                          fullWidth
                                          disabled={userShouldEnableBilling(
                                            user
                                          )}
                                          className={classes.marginRight}
                                          onClick={this.toggleRecipe(
                                            id,
                                            activatedForOrg
                                          )}
                                        >
                                          <AddCircle
                                            className={classes.icons}
                                          />{" "}
                                          Activate This Recipe
                                        </Button>
                                      );
                                    })()
                                  )}
                                </GridItem>
                              </GridContainer>
                            </CardFooter>
                          </Card>
                        </GridItem>
                      )
                    )}
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  Recipes let you configure feeds for multiple data sources at
                  once.
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
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        )}
      </UserConsumer>
    );
  }
}

RecipesPage.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  deleteFeed: PropTypes.func,
  runFeed: PropTypes.func,
  history: PropTypes.object,
  activateRecipe: PropTypes.func,
  deactivateRecipe: PropTypes.func
};

export default withStyles({ ...extendedTablesStyle })(
  compose(
    graphql(ActivateRecipeMutation, { name: "activateRecipe" }),
    graphql(DeactivateRecipeMutation, { name: "deactivateRecipe" })
  )(withRouter(withLoader(RecipesPage, "linear")))
);
