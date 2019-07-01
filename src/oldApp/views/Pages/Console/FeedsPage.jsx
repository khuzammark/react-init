import React from "react";
import NewFeed from "views/Forms/NewFeed.jsx";
import FeedTable from "views/Tables/FeedTable.jsx";
import { Switch, Route } from "react-router-dom";

const FeedsPage = () => (
  <Switch>
    <Route path="/dashboard/admin/feeds/new" component={NewFeed} />
    <Route path="/dashboard/admin/feeds" component={FeedTable} />
  </Switch>
);

export default FeedsPage;
