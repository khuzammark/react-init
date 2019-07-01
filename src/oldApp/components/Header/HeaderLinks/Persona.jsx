import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import classNames from "classnames";

// @material-ui/core components
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components
import Button from "components/CustomButtons/Button.jsx";

class Persona extends React.Component {
  state = {
    open: false
  };

  handleSignout = () => {
    this.setState({ open: false }, () => {
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.pathname = "/";
      }, 250);
    });
  };

  render() {
    const { classes, managerClasses } = this.props;
    const { open } = this.state;
    return (
      <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns={open ? "menu-list" : null}
          aria-haspopup="true"
          onClick={() => this.setState({ open: !open })}
          className={classes.buttonLink}
          muiClasses={{
            label: ""
          }}
          buttonRef={node => {
            this.anchorEl = node;
          }}
        >
          <Person className={classes.headerLinksSvg + " " + classes.links} />
        </Button>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !open,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener
                  onClickAway={() => this.setState({ open: false })}
                >
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleSignout}
                      className={classes.personaDropdownItem}
                    >
                      {"Sign Out"}
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

Persona.propTypes = {
  classes: PropTypes.object,
  managerClasses: PropTypes.object
};

export default withRouter(Persona);
