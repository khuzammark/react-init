import React from "react";
import { Switch, Route } from "react-router-dom";
import DataSourcesTable from "views/Tables/DataSourcesTable";
import DataSourceStartForm from "views/Forms/DataSourceStartForm";
import GoogleStep1 from "views/Forms/GoogleSteps/GoogleStep1";
import GoogleAnalyticsStep2 from "views/Forms/GoogleSteps/GoogleAnalyticsStep2";
import GoogleSearchConsoleStep2 from "views/Forms/GoogleSteps/GoogleSearchConsoleStep2";
import GoogleAdsAdPerformanceReportStep2 from "views/Forms/GoogleSteps/Ads/GoogleAdsAdPerformanceReportStep2";
import GoogleAdsFinalUrlReportStep2 from "views/Forms/GoogleSteps/Ads/GoogleAdsCampaignPerformanceReportStep2";
import GoogleAdsCampaignPerformanceReportStep2 from "views/Forms/GoogleSteps/Ads/GoogleAdsFinalUrlReportStep2";

import ShopifyStep1 from "views/Forms/ShopifySteps/ShopifyStep1";
import ShopifyRefundsStep2 from "views/Forms/ShopifySteps/ShopifyRefundsStep2";

import FacebookStep1 from "views/Forms/FacebookSteps/FacebookStep1";
import FacebookAdCreativesStep2 from "views/Forms/FacebookSteps/FacebookAdCreativesStep2";
import FacebookAdInsightsStep2 from "views/Forms/FacebookSteps/FacebookAdInsightsStep2";
import FacebookAdsStep2 from "views/Forms/FacebookSteps/FacebookAdsStep2";

import AdobeStep1 from "views/Forms/AdobeSteps/AdobeStep1";
import AdobeAnalyticsStep2 from "views/Forms/AdobeSteps/AdobeAnalyticsStep2";

class DataSourcesPage extends React.Component {
  state = {
    authStore: null
  };

  selectAuthStore = authStore => this.setState({ authStore });

  render() {
    const { authStore } = this.state;

    return (
      <Switch>
        <Route
          path="/dashboard/admin/data-sources/new/google/analytics/step2"
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
          path="/dashboard/admin/data-sources/new/google/search-console/step2"
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
          path="/dashboard/admin/data-sources/new/google/adwords-ad-performance-report/step2"
          render={props =>
            authStore ? (
              <GoogleAdsAdPerformanceReportStep2
                {...props}
                authStore={authStore}
              />
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
          path="/dashboard/admin/data-sources/new/google/adwords-campaign-performance-report/step2"
          render={props =>
            authStore ? (
              <GoogleAdsCampaignPerformanceReportStep2
                {...props}
                authStore={authStore}
              />
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
          path="/dashboard/admin/data-sources/new/google/adwords-final-url-report/step2"
          render={props =>
            authStore ? (
              <GoogleAdsFinalUrlReportStep2 {...props} authStore={authStore} />
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
          path="/dashboard/admin/data-sources/new/google/:type"
          render={props => (
            <GoogleStep1
              {...props}
              selectAuthStore={this.selectAuthStore}
              authStore={authStore}
            />
          )}
        />
        <Route
          path="/dashboard/admin/data-sources/new/shopify/refunds/step2"
          render={props =>
            authStore ? (
              <ShopifyRefundsStep2 {...props} authStore={authStore} />
            ) : (
              <ShopifyStep1
                {...props}
                selectAuthStore={this.selectAuthStore}
                authStore={authStore}
              />
            )
          }
        />
        <Route
          path="/dashboard/admin/data-sources/new/shopify/:type"
          render={props => (
            <ShopifyStep1
              {...props}
              selectAuthStore={this.selectAuthStore}
              authStore={authStore}
            />
          )}
        />
        <Route
          path="/dashboard/admin/data-sources/new/facebook/ad-creatives/step2"
          render={props =>
            authStore ? (
              <FacebookAdCreativesStep2 {...props} authStore={authStore} />
            ) : (
              <FacebookStep1
                {...props}
                selectAuthStore={this.selectAuthStore}
                authStore={authStore}
              />
            )
          }
        />
        <Route
          path="/dashboard/admin/data-sources/new/facebook/ad-insights/step2"
          render={props =>
            authStore ? (
              <FacebookAdInsightsStep2 {...props} authStore={authStore} />
            ) : (
              <FacebookStep1
                {...props}
                selectAuthStore={this.selectAuthStore}
                authStore={authStore}
              />
            )
          }
        />
        <Route
          path="/dashboard/admin/data-sources/new/facebook/ads/step2"
          render={props =>
            authStore ? (
              <FacebookAdsStep2 {...props} authStore={authStore} />
            ) : (
              <FacebookStep1
                {...props}
                selectAuthStore={this.selectAuthStore}
                authStore={authStore}
              />
            )
          }
        />
        <Route
          path="/dashboard/admin/data-sources/new/facebook/:type"
          render={props => (
            <FacebookStep1
              {...props}
              selectAuthStore={this.selectAuthStore}
              authStore={authStore}
            />
          )}
        />
        <Route
          path="/dashboard/admin/data-sources/new/adobe/analytics/step2"
          render={props =>
            authStore ? (
              <AdobeAnalyticsStep2 {...props} authStore={authStore} />
            ) : (
              <AdobeStep1
                {...props}
                selectAuthStore={this.selectAuthStore}
                authStore={authStore}
              />
            )
          }
        />
        <Route
          path="/dashboard/admin/data-sources/new/adobe/:type"
          render={props => (
            <AdobeStep1
              {...props}
              selectAuthStore={this.selectAuthStore}
              authStore={authStore}
            />
          )}
        />
        <Route
          path="/dashboard/admin/data-sources/new"
          component={DataSourceStartForm}
        />
        <Route
          path="/dashboard/admin/data-sources"
          component={DataSourcesTable}
        />
      </Switch>
    );
  }
}

export default DataSourcesPage;
