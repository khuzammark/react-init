import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import Button from "components/CustomButtons/Button";
import {
  GoogleAuthsQuery,
  DoGoogleAuthMutation
} from "queries/auth/google.gql";

class GoogleStep1 extends React.Component {
  onChange = async e => {
    const { selectAuthStore, mutate, location } = this.props;
    if (e.target.value === "new") {
      localStorage.setItem("oauthPostRedirectUrl", location.pathname);
      const {
        data: {
          doGoogleAuth: { authorizationUrl: authorizationUrl }
        }
      } = await mutate();
      window.location.href = authorizationUrl;
    }
    selectAuthStore(e.target.value);
  };

  render() {
    const { data, classes, authStore, history, match } = this.props;

    const menuItems = _.map(
      _.get(data, "googleAuths.edges", []),
      ({ node }) => (
        <MenuItem key={node.id} value={node.id}>
          {`Google Auth for ${node.userAuth.email} (created by ${node.userAuth.user.email} for ${node.org.name})`}
        </MenuItem>
      )
    );

    menuItems.push(
      <MenuItem key="new" value="new">
        Or Create a New Auth Token
      </MenuItem>
    );

    return (
      <Grid container spacing={24} justify="space-between" alignItems="center">
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
              htmlFor="googleAuthToken"
              className={classes.selectLabel}
            >
              Select Your Google Auth Credentials
            </InputLabel>
            <Select
              value={authStore || ""}
              inputProps={{
                name: "googleAuthToken",
                id: "googleAuthToken"
              }}
              onChange={this.onChange}
            >
              {menuItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Button
              color="google"
              disabled={_.isNull(authStore)}
              onClick={() => history.push(`${match.params.type}/step2`)}
            >
              Next
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

GoogleStep1.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object,
  history: PropTypes.object,
  authStore: PropTypes.string,
  selectAuthStore: PropTypes.func,
  match: PropTypes.object,
  location: PropTypes.object,
  mutate: PropTypes.func
};

export default withStyles(extendedFormsStyle)(
  compose(
    graphql(GoogleAuthsQuery),
    graphql(DoGoogleAuthMutation, {
      options: {
        variables: {
          redirectUri: `${window.location.origin}/auth-stores/google/oauth/callback`
        }
      }
    })
  )(withLoader(withRouter(GoogleStep1)))
);
