import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Heading from "components/Heading/Heading.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

const HomePage = ({ classes }) => (
  <div className={classes.container}>
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <Heading
            title="Agency Date Pipeline"
            category="This is the landing page"
            textAlign="center"
          />
          <CardBody>
            <p>Some content here for DK to fill in.</p>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  </div>
);

HomePage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(loginPageStyle)(HomePage);
