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
  WebmasterSitesQuery,
  CreateGoogleWebmasterDataSourceMutation
} from "queries/data.gql";

class GoogleSearchConsoleStep2 extends React.Component {
  state = {
    selectedSite: ""
  };

  onChange = field => e => this.setState({ [field]: e.target.value });

  createWebmasterSource = async () => {
    const { mutate, history, authStore } = this.props;
    const { selectedSite } = this.state;
    await mutate({
      variables: {
        authStoreId: authStore,
        site: selectedSite
      },
      refetchQueries: [{ query: DataSourcesAndTargetsQuery }]
    });
    return history.push("/dashboard/admin/data-sources");
  };

  componentDidMount() {
    const { history, authStore } = this.props;
    if (!authStore) {
      return history.push(
        "/dashboard/admin/data-sources/google/search-console"
      );
    }
  }

  render() {
    const { classes, data } = this.props;
    const { selectedSite } = this.state;

    const siteMenuItems = _.map(
      _.get(data, "googleAuth.webmasterSites", []),
      ({ url }) => (
        <MenuItem key={url} value={url}>
          {url}
        </MenuItem>
      )
    );

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
              Select a Site
            </InputLabel>
            <Select
              value={selectedSite}
              inputProps={{
                name: "siteSelector",
                id: "siteSelector"
              }}
              onChange={this.onChange("selectedSite")}
            >
              {siteMenuItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Button color="google" onClick={this.createWebmasterSource}>
              Next
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

GoogleSearchConsoleStep2.propTypes = {
  authStore: PropTypes.string,
  classes: PropTypes.object,
  history: PropTypes.object,
  data: PropTypes.object,
  mutate: PropTypes.func
};

export default withStyles(extendedFormsStyle)(
  compose(
    graphql(WebmasterSitesQuery, {
      options: ({ authStore }) => ({
        variables: { authStoreId: authStore }
      })
    }),
    graphql(CreateGoogleWebmasterDataSourceMutation)
  )(withLoader(GoogleSearchConsoleStep2, "linear"))
);
