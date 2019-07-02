import React from "react";
import PropTypes from "prop-types";
import { Slide, Typography, Container, Grid } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

import { mainTheme } from "ui-lib";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(8, 4)
  },
  type: {
    margin: theme.spacing(8)
  },
  warningWrapper: {
    textAlign: "center"
  },
  warning: {
    fontSize: theme.typography.fontSize * 8
  }
}));

function Error({ errorMessage }) {
  const classes = useStyles(mainTheme);

  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Container maxWidth="md" className={classes.container}>
        <Grid item className={classes.warningWrapper}>
          <Warning className={classes.warning} />
        </Grid>
        <Grid item>
          <Typography
            component="h2"
            align="center"
            color="primary"
            variant="h2"
            className={classes.type}
          >
            {`Sorry, we've encountered an error`}
          </Typography>
          <Typography variant="caption">{errorMessage}</Typography>
        </Grid>
      </Container>
    </Slide>
  );
}

Error.propTypes = {
  errorMessage: PropTypes.string.isRequired
};

export default Error;
