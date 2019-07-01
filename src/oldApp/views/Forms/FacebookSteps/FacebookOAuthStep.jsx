import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import qs from "qs";
import { withRouter } from "react-router";
import { FinishFacebookAuthMutation } from "queries/auth/facebook.gql";
import { UserViewerQuery } from "queries/users.gql";

class FacebookOAuthStep extends React.Component {
  async componentDidMount() {
    const { mutate, location, history } = this.props;
    const { code } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    await mutate({
      variables: {
        code,
        redirectUri: `${window.location.origin}/dashboard/auth-stores/facebook/oauth/callback`
      },
      refetchQueries: [{ query: UserViewerQuery }]
    }).then(() => history.push(localStorage.getItem("oauthPostRedirectUrl")));
  }

  render() {
    return null;
  }
}

FacebookOAuthStep.propTypes = {
  mutate: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object
};

export default graphql(FinishFacebookAuthMutation)(
  withRouter(FacebookOAuthStep)
);
