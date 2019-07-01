import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import qs from "qs";
import { withRouter } from "react-router";
import { FinishGoogleAuthMutation } from "queries/auth/google.gql";
import { UserViewerQuery } from "queries/users.gql";

class GoogleOAuthStep extends React.Component {
  async componentDidMount() {
    const { mutate, location, history } = this.props;
    const { state, code, scope } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    await mutate({
      variables: {
        state,
        code,
        scope,
        redirectUri: `${window.location.origin}/dashboard/auth-stores/google/oauth/callback`
      },
      refetchQueries: [{ query: UserViewerQuery }]
    });
    history.push(localStorage.getItem("oauthPostRedirectUrl"));
  }

  render() {
    return null;
  }
}

GoogleOAuthStep.propTypes = {
  mutate: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object
};

export default graphql(FinishGoogleAuthMutation)(withRouter(GoogleOAuthStep));
