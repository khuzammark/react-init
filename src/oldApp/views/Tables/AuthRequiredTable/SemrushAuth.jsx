import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import TextField from "@material-ui/core/TextField";

import { UserViewerQuery } from "queries/users.gql";
import { CreateSemrushAuthMutation } from "queries/auth/semrush.gql";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

function SemrushAuth({ classes, createSemrushAuth, clearAlert, alertSuccess }) {
  const [apiKey, setApiKey] = useState("");
  const [name, setName] = useState("");
  const onConfirm = async () => {
    await createSemrushAuth({
      variables: { apiKey, name },
      refetchQueries: [{ query: UserViewerQuery }]
    });
    alertSuccess();
  };
  return (
    <SweetAlert
      style={{ display: "block", marginTop: "-100px" }}
      title="Enter Your Details"
      onConfirm={onConfirm}
      onCancel={clearAlert}
      confirmBtnCssClass={`${classes.button} ${classes.warning}`}
    >
      <form onSubmit={e => e.preventDefault() && onConfirm()}>
        <TextField
          id="Name"
          style={{ width: "100%" }}
          label="Enter a Name for Your Auth Store"
          value={name}
          onChange={e => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          id="api-key"
          style={{ width: "100%" }}
          label="API Key"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          margin="normal"
        />
      </form>
    </SweetAlert>
  );
}

SemrushAuth.propTypes = {
  createSemrushAuth: PropTypes.func,
  classes: PropTypes.object,
  clearAlert: PropTypes.func,
  alertSuccess: PropTypes.func
};

export default withStyles({ ...extendedTablesStyle, ...sweetAlertStyle })(
  graphql(CreateSemrushAuthMutation, {
    name: "createSemrushAuth"
  })(SemrushAuth)
);
