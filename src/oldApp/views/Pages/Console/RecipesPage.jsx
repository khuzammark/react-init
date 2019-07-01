import React from "react";
import NewSite from "views/Forms/NewSite.jsx";
import NewRecipe from "views/Forms/NewRecipe.jsx";
import RecipeTable from "views/Tables/RecipeTable.jsx";
import { Switch, Route } from "react-router-dom";

const FeedsPage = () => (
  <Switch>
    <Route path="/dashboard/recipes/new-recipe" component={NewRecipe} />
    <Route path="/dashboard/recipes/:recipeId/new-site" component={NewSite} />
    <Route path="/dashboard/recipes" component={RecipeTable} />
  </Switch>
);

export default FeedsPage;
