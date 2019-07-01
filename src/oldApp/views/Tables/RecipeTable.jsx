import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import LocalDining from "@material-ui/icons/LocalDining";
import Kitchen from "@material-ui/icons/Kitchen";
import Build from "@material-ui/icons/Build";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import BillingWarning from "components/BillingWarning/BillingWarning.jsx";
import { userShouldEnableBilling } from "lib/utils";

import { UserConsumer } from "contexts/UserContext";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

class RecipeTable extends React.Component {
  getTableHead = () => {
    return ["Recipe Name", "Recipe Description", ""];
  };

  getTableData = user => {
    const { classes, history } = this.props;

    return _.map(
      _.get(user, "org.recipes.edges", []),
      ({ node: { id, name, descriptionShort, authRequired } }) => {
        let button = null;

        if (!userShouldEnableBilling(user)) {
          if (authRequired && authRequired.length > 0) {
            button = (
              <Button
                key={id}
                color="warning"
                round
                className={classes.marginRight}
                onClick={() => history.push(`/dashboard/auth-required`)}
              >
                <Build className={classes.icons} /> Connect Auth
              </Button>
            );
          } else {
            button = (
              <Button
                key={id}
                color="primary"
                round
                className={classes.marginRight}
                onClick={() =>
                  history.push(`/dashboard/recipes/${id}/new-site`)
                }
              >
                <LocalDining className={classes.icons} /> Use This Recipe
              </Button>
            );
          }
        }

        return [name, descriptionShort, button];
      }
    );
  };

  render() {
    const { classes, history } = this.props;
    return (
      <UserConsumer>
        {user => (
          <GridContainer>
            <BillingWarning user={user} />
            <GridItem xs={12}>
              <Card>
                <CardHeader color="info" icon>
                  <CardIcon color="primary">
                    <Kitchen />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>Recipes</h4>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHead={this.getTableHead()}
                    tableData={this.getTableData(user)}
                  />
                </CardBody>
                <CardFooter>
                  Recipes let you configure feeds for multiple data sources at
                  once.
                  {userShouldEnableBilling(user) ? null : (
                    <Button
                      color="primary"
                      round
                      className={classes.marginRight}
                      onClick={() =>
                        history.push("/dashboard/recipes/new-recipe")
                      }
                    >
                      <Kitchen className={classes.icons} /> Chef a New Recipe
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        )}
      </UserConsumer>
    );
  }
}

RecipeTable.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  deleteFeed: PropTypes.func,
  runFeed: PropTypes.func,
  history: PropTypes.object
};

export default withStyles({
  ...extendedTablesStyle
})(withRouter(withLoader(RecipeTable, "linear")));
