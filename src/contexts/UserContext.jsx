import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql } from "react-apollo";
import { withRouter, Redirect } from "react-router";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import { UserViewerQuery } from "queries/users.gql";

const context = React.createContext();

export const UserProvider = context.Provider;
export const UserConsumer = context.Consumer;

class LoginMiddleware extends React.Component {
  render() {
    const { children, data, location } = this.props;
    /* eslint-disable */
    console.log("connected some shit ", this.props);
    const user = _.get(data, "userViewer.user", {});
    if (
      (!_.isEmpty(user) && !_.isUndefined(user)) ||
      location.pathname === "/" ||
      location.pathname === "/login"
    ) {
      return <UserProvider value={user}>{children}</UserProvider>;
    }
    localStorage.setItem("fromPath", location.pathname);
    return <Redirect to="/login" />;
  }
}

LoginMiddleware.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node,
  location: PropTypes.object
};

export const ConnectedLoginMiddleware = withRouter(
  graphql(UserViewerQuery)(withLoader(LoginMiddleware))
);

export function withUser(Component) {
  return function ConnectedComponent(props) {
    return (
      <UserConsumer>
        {user => <Component {...props} user={user} />}
      </UserConsumer>
    );
  };
}
