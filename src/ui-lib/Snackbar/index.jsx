import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { amber, green } from "@material-ui/core/colors";
import { Snackbar, Button, IconButton } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
}));

const SnackBar = ({
  open,
  message,
  variant,
  closeFn,
  link: { link, name }
}) => {
  const classes = useStyles();
  const handleClose = () => {
    closeFn();
  };
  const Icon = variantIcon[variant];
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <div className={classes.bar}>
            <Icon className={[classes.icon, classes.iconVariant]} />
            <span id="message-id">{message}</span>
          </div>
        }
        action={[
          <Button
            key="undo"
            color="secondary"
            size="small"
            href={link || "#"}
            onClick={handleClose}
          >
            {name}
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
};

SnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  closeFn: PropTypes.func.isRequired,
  link: PropTypes.shape({
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default SnackBar;
