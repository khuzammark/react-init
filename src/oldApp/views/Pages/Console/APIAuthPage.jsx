import React from "react";
import { Switch, Route } from "react-router-dom";
import APIAuthStartForm from "views/Forms/APIAuthStartForm";
import GoogleStep1 from "views/Forms/GoogleSteps/GoogleStep1";
import GoogleOAuthStep from "views/Forms/GoogleSteps/GoogleOAuthStep";
import GoogleAnalyticsStep2 from "views/Forms/GoogleSteps/GoogleAnalyticsStep2";
import GoogleSearchConsoleStep2 from "views/Forms/GoogleSteps/GoogleSearchConsoleStep2";
import GoogleBigQueryStep2 from "views/Forms/GoogleSteps/GoogleBigQueryStep2";
import AuthRequiredTable from "views/Tables/AuthRequiredTable/AuthRequiredTable";

class APIAuthPage extends React.Component {
  state = {
    authStore: null
  };

  selectAuthStore = authStore => this.setState({ authStore });

  render() {
    const { authStore } = this.state;
    return (
      <Switch>
        <Route path="/dashboard/auth-required" component={AuthRequiredTable} />
        <Route
          path="/dashboard/new-api-connection/google/oauth/callback"
          component={GoogleOAuthStep}
        />
        <Route
          path="/dashboard/new-api-connection/google/analytics/step2"
          render={props =>
            authStore ? (
              <GoogleAnalyticsStep2 {...props} authStore={authStore} />
            ) : (
              <GoogleStep1
                {...props}
                selectAuthStore={this.selectAuthStore}
                authStore={authStore}
              />
            )
          }
        />
        <Route
          path="/dashboard/new-api-connection/google/search-console/step2"
          render={props =>
            authStore ? (
              <GoogleSearchConsoleStep2 {...props} authStore={authStore} />
            ) : (
              <GoogleStep1
                {...props}
                selectAuthStore={this.selectAuthStore}
                authStore={authStore}
              />
            )
          }
        />
        <Route
          path="/dashboard/new-api-connection/google/bigquery/step2"
          render={props =>
            authStore ? (
              <GoogleBigQueryStep2 {...props} authStore={authStore} />
            ) : (
              <GoogleStep1
                {...props}
                selectAuthStore={this.selectAuthStore}
                authStore={authStore}
              />
            )
          }
        />
        <Route
          path="/dashboard/new-api-connection/google/:type"
          render={props => (
            <GoogleStep1
              {...props}
              selectAuthStore={this.selectAuthStore}
              authStore={authStore}
            />
          )}
        />
        <Route
          path="/dashboard/new-api-connection"
          component={APIAuthStartForm}
        />
      </Switch>
    );
  }
}

export default APIAuthPage;
