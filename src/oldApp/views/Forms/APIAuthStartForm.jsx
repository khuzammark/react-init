import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import TableChart from "@material-ui/icons/TableChart";
import List from "@material-ui/icons/List";
import Key from "@material-ui/icons/VpnKey";
import Link from "@material-ui/icons/Link";
import Subject from "@material-ui/icons/Subject";
import GetApp from "@material-ui/icons/GetApp";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import authAccountPageStyle from "assets/jss/material-dashboard-pro-react/views/authAccountPageStyle.jsx";

class APIAuthStartForm extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <h2>Add a fresh API account</h2>
            <h5>To be available as an ingredient in all analysis recipes.</h5>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={3}>
            <Card pricing raised>
              <CardBody pricing>
                <h6 className={classes.cardCategory}>Google Analytics</h6>
                <div className={classes.icon}>
                  <TableChart className={classes.iconRose} />
                </div>
                <p
                  className={`${classes.cardDescription} ${classes.marginTop30}`}
                >
                  Pull sessions and goal completions by landing page, source and
                  medium.
                </p>
                <Button
                  round
                  color="rose"
                  onClick={() =>
                    this.props.history.push(
                      "/dashboard/new-api-connection/google/analytics"
                    )
                  }
                >
                  Connect GA
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card pricing raised>
              <CardBody pricing>
                <h6 className={classes.cardCategory}>Google Search Console</h6>
                <div className={classes.icon}>
                  <List className={classes.iconRose} />
                </div>
                <p
                  className={`${classes.cardDescription} ${classes.marginTop30}`}
                >
                  Pull impressions and clicks by landing page and search query.
                </p>
                <Button
                  round
                  color="rose"
                  onClick={() =>
                    this.props.history.push(
                      "/dashboard/new-api-connection/google/search-console"
                    )
                  }
                >
                  Connect GSC
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card pricing raised>
              <CardBody pricing>
                <h6 className={classes.cardCategory}>Majestic</h6>
                <div className={classes.icon}>
                  <Key className={classes.iconRose} />
                </div>
                <p
                  className={`${classes.cardDescription} ${classes.marginTop30}`}
                >
                  Pull unique backlinks by landing page (data updates monthly).
                </p>
                <Button round color="rose">
                  Connect Majestic
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card pricing raised>
              <CardBody pricing>
                <h6 className={classes.cardCategory}>SEMrush</h6>
                <div className={classes.icon}>
                  <Link className={classes.iconRose} />
                </div>
                <p
                  className={`${classes.cardDescription} ${classes.marginTop30}`}
                >
                  Pull organic keyword rankings by landing page (data updates
                  monthly).
                </p>
                <Button round color="rose">
                  Connect SEMrush
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer
          alignItems="stretch"
          justify="flex-start"
          direction="row"
        >
          <GridItem xs={12} sm={12} md={3}>
            <GridContainer
              alignItems="stretch"
              justify="flex-start"
              direction="row"
            >
              <GridItem>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>Deepcrawl</h6>
                    <div className={classes.icon}>
                      <GetApp className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${classes.marginTop30}`}
                    >
                      Run a complete crawl of your site (data updates monthly).
                    </p>
                    <Button round color="rose">
                      Connect Deepcrawl
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <GridContainer
              alignItems="stretch"
              justify="flex-start"
              direction="row"
            >
              <GridItem>
                <Card pricing raised>
                  <CardBody pricing>
                    <h6 className={classes.cardCategory}>BigQuery</h6>
                    <div className={classes.icon}>
                      <Subject className={classes.iconRose} />
                    </div>
                    <p
                      className={`${classes.cardDescription} ${classes.marginTop30}`}
                    >
                      Push data into a BigQuery Table. This is a target for
                      other ingredients.
                    </p>
                    <Button
                      round
                      color="rose"
                      onClick={() =>
                        this.props.history.push(
                          "/dashboard/new-api-connection/google/bigquery"
                        )
                      }
                    >
                      Connect BigQuery
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

APIAuthStartForm.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object
};

export default withStyles(authAccountPageStyle)(withRouter(APIAuthStartForm));
