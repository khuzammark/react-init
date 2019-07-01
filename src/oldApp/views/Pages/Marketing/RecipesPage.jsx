import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import Kitchen from "@material-ui/icons/Kitchen";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import More from "@material-ui/icons/More";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";

// for some reason, we need this to get the title of the card to be black.
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

const styles = theme => ({
  ...extendedTablesStyle,
  ...loginPageStyle,
  container: {
    zIndex: 500,
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

class RecipesPage extends React.Component {
  render() {
    const { classes, history, data } = this.props;
    const recipes = _.map(_.get(data, "recipes.edges", []), "node");

    return (
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12}>
            <Card plain>
              <CardHeader color="info" icon>
                <CardIcon color="primary">
                  <Kitchen />
                </CardIcon>
                <h3 className={classes.recipesHeading}>Recipes</h3>
              </CardHeader>
              <CardBody>
                <GridContainer alignItems="stretch">
                  {_.map(
                    recipes,
                    ({ id, name, descriptionShort, pricePerMonth }) => (
                      <GridItem xs={4} key={id}>
                        <Card>
                          <CardHeader color="info" icon>
                            <CardIcon color="primary">
                              <LibraryBooks />
                            </CardIcon>
                            <span className={classes.cardIconTitle}>
                              {name}
                            </span>
                          </CardHeader>
                          <CardBody>
                            <GridContainer direction="column">
                              <GridItem>
                                <b>{descriptionShort}</b>
                              </GridItem>
                              <GridItem>{`$${pricePerMonth} per month`}</GridItem>
                            </GridContainer>
                          </CardBody>
                          <CardFooter>
                            <GridContainer direction="column">
                              <GridItem>
                                <Button
                                  color="primary"
                                  round
                                  fullWidth
                                  onClick={() =>
                                    history.push(`/pages/recipes/${id}`)
                                  }
                                >
                                  <More className={classes.icons} />
                                  Learn More
                                </Button>
                              </GridItem>
                            </GridContainer>
                          </CardFooter>
                        </Card>
                      </GridItem>
                    )
                  )}
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RecipesPage.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  deleteFeed: PropTypes.func,
  runFeed: PropTypes.func,
  history: PropTypes.object,
  activateRecipe: PropTypes.func,
  deactivateRecipe: PropTypes.func
};

export default withStyles(styles)(
  withRouter(withLoader(RecipesPage, "linear"))
);
