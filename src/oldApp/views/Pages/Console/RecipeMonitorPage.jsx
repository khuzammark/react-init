import React from "react";
import RecipeInstancesMonitorTable from "views/Tables/RecipeInstancesMonitorTable.jsx";
import RecipeMonitorTabs from "views/Components/RecipeMonitorTabs";
import { Switch, Route } from "react-router-dom";

const RecipeMonitorPage = () => (
  <Switch>
    <Route
      path="/dashboard/admin/recipe-monitor/instances/:recipeInstanceId/dbt-runs"
      component={RecipeMonitorTabs}
      exact
    />
    <Route
      path="/dashboard/admin/recipe-monitor/instances/:recipeInstanceId"
      component={RecipeMonitorTabs}
      exact
    />
    <Route
      path="/dashboard/admin/recipe-monitor/instances"
      exact
      component={RecipeInstancesMonitorTable}
    />
  </Switch>
);

export default RecipeMonitorPage;
