import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import Kitchen from "@material-ui/icons/Kitchen";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";

// for some reason, we need this to get the title of the card to be black.
// for some reason, we need this to get the title of the card to be black.
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

const styles = theme => ({
  ...extendedTablesStyle,
  ...loginPageStyle,
  container: {
    zIndex: 500,
    width: "100%",
    marginTop: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 10
  },
  recipesHeading: {
    marginTop: 0,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: 0,
    marginRight: 0
  }
});

class RecipeDetailsPage extends React.Component {
  render() {
    const {
      classes,
      match: {
        params: { recipeId }
      },
      history,
      data
    } = this.props;
    const {
      name,
      descriptionShort,
      descriptionLong,
      configurations,
      pricePerMonth
    } = _.find(_.map(_.get(data, "recipes.edges", []), "node"), {
      id: recipeId
    });
    let config = {};
    try {
      config = JSON.parse(configurations);
    } catch (err) {
      // oh well
    }
    const gitUrl = _.get(config, "git_url");

    return (
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="info" icon>
                <GridContainer justify="space-between">
                  <GridItem>
                    <CardIcon color="primary">
                      <Kitchen />
                    </CardIcon>
                  </GridItem>
                  <GridItem>
                    <h4 className={classes.cardIconTitle}>
                      {`Recipes -- ${name}`}
                    </h4>
                  </GridItem>
                  <GridItem>
                    <Button
                      justIcon
                      round
                      style={{ paddingTop: "5px" }}
                      onClick={() => history.push("/pages/recipes")}
                    >
                      <Close />
                    </Button>
                  </GridItem>
                </GridContainer>
              </CardHeader>
              <CardBody>
                <GridContainer direction="column">
                  <GridItem>
                    <b>{descriptionShort}</b>
                  </GridItem>
                  <GridItem>{descriptionLong}</GridItem>
                  <GridItem>
                    <b>Git URL:</b> {gitUrl}
                  </GridItem>
                  <GridItem>{`$${pricePerMonth} per month`}</GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RecipeDetailsPage.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  deleteFeed: PropTypes.func,
  runFeed: PropTypes.func,
  history: PropTypes.object,
  activateRecipe: PropTypes.func,
  deactivateRecipe: PropTypes.func,
  match: PropTypes.object
};

export default withStyles(styles)(
  withRouter(withLoader(RecipeDetailsPage, "linear"))
);
