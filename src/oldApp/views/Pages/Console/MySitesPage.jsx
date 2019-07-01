import React from "react";
import MySitesTable from "views/Tables/MySitesTable.jsx";
import RecipeSiteTable from "views/Tables/RecipeSiteTable.jsx";
import { Switch, Route } from "react-router-dom";

const FeedsPage = () => (
  <Switch>
    <Route path="/dashboard/my-sites/:siteId" component={RecipeSiteTable} />
    <Route path="/dashboard/my-sites" component={MySitesTable} />
  </Switch>
);

export default FeedsPage;
