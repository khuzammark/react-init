import _ from "lodash";

export const nameFromDataNode = {
  GoogleAnalyticsDataSource: "Google Analytics",
  GoogleWebmastersDataSource: "Google Webmasters",
  GoogleAdsAdPerformanceReportDataSource:
    "Google Adwords Ad Performance Report",
  GoogleAdsCampaignPerformanceReportDataSource:
    "Google Adwords Campaign Performance Report",
  GoogleAdsFinalUrlReportDataSource: "Google Adwords Final Url Report",
  BigQueryDataTarget: "BigQuery",
  SemrushDomainOrganicKeywordsDataSource: "SemRush Domain Organic Keywords",
  MajesticBacklinkDataSource: "Majestic Backlinks",
  DeepcrawlAllPagesReportDataSource: "Deepcrawl All Pages Report",
  ShopifyCustomersDataSource: "Shopify Customers",
  ShopifyRefundsDataSource: "Shopify Refunds",
  ShopifyProductsDataSource: "Shopify Products",
  ShopifyOrdersDataSource: "Shopify Orders",
  FacebookAdCreativesDataSource: "Facebook Ad Creatives",
  FacebookAdInsightsDataSource: "Facebook Ad Insights",
  FacebookAdsDataSource: "Facebook Ads",
  AdobeAnalyticsDataSource: "Adobe Analytics"
};

export const descriptionFromDataNode = node =>
  _.get(
    {
      GoogleAnalyticsDataSource: node =>
        `${node.accountName} | ${node.webPropertyName} | ${node.profileName}`,
      GoogleWebmastersDataSource: node => node.site,
      GoogleAdsAdPerformanceReportDataSource: node =>
        `${node.accountId} | ${node.accountName}`,
      GoogleAdsCampaignPerformanceReportDataSource: node =>
        `${node.accountId} | ${node.accountName}`,
      GoogleAdsFinalUrlReportDataSource: node =>
        `${node.accountId} | ${node.accountName}`,
      BigQueryDataTarget: node => `${node.projectName}` || `${node.project}`,
      SemrushDomainOrganicKeywordsDataSource: node => `${node.domain}`,
      MajesticBacklinkDataSource: node => `${node.domain}`,
      DeepcrawlAllPagesReportDataSource: node => `${node.domain}`,
      ShopifyCustomersDataSource: () => `Default Customers`,
      ShopifyRefundsDataSource: node => `Refunds for Order ${node.orderName}`,
      ShopifyProductsDataSource: () => `Default Products`,
      ShopifyOrdersDataSource: () => `Default Orders`,
      FacebookAdCreativesDataSource: node => `${node.adAccountName}`,
      FacebookAdInsightsDataSource: node => `${node.adAccountName}`,
      FacebookAdsDataSource: node => `${node.adAccountName}`,
      AdobeAnalyticsDataSource: node => `${node.name}`
    },
    node.__typename,
    () => "Unknown"
  )(node);

export const typeFromDataNode = {
  GoogleAnalyticsDataSource: "DataSource",
  GoogleWebmastersDataSource: "DataSource",
  GoogleAdsAdPerformanceReportDataSource: "DataSource",
  GoogleAdsCampaignPerformanceReportDataSource: "DataSource",
  GoogleAdsFinalUrlReportDataSource: "DataSource",
  BigQueryDataTarget: "DataTarget",
  SemrushDomainOrganicKeywordsDataSource: "DataSource",
  MajesticBacklinkDataSource: "DataSource",
  DeepcrawlAllPagesReportDataSource: "DataSource",
  ShopifyCustomersDataSource: "DataSource",
  ShopifyRefundsDataSource: "DataSource",
  ShopifyProductsDataSource: "DataSource",
  ShopifyOrdersDataSource: "DataSource",
  FacebookAdCreativesDataSource: "DataSource",
  FacebookAdInsightsDataSource: "DataSource",
  FacebookAdsDataSource: "DataSource",
  AdobeAnalyticsDataSource: "DataSource"
};

export const userShouldEnableBilling = user =>
  !_.get(user, "billingEnabled", false) &&
  _.get(user, "recipeinstanceSet.totalCount", 0) > 0;
