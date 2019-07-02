import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { Hero, RecipeIndex, mainTheme } from "ui-lib";

import Page from "layouts/Page";
import HeroData from "DummyData/hero";
import recipeIndexData from "DummyData/recipeIndex";

const useStyles = makeStyles(theme => ({
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "20px 20px",
    padding: theme.spacing(4, 10),
    justifyItems: "center",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2)
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 0),
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(1, 1fr)"
    }
  }
}));

const RecipeIndexes = () => {
  const classes = useStyles(mainTheme);
  return (
    <Fragment>
      <Hero {...HeroData} />
      <div className={classes.cardContainer}>
        <RecipeIndex {...recipeIndexData} />
        <RecipeIndex {...recipeIndexData} />
        <RecipeIndex {...recipeIndexData} />
        <RecipeIndex {...recipeIndexData} />
      </div>
    </Fragment>
  );
};

RecipeIndexes.propTypes = {};

const options = {
  authenticated: true
};

export default Page(RecipeIndexes, options);
