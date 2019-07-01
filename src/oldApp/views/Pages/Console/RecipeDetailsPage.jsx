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
import Build from "@material-ui/icons/Build";
import Clear from "@material-ui/icons/Clear";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
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

class RecipeDetailsPage extends React.Component {
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
    const {
      classes,
      history,
      match: {
        params: { recipeId }
      },
      data
    } = this.props;
    const { recipeLoading } = this.state;
    const {
      id,
      name,
      descriptionShort,
      descriptionLong,
      configurations,
      activatedForOrg,
      recipeinstanceSet,
      pricePerMonth
    } = _.find(_.map(_.get(data, "recipes.edges", []), "node"), {
      id: recipeId
    });
    let config = {};
    try {
      config = JSON.parse(configurations);
    } catch (err) {
      // oh well
    }
    const gitUrl = _.get(config, "git_url");

    return (
      <UserConsumer>
        {user => (
          <GridContainer>
            <BillingWarning user={user} />
            <GridItem xs={12}>
              <Card>
                <CardHeader color="info" icon>
                  <GridContainer justify="space-between">
                    <GridItem>
                      <CardIcon color="primary">
                        <Build />
                      </CardIcon>
                    </GridItem>
                    <GridItem>
                      <h4 className={classes.cardIconTitle}>
                        {`Recipes -- ${name}`}
                      </h4>
                    </GridItem>
                    <GridItem>
                      <Button
                        justIcon
                        round
                        style={{ paddingTop: "5px" }}
                        onClick={() =>
                          history.push("/dashboard/activate-recipes")
                        }
                      >
                        <Close />
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardHeader>
                <CardBody>
                  <GridContainer direction="column">
                    <GridItem>
                      <b>{descriptionShort}</b>
                    </GridItem>
                    <GridItem>{descriptionLong}</GridItem>
                    <GridItem>
                      <b>Git URL:</b> {gitUrl}
                    </GridItem>
                    <GridItem>{`$${pricePerMonth} per month`}</GridItem>
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
                                disabled={recipeinstanceSet.totalCount > 0}
                                className={classes.marginRight}
                                onClick={this.toggleRecipe(id, activatedForOrg)}
                              >
                                <Clear className={classes.icons} /> Deactivate
                                this Recipe
                              </Button>
                            );
                          }
                          return (
                            <Button
                              key={id}
                              color="primary"
                              round
                              fullWidth
                              disabled={userShouldEnableBilling(user)}
                              className={classes.marginRight}
                              onClick={this.toggleRecipe(id, activatedForOrg)}
                            >
                              <AddCircle className={classes.icons} /> Activate
                              This Recipe
                            </Button>
                          );
                        })()
                      )}
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        )}
      </UserConsumer>
    );
  }
}

RecipeDetailsPage.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  deleteFeed: PropTypes.func,
  runFeed: PropTypes.func,
  history: PropTypes.object,
  activateRecipe: PropTypes.func,
  deactivateRecipe: PropTypes.func,
  match: PropTypes.object
};

export default withStyles({ ...extendedTablesStyle })(
  compose(
    graphql(ActivateRecipeMutation, { name: "activateRecipe" }),
    graphql(DeactivateRecipeMutation, { name: "deactivateRecipe" })
  )(withRouter(withLoader(RecipeDetailsPage, "linear")))
);
