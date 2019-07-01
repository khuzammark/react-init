import React from "react";

import classNames from "classnames";

// @material-ui/core components
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import NotificationsIcon from "@material-ui/icons/Notifications";

// core components
import Button from "components/CustomButtons/Button.jsx";

class Notifications extends React.Component {
  render() {
    const { classes, managerClasses, dropdownItem } = this.props;
    return (
      <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns={open ? "menu-list" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.buttonLink}
          muiClasses={{
            label: ""
          }}
          buttonRef={node => {
            this.anchorEl = node;
          }}
        >
          <NotificationsIcon
            className={classes.headerLinksSvg + " " + classes.links}
          />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <span onClick={this.handleClick} className={classes.linkText}>
              {"Notification"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !open,
            [classes.pooperResponsive]: true,
            [classes.pooperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={dropdownItem}
                    >
                      {"Mike John responded to your email"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

export default Notifications;
