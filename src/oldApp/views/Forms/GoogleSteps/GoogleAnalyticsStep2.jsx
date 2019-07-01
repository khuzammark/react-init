import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql, compose } from "react-apollo";
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
  DataSourcesAndTargetsQuery,
  GaAccountsQuery,
  CreateGaDataSourceMutation
} from "queries/data.gql";

class GoogleAnalyticsStep2 extends React.Component {
  state = {
    selectedAccountId: "",
    selectedWebPropertyId: "",
    selectedProfileId: ""
  };

  onChange = field => e => this.setState({ [field]: e.target.value });

  getDropdownState = () => {
    const { data } = this.props;
    const {
      selectedAccountId,
      selectedWebPropertyId,
      selectedProfileId
    } = this.state;
    const selectedAccount = _.find(data.googleAuth.analyticsAccounts, {
      id: selectedAccountId
    });

    const currentWebProperties = _.get(selectedAccount, "webProperties", []);

    const selectedWebProperty = _.find(currentWebProperties, {
      id: selectedWebPropertyId
    });

    const currentProfiles = _.get(selectedWebProperty, "profiles", []);
    const selectedProfile = _.find(currentProfiles, {
      id: selectedProfileId
    });

    return {
      currentWebProperties,
      currentProfiles,
      selectedAccount,
      selectedWebProperty,
      selectedProfile
    };
  };

  createGa = async () => {
    const { mutate, history, authStore } = this.props;
    const {
      selectedAccount,
      selectedWebProperty,
      selectedProfile
    } = this.getDropdownState();
    await mutate({
      variables: {
        accountId: selectedAccount.id,
        accountName: selectedAccount.name,
        webPropertyId: selectedWebProperty.id,
        webPropertyName: selectedWebProperty.name,
        profileId: selectedProfile.id,
        profileName: selectedProfile.name,
        authStoreId: authStore
      },
      refetchQueries: [{ query: DataSourcesAndTargetsQuery }]
    });
    return history.push("/dashboard/admin/data-sources");
  };

  componentDidMount() {
    const { history, authStore } = this.props;
    if (!authStore) {
      return history.push("/dashboard/admin/data-sources/google/analytics");
    }
  }

  render() {
    const { classes, data } = this.props;
    const {
      selectedAccountId,
      selectedWebPropertyId,
      selectedProfileId
    } = this.state;

    const toMenuItem = ({ id, name }) => (
      <MenuItem key={id} value={id}>
        {name}
      </MenuItem>
    );

    const accountMenuItems = _.map(
      _.get(data, "googleAuth.analyticsAccounts", []),
      toMenuItem
    );

    const { currentWebProperties, currentProfiles } = this.getDropdownState();

    const webPropertyMenuItems = _.map(currentWebProperties, toMenuItem);

    const profileMenuItems = _.map(currentProfiles, toMenuItem);

    return (
      <Grid
        container
        spacing={24}
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
              htmlFor="accountSelector"
              className={classes.selectLabel}
            >
              Select a Google Analytics Account
            </InputLabel>
            <Select
              value={selectedAccountId}
              inputProps={{
                name: "accountSelector",
                id: "accountSelector"
              }}
              onChange={this.onChange("selectedAccountId")}
            >
              {accountMenuItems}
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
              htmlFor="webPropertySelector"
              className={classes.selectLabel}
            >
              Select a Web Property
            </InputLabel>
            <Select
              value={selectedWebPropertyId}
              inputProps={{
                name: "webPropertySelector",
                id: "webPropertySelector"
              }}
              onChange={this.onChange("selectedWebPropertyId")}
            >
              {webPropertyMenuItems}
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
              htmlFor="profileSelector"
              className={classes.selectLabel}
            >
              Select a Profile
            </InputLabel>
            <Select
              value={selectedProfileId}
              inputProps={{
                name: "profileSelector",
                id: "profileSelector"
              }}
              onChange={this.onChange("selectedProfileId")}
            >
              {profileMenuItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Button color="google" onClick={this.createGa}>
              Next
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

GoogleAnalyticsStep2.propTypes = {
  authStore: PropTypes.string,
  classes: PropTypes.object,
  history: PropTypes.object,
  data: PropTypes.object,
  mutate: PropTypes.func
};

export default withStyles(extendedFormsStyle)(
  compose(
    graphql(GaAccountsQuery, {
      options: ({ authStore }) => ({
        variables: { authStoreId: authStore }
      })
    }),
    graphql(CreateGaDataSourceMutation)
  )(withLoader(GoogleAnalyticsStep2, "linear"))
);
