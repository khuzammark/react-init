import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import Subject from "@material-ui/icons/Subject";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import authAccountPageStyle from "assets/jss/material-dashboard-pro-react/views/authAccountPageStyle.jsx";

class DataTargetStartForm extends React.Component {
  render() {
    const { classes, history } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <h2>Add a New Data Store</h2>
          </GridItem>
        </GridContainer>
        <GridContainer justify="flex-start">
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
                        history.push(
                          "/dashboard/admin/data-targets/new/google/bigquery"
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

DataTargetStartForm.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object
};

export default withStyles(authAccountPageStyle)(
  withRouter(DataTargetStartForm)
);
