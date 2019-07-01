import React from "react";
import DBTErrorMonitorTable from "views/Tables/DBTErrorMonitorTable.jsx";
import DBTErrorHandlingTable from "views/Tables/DBTErrorHandlingTable.jsx";
import { Switch, Route } from "react-router-dom";

const DBTErrorMonitorPage = () => (
  <Switch>
    <Route
      path="/dashboard/admin/dbt-error-monitor/:recipeInstanceId"
      exact
      component={DBTErrorHandlingTable}
    />
    <Route
      path="/dashboard/admin/dbt-error-monitor"
      exact
      component={DBTErrorMonitorTable}
    />
  </Switch>
);

export default DBTErrorMonitorPage;
