import React from "react";
import _ from "lodash";
import { withRouter } from "react-router";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const tabs = {
  "/auth-stores": 0,
  "/auth-stores/google": 0,
  "/auth-stores/majestic": 1,
  "/auth-stores/semrush": 2,
  "/auth-stores/deepcrawl": 3,
  "/auth-stores/shopify": 4,
  "/auth-stores/facebook": 5,
  "/auth-stores/adobe": 6
};

export default withRouter(({ location, history }) => (
  <Tabs value={_.get(tabs, location.pathname, 0)} onChange={this.handleChange}>
    <Tab
      label="Google"
      onClick={() => history.push("/dashboard/auth-stores/google")}
    />
    <Tab
      label="Majestic"
      onClick={() => history.push("/dashboard/auth-stores/majestic")}
    />
    <Tab
      label="SemRush"
      onClick={() => history.push("/dashboard/auth-stores/semrush")}
    />
    <Tab
      label="Deepcrawl"
      onClick={() => history.push("/dashboard/auth-stores/deepcrawl")}
    />
    <Tab
      label="Shopify"
      onClick={() => history.push("/dashboard/auth-stores/shopify")}
    />
    <Tab
      label="Facebook"
      onClick={() => history.push("/dashboard/auth-stores/facebook")}
    />
    <Tab
      label="Adobe"
      onClick={() => history.push("/dashboard/auth-stores/adobe")}
    />
  </Tabs>
));
