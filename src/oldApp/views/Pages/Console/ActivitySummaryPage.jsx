import React from "react";
import ActivitySummaryTable from "views/Tables/ActivitySummaryTable.jsx";
import { Switch, Route } from "react-router-dom";

const ActivitySummaryPage = () => (
  <Switch>
    <Route
      path="/dashboard/admin/activity-summary"
      component={ActivitySummaryTable}
    />
  </Switch>
);

export default ActivitySummaryPage;
