import React from "react";
import { Switch, Route } from "react-router-dom";
import DataTargetsTable from "views/Tables/DataTargetsTable";
import DataTargetStartForm from "views/Forms/DataTargetStartForm";
import GoogleStep1 from "views/Forms/GoogleSteps/GoogleStep1";
import GoogleBigQueryStep2 from "views/Forms/GoogleSteps/GoogleBigQueryStep2";

class DataTargetsPage extends React.Component {
  state = {
    authStore: null
  };

  selectAuthStore = authStore => this.setState({ authStore });

  render() {
    const { authStore } = this.state;

    return (
      <Switch>
        <Route
          path="/dashboard/admin/data-targets/new/google/bigquery/step2"
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
          path="/dashboard/admin/data-targets/new/google/:type"
          render={props => (
            <GoogleStep1
              {...props}
              selectAuthStore={this.selectAuthStore}
              authStore={authStore}
            />
          )}
        />
        <Route
          path="/dashboard/admin/data-targets/new"
          component={DataTargetStartForm}
        />
        <Route
          path="/dashboard/admin/data-targets"
          component={DataTargetsTable}
        />
      </Switch>
    );
  }
}

export default DataTargetsPage;
