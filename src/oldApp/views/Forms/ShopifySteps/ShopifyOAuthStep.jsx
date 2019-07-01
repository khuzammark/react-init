import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import qs from "qs";
import { withRouter } from "react-router";
import { FinishShopifyAuthMutation } from "queries/auth/shopify.gql";
import { UserViewerQuery } from "queries/users.gql";

class ShopifyOAuthStep extends React.Component {
  async componentDidMount() {
    const { mutate, location, history } = this.props;
    const { state, code, shop } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    await mutate({
      variables: {
        state,
        code,
        shop
      },
      refetchQueries: [{ query: UserViewerQuery }]
    }).then(() => history.push(localStorage.getItem("oauthPostRedirectUrl")));
  }

  render() {
    return null;
  }
}

ShopifyOAuthStep.propTypes = {
  mutate: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object
};

export default graphql(FinishShopifyAuthMutation)(withRouter(ShopifyOAuthStep));
