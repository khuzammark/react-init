import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import Button from "components/CustomButtons/Button";
import {
  DataSourcesAndTargetsQuery,
  CreateFacebookAdsDataSourceMutation
} from "queries/data.gql";

import AdAccounts from "views/Forms/FacebookSteps/FacebookSelects/AdAccounts.jsx";
import AdCampaigns from "views/Forms/FacebookSteps/FacebookSelects/AdCampaigns.jsx";
import AdSets from "views/Forms/FacebookSteps/FacebookSelects/AdSets.jsx";

class FacebookAdSetsStep2 extends React.Component {
  state = {
    selectedAdAccountId: "",
    adAccountName: "",
    selectedAdCampaignId: "",
    adCampaignName: "",
    selectedAdSetId: "",
    adSetName: ""
  };
  onChange = field => e => this.setState({ [field]: e.target.value });

  createFacebookAdSet = async () => {
    const { mutate, history, authStore } = this.props;
    const {
      selectedAdAccountId,
      adAccountName,
      selectedAdCampaignId,
      adCampaignName,
      selectedAdSetId,
      adSetName
    } = this.state;
    await mutate({
      variables: {
        adAccountId: selectedAdAccountId,
        adAccountName: adAccountName,
        adCampaignId: selectedAdCampaignId,
        adCampaignName: adCampaignName,
        adSetId: selectedAdSetId,
        adSetName: adSetName,
        authStoreId: authStore
      },
      refetchQueries: [{ query: DataSourcesAndTargetsQuery }]
    });
    return history.push("/dashboard/admin/data-sources");
  };

  componentDidMount() {
    const { history, authStore } = this.props;
    if (!authStore) {
      return history.push("/dashboard/admin/data-sources/facebook/ads");
    }
  }

  render() {
    const {
      selectedAdAccountId,
      adAccountName,
      selectedAdCampaignId,
      adCampaignName,
      selectedAdSetId,
      adSetName
    } = this.state;
    const { classes } = this.props;

    const toMenuItem = ({ id, name }) => (
      <MenuItem key={id} value={id}>
        {name}
      </MenuItem>
    );

    const adSetSetting = {
      props: this.props,
      toMenuItem: toMenuItem,
      onChange: this.onChange,
      selectedAdAccountId: selectedAdAccountId,
      selectedAdCampaignId: selectedAdCampaignId,
      selectedAdSetId: selectedAdSetId
    };

    return (
      <Grid
        container
        spacing={24}
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item xs={9}>
          <AdAccounts setting={adSetSetting} />
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <TextField
              id="adAccountName"
              style={{ width: "100%" }}
              label="Enter Ad Account Descriptive Name"
              value={adAccountName}
              onChange={this.onChange("adAccountName")}
              margin="normal"
            />
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <AdCampaigns setting={adSetSetting} />
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <TextField
              id="adCampaignName"
              style={{ width: "100%" }}
              label="Enter Ad Campaign Descriptive Name"
              value={adCampaignName}
              onChange={this.onChange("adCampaignName")}
              margin="normal"
            />
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <AdSets setting={adSetSetting} />
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <TextField
              id="adSetName"
              style={{ width: "100%" }}
              label="Enter Ad Set Descriptive Name"
              value={adSetName}
              onChange={this.onChange("adSetName")}
              margin="normal"
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Button color="google" onClick={this.createFacebookAdSet}>
              Next
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

FacebookAdSetsStep2.propTypes = {
  authStore: PropTypes.string,
  classes: PropTypes.object,
  history: PropTypes.object,
  mutate: PropTypes.func
};

export default withStyles(extendedFormsStyle)(
  compose(graphql(CreateFacebookAdsDataSourceMutation))(
    withLoader(FacebookAdSetsStep2, "linear")
  )
);
