import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import { DoShopifyAuthMutation } from "queries/auth/shopify.gql";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

function ShopifyAuth({ classes, doShopifyAuth, clearAlert }) {
  const onSubmit = async shop => {
    const {
      data: {
        doShopifyAuth: { authorizationUrl }
      }
    } = await doShopifyAuth({
      variables: {
        shop,
        redirectUri: `${
          window.location.origin
        }/dashboard/auth-stores/shopify/oauth/callback`
      }
    });
    window.location.href = authorizationUrl;
  };
  return (
    <SweetAlert
      style={{ display: "block", marginTop: "-100px" }}
      title="Enter Your Shop"
      onConfirm={onSubmit}
      onCancel={clearAlert}
      confirmBtnCssClass={`${classes.button} ${classes.warning}`}
      input
    >
      This should match the subdomain of the shop on Shopify.
    </SweetAlert>
  );
}

ShopifyAuth.propTypes = {
  doShopifyAuth: PropTypes.func,
  classes: PropTypes.object,
  clearAlert: PropTypes.func
};

export default withStyles({ ...extendedTablesStyle, ...sweetAlertStyle })(
  graphql(DoShopifyAuthMutation, {
    name: "doShopifyAuth"
  })(ShopifyAuth)
);
