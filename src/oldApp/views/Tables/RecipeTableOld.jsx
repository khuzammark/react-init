import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import FlashOn from "@material-ui/icons/FlashOn";
import LibraryAdd from "@material-ui/icons/LibraryAdd";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

class ExtendedTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="primary">
                <FlashOn />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Website Quality Audit</h4>
            </CardHeader>
            <CardBody>
              <Table
                hover
                tableHead={[
                  "Site",
                  "Status",
                  "Last Refreshed",
                  "Next Scheduled Refresh"
                ]}
                tableData={[
                  {
                    color: "danger",
                    data: [
                      "codingisforlosers.com",
                      "Error: Deepcrawl",
                      "Aug 26 2018",
                      "Aug 27 2018"
                    ]
                  },
                  [
                    "codingisforlosers.com",
                    "Success",
                    "Aug 26 2018",
                    "Aug 27 2018"
                  ]
                ]}
                customCellClasses={[classes.center]}
                customClassesForCells={[4]}
                customHeadCellClasses={[classes.center]}
                customHeadClassesForCells={[4]}
              />
            </CardBody>
            <CardFooter>
              <a href="/dashboard/new-site">
                <Button color="primary" round className={classes.marginRight}>
                  <LibraryAdd className={classes.icons} /> Add New Site
                </Button>
              </a>
              <a href="/dashboard/edit-recipe?r=website-quality-audit">
                <Button color="info" round className={classes.marginRight}>
                  Edit Recipe
                </Button>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

ExtendedTables.propTypes = {
  classes: PropTypes.object
};

export default withStyles(extendedTablesStyle)(ExtendedTables);
