import React from "react";
import { Switch, Route } from "react-router-dom";
import GoogleOAuthStep from "views/Forms/GoogleSteps/GoogleOAuthStep";
import GoogleAuthStoreTable from "views/Tables/GoogleAuthStoreTable";
import MajesticAuthStoreTable from "views/Tables/MajesticAuthStoreTable";
import SemrushAuthStoreTable from "views/Tables/SemrushAuthStoreTable";
import DeepcrawlAuthStoreTable from "views/Tables/DeepcrawlAuthStoreTable";
import ShopifyOAuthStep from "views/Forms/ShopifySteps/ShopifyOAuthStep";
import ShopifyAuthStoreTable from "views/Tables/ShopifyAuthStoreTable";
import FacebookOAuthStep from "views/Forms/FacebookSteps/FacebookOAuthStep";
import FacebookAuthStoreTable from "views/Tables/FacebookAuthStoreTable";
import AdobeAuthStoreTable from "views/Tables/AdobeAuthStoreTable";

class AuthRoutesPage extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/dashboard/auth-stores/google/oauth/callback"
          component={GoogleOAuthStep}
        />
        <Route
          path="/dashboard/auth-stores"
          component={GoogleAuthStoreTable}
          exact
        />
        <Route
          path="/dashboard/auth-stores/google"
          component={GoogleAuthStoreTable}
          exact
        />
        <Route
          path="/dashboard/auth-stores/majestic"
          component={MajesticAuthStoreTable}
          exact
        />
        <Route
          path="/dashboard/auth-stores/semrush"
          component={SemrushAuthStoreTable}
          exact
        />
        <Route
          path="/dashboard/auth-stores/deepcrawl"
          component={DeepcrawlAuthStoreTable}
          exact
        />
        <Route
          path="/dashboard/auth-stores/shopify/oauth/callback"
          component={ShopifyOAuthStep}
        />
        <Route
          path="/dashboard/auth-stores/shopify"
          component={ShopifyAuthStoreTable}
          exact
        />
        <Route
          path="/dashboard/auth-stores/facebook/oauth/callback"
          component={FacebookOAuthStep}
        />
        <Route
          path="/dashboard/auth-stores/facebook"
          component={FacebookAuthStoreTable}
          exact
        />
        <Route
          path="/dashboard/auth-stores/adobe"
          component={AdobeAuthStoreTable}
          exact
        />
      </Switch>
    );
  }
}

export default AuthRoutesPage;
