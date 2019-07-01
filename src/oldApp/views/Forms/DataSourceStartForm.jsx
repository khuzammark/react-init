import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import TableChart from "@material-ui/icons/TableChart";
import List from "@material-ui/icons/List";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import authAccountPageStyle from "assets/jss/material-dashboard-pro-react/views/authAccountPageStyle.jsx";

class DataSourceStartForm extends React.Component {
  render() {
    const { classes, history } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <h2>Add a New Data Store</h2>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>Google Analytics</h6>
                    <div className={classes.icon}>
                      <TableChart className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull sessions and goal completions by landing page, source
                      and medium.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/google/analytics"
                        )
                      }
                    >
                      Connect GA
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>
                      Google Search Console
                    </h6>
                    <div className={classes.icon}>
                      <List className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull impressions and clicks by landing page and search
                      query.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/google/search-console"
                        )
                      }
                    >
                      Connect GSC
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>
                      Google Adwords Ad Performance Report
                    </h6>
                    <div className={classes.icon}>
                      <List className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull adwords ad perfomance reports for a specified
                      account.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/google/adwords-ad-performance-report"
                        )
                      }
                    >
                      Connect Adwords APR
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>
                      Google Adwords Campaign Performance Report
                    </h6>
                    <div className={classes.icon}>
                      <List className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull adwords ads campaign perfomance reports for an
                      account.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/google/adwords-campaign-performance-report"
                        )
                      }
                    >
                      Connect Adwords CPR
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>
                      Google Adwords Final Url Report
                    </h6>
                    <div className={classes.icon}>
                      <List className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull adwords final url reports for a specified account.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/google/adwords-final-url-report"
                        )
                      }
                    >
                      Connect Adwords FUR
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>SEMRUSH </h6>
                    <div className={classes.icon}>
                      <TableChart className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull domain organic search keywords from semrush
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/semrush/domain-organic-search-keywords"
                        )
                      }
                    >
                      Connect SEMRUSH
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>Majestic</h6>
                    <div className={classes.icon}>
                      <TableChart className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull Majestic Backlinks data
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/dashboard/admin/data-sources/new/majestic/backlinks"
                        )
                      }
                    >
                      Connect Majestic
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>Deepcrawl</h6>
                    <div className={classes.icon}>
                      <List className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull All Pages Report from deepcrawl.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/deepcrawl/all-pages-report"
                        )
                      }
                    >
                      Connect Deepcrawl
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>
                      Shopify Order Refunds
                    </h6>
                    <div className={classes.icon}>
                      <List className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull refunds data for a given shopify order.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/shopify/refunds"
                        )
                      }
                    >
                      Connect SP Refunds
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>
                      Facebook Ad Creatives
                    </h6>
                    <div className={classes.icon}>
                      <TableChart className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull Facebook Ad Creatives.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/facebook/ad-creatives"
                        )
                      }
                    >
                      Connect FB Creatives
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>
                      Facebook Ad Insights
                    </h6>
                    <div className={classes.icon}>
                      <List className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull facebook ad insights.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/facebook/ad-insights"
                        )
                      }
                    >
                      Connect FB Insights
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>Facebook Ads</h6>
                    <div className={classes.icon}>
                      <List className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull facebook ads.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/facebook/ads"
                        )
                      }
                    >
                      Connect FB Ads
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={4}>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>Adobe Analytics</h6>
                    <div className={classes.icon}>
                      <TableChart className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${
                        classes.marginTop30
                      }`}
                    >
                      Pull Facebook Ad Creatives.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        history.push(
                          "/dashboard/admin/data-sources/new/adobe/analytics"
                        )
                      }
                    >
                      Connect Adobe Analytics
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

DataSourceStartForm.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object
};

export default withStyles(authAccountPageStyle)(
  withRouter(DataSourceStartForm)
);
