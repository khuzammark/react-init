import React from "react";
import ExceptionMonitorTable from "views/Tables/ExceptionMonitorTable.jsx";
import ExceptionHandlingTable from "views/Tables/ExceptionHandlingTable.jsx";
import { Switch, Route } from "react-router-dom";

const ExceptionMonitorPage = () => (
  <Switch>
    <Route
      path="/dashboard/admin/exception-monitor/exception-handling"
      exact
      component={ExceptionHandlingTable}
    />
    <Route
      path="/dashboard/admin/exception-monitor"
      exact
      component={ExceptionMonitorTable}
    />
  </Switch>
);

export default ExceptionMonitorPage;
