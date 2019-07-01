import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import DataSourceForDomain from "./DataSourceForDomain.jsx";
import GoogleWebmastersDataSource from "./GoogleWebmastersDataSource.jsx";
import GoogleAnalyticsDataSource from "./GoogleAnalyticsDataSource.jsx";
import FacebookAdCreativesDataSource from "./FacebookAdCreativesDataSource.jsx";
import FacebookAdInsightsDataSource from "./FacebookAdInsightsDataSource.jsx";
import FacebookAdsDataSource from "./FacebookAdsDataSource.jsx";
import ShopifyDataSource from "./ShopifyDataSource";

class DataSourceSelectors extends React.Component {
  state = {
    googleAnalyticsDataSource: "",
    googleAnalyticsDataSourceData: {},
    googleWebmastersDataSource: "",
    googleWebmastersDataSourceData: {},
    facebookAdCreativesDataSource: "",
    facebookAdCreativesDataSourceData: {},
    facebookAdInsightsDataSource: "",
    facebookAdInsightsDataSourceData: {},
    facebookAdsDataSource: "",
    facebookAdsDataSourceData: {},
    shopifyDataSourceData: {
      shopifyCustomersDataSourceAuth: "",
      shopifyOrdersDataSourceAuth: "",
      shopifyProductsDataSourceAuth: "",
      shopifyRefundsDataSourceAuth: ""
    }
  };
  render() {
    const { sources, injectState, recipeConfig } = this.props;
    const domain = _.get(recipeConfig, "domain", "?");
    const {
      googleAnalyticsDataSource,
      googleWebmastersDataSource,
      facebookAdsDataSource,
      facebookAdCreativesDataSource,
      facebookAdInsightsDataSource,
      shopifyDataSourceData
    } = this.state;
    const sendUpdate = localState =>
      this.setState({ ...localState }, () => injectState(this.state));
    return _.map(sources, source => {
      switch (source) {
        case "majesticBacklinkDataSource":
          return (
            <DataSourceForDomain key={source} source={source} domain={domain} />
          );
        case "semrushDomainOrganicKeywordsDataSource":
          return (
            <DataSourceForDomain key={source} source={source} domain={domain} />
          );
        case "deepcrawlAllPagesReportDataSource":
          return (
            <DataSourceForDomain key={source} source={source} domain={domain} />
          );
        case "googleWebmastersDataSource":
          return (
            <GoogleWebmastersDataSource
              key={source}
              sendUpdate={sendUpdate}
              googleWebmastersDataSource={googleWebmastersDataSource}
            />
          );
        case "googleAnalyticsDataSource":
          return (
            <GoogleAnalyticsDataSource
              key={source}
              sendUpdate={sendUpdate}
              googleAnalyticsDataSource={googleAnalyticsDataSource}
            />
          );
        case "GoogleAdsAdPerformanceReportDataSource":
          return (
            <DataSourceForDomain source={source} domain={domain} key={source} />
          );
        case "GoogleAdsCampaignPerformanceReportDataSource":
          return (
            <DataSourceForDomain source={source} domain={domain} key={source} />
          );
        case "GoogleAdsFinalUrlReportDataSource":
          return (
            <DataSourceForDomain source={source} domain={domain} key={source} />
          );
        case "facebookAdCreativesDataSource":
          return (
            <FacebookAdCreativesDataSource
              key={source}
              sendUpdate={sendUpdate}
              facebookAdCreativesDataSource={facebookAdCreativesDataSource}
            />
          );
        case "facebookAdInsightsDataSource":
          return (
            <FacebookAdInsightsDataSource
              key={source}
              sendUpdate={sendUpdate}
              facebookAdInsightsDataSource={facebookAdInsightsDataSource}
            />
          );
        case "facebookAdsDataSource":
          return (
            <FacebookAdsDataSource
              key={source}
              sendUpdate={sendUpdate}
              facebookAdsDataSource={facebookAdsDataSource}
            />
          );
        case "shopifyCustomersDataSource":
        case "shopifyOrdersDataSource":
        case "shopifyRefundsDataSource":
        case "shopifyProductsDataSource":
          return (
            <ShopifyDataSource
              key={source}
              sendUpdate={sendUpdate}
              source={source}
              sourceData={shopifyDataSourceData}
            />
          );
        default:
          return null;
      }
    });
  }
}

DataSourceSelectors.propTypes = {
  data: PropTypes.object,
  dataSourcesData: PropTypes.object,
  googleData: PropTypes.object,
  injectState: PropTypes.func,
  sources: PropTypes.array,
  recipeConfig: PropTypes.object
};

export default DataSourceSelectors;
