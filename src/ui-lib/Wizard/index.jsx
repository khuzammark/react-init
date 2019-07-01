import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button, Container } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Theme from "../theme";

const useStyles = makeStyles(theme => ({
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexGrow: 1,
    alignItems: "flex-end",
    padding: theme.spacing(2, 0, 0)
  },
  boxContainer: {
    padding: theme.spacing(4),
    minHeight: 500,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    textAlign: "center"
  },
  container: {
    margin: `${theme.spacing(4)}px auto`,
    [theme.breakpoints.up("lg")]: {
      minWidth: 700
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: 300
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: "fit-content"
    }
  },
  button: {
    minWidth: 120,
    minHeight: 40
  },
  wide: {
    minWidth: "100%"
  }
}));

const Wizard = ({ steps, onComplete, completeName, updateStep }) => {
  const classes = useStyles(Theme);
  const [activeStep, setStep] = useState(0);
  const handleNext = () => {
    setStep(activeStep + 1);
    updateStep(activeStep + 1);
  };
  const handleBack = () => {
    if (!activeStep) {
      return;
    }
    setStep(activeStep - 1);
    updateStep(activeStep - 1);
  };
  return (
    <Container
      maxWidth="xs"
      border={1}
      className={`${classes.container} ${
        steps[activeStep].flex ? classes.wide : ""
      }`}
    >
      <Box
        border={1}
        borderRadius={16}
        borderColor={Theme.palette.grey[300]}
        className={classes.boxContainer}
      >
        {steps[activeStep].component}
        <div className={classes.actionContainer}>
          {activeStep ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
            </div>
          ) : null}
          <div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={
                activeStep === steps.length - 1 ? onComplete : handleNext
              }
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? completeName : "Next"}
            </Button>
          </div>
        </div>
      </Box>
    </Container>
  );
};

Wizard.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onComplete: PropTypes.func.isRequired,
  completeName: PropTypes.string.isRequired,
  updateStep: PropTypes.func
};

Wizard.defaultProps = {
  updateStep: () => {}
};

export default Wizard;
