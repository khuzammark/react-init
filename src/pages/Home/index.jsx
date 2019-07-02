import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import { Hero, Stepper, RecipeDetail, CTA } from "ui-lib";
import Page from "layouts/Page";
import HeroData from "DummyData/hero";
import StepperData from "DummyData/stepper";
import recipeDetailData from "DummyData/recipeDetail";
import ctaData from "DummyData/cta";

const useStyles = makeStyles(() => ({
  stepperContainer: {
    maxWidth: 300,
    margin: "0 auto"
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Hero {...HeroData} />
      <div className={classes.stepperContainer}>
        <Stepper {...StepperData} />
      </div>
      <RecipeDetail {...recipeDetailData} />
      <RecipeDetail {...recipeDetailData} />
      <CTA {...ctaData} />
    </Fragment>
  );
};

Home.propTypes = {};

export default Page(Home);
