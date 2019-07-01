import React from "react";
import PropTypes from "prop-types";
import { Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import Theme from "../theme";

const useStyles = makeStyles(theme => ({
  link: {
    flexGrow: 1,
    color: theme.palette.grey[100],
    textDecoration: "none"
  }
}));

const Logo = ({ src }) => {
  const classes = useStyles(Theme);
  const CollisionLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/" {...props} />
  ));
  return (
    <Link component={CollisionLink} href="/" className={classes.link}>
      {src ? (
        <img src={src} alt="CIFL Logo" className={classes.logo} />
      ) : (
        <Typography className={classes.logo}>Query.Recipes</Typography>
      )}
    </Link>
  );
};

Logo.propTypes = {
  src: PropTypes.string.isRequired
};

export default Logo;
