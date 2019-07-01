import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Heading from "components/Heading/Heading.jsx";
import Timeline from "components/Timeline/Timeline.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import { stories } from "variables/general.jsx";

const HowItWorksPage = ({ classes }) => (
  <div className={classes.container}>
    <GridContainer>
      <GridItem xs={12}>
        <Card plain>
          <CardHeader
            className={`${classes.cardHeader} ${classes.textCenter}`}
            color="rose"
          >
            <Heading
              title="Baking your Data Analysis Cake"
              category="There are three steps to making sure your baking process goes smoothly."
              textAlign="center"
            />
          </CardHeader>
          <CardBody plain>
            <Timeline stories={stories} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  </div>
);

HowItWorksPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(loginPageStyle)(HowItWorksPage);
