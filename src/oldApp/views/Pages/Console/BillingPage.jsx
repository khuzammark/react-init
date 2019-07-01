import React from "react";
import BillingLandingPage from "./BillingLandingPage";
import SetupBillingForm from "views/Forms/SetupBillingForm";
import { Switch, Route } from "react-router-dom";

const FeedsPage = () => (
  <Switch>
    <Route path="/dashboard/billing/add-payment" component={SetupBillingForm} />
    <Route
      path="/dashboard/billing/invoice/:invoiceId"
      component={BillingLandingPage}
    />
    <Route path="/dashboard/billing" component={BillingLandingPage} />
  </Switch>
);

export default FeedsPage;
