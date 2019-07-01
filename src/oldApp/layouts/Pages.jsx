import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import PagesHeader from "components/Header/PagesHeader.jsx";
import Footer from "components/Footer/Footer.jsx";
import { UserConsumer } from "contexts/UserContext";
import pagesRoutes from "routes/pages.jsx";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";

import bgImage from "assets/img/register.jpeg";

class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }
  componentDidMount() {
    document.body.style.overflow = "unset";
  }
  render() {
    const { classes, location, ...rest } = this.props;
    return (
      <div>
        <PagesHeader location={location} {...rest} />
        <div className={classes.wrapper} ref={this.wrapperRef}>
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          >
            <Switch>
              <UserConsumer>
                {user =>
                  pagesRoutes(user, location).map((prop, key) => {
                    if (prop.collapse) {
                      return null;
                    }
                    if (prop.redirect) {
                      return (
                        <Redirect from={prop.path} to={prop.pathTo} key={key} />
                      );
                    }
                    return (
                      <Route
                        path={prop.path}
                        component={prop.component}
                        key={key}
                      />
                    );
                  })
                }
              </UserConsumer>
            </Switch>
            <Footer white />
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object
};

export default withStyles(pagesStyle)(withRouter(Pages));
