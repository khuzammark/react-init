import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import RecipesPage from "views/Pages/Marketing/RecipesPage.jsx";
import RecipeDetailsPage from "views/Pages/Marketing/RecipeDetailsPage.jsx";
import { Switch, Route } from "react-router-dom";
import { RecipesQuery } from "queries/recipes.gql";

const RecipesMarkingRoutes = ({ data }) => (
  <Switch>
    <Route
      path="/pages/recipes/:recipeId"
      component={props => <RecipeDetailsPage {...props} data={data} />}
    />
    <Route
      path="/pages/recipes"
      component={props => <RecipesPage {...props} data={data} />}
    />
  </Switch>
);

RecipesMarkingRoutes.propTypes = {
  data: PropTypes.object
};

export default graphql(RecipesQuery)(RecipesMarkingRoutes);
