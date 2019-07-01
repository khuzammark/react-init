import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import ActivateRecipesPage from "views/Pages/Console/ActivateRecipesPage.jsx";
import RecipeDetailsPage from "views/Pages/Console/RecipeDetailsPage.jsx";
import { Switch, Route } from "react-router-dom";
import { RecipesQuery } from "queries/recipes.gql";

const RecipesRoutes = ({ data }) => (
  <Switch>
    <Route
      path="/dashboard/activate-recipes/details/:recipeId"
      component={props => <RecipeDetailsPage {...props} data={data} />}
    />
    <Route
      path="/dashboard/activate-recipes"
      component={props => <ActivateRecipesPage {...props} data={data} />}
    />
  </Switch>
);

RecipesRoutes.propTypes = {
  data: PropTypes.object
};

export default graphql(RecipesQuery)(RecipesRoutes);
