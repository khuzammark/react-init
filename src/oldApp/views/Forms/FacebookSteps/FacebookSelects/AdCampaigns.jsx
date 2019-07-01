import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql, compose } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import { FacebookAdCampaignsQuery } from "queries/data.gql";

class AdCampaigns extends React.Component {
  render() {
    const { setting, facebookAdCampaigns } = this.props;

    const adCampaignMenuItems =
      setting.selectedAdAccountId !== ""
        ? _.map(
            _.get(facebookAdCampaigns, "facebookAuth.adCampaigns", []),
            setting.toMenuItem
          )
        : "";

    return (
      <FormControl
        fullWidth
        className={setting.props.classes.selectFormControl}
      >
        <InputLabel
          htmlFor="adCampaignSelector"
          className={setting.props.classes.selectLabel}
        >
          Select a Facebook Ad Campaign
        </InputLabel>
        <Select
          value={setting.selectedAdCampaignId}
          inputProps={{
            name: "adCampaignSelector",
            id: "adCampaignSelector"
          }}
          onChange={setting.onChange("selectedAdCampaignId")}
        >
          {adCampaignMenuItems}
        </Select>
      </FormControl>
    );
  }
}

AdCampaigns.propTypes = {
  authStore: PropTypes.string,
  setting: PropTypes.object,
  facebookAdCampaigns: PropTypes.object
};

export default withStyles(extendedFormsStyle)(
  compose(
    graphql(FacebookAdCampaignsQuery, {
      options: ({ setting }) => ({
        variables: {
          authStoreId: setting.props.authStore,
          adAccountId: setting.selectedAdAccountId
        }
      }),
      name: "facebookAdCampaigns"
    })
  )(withLoader(AdCampaigns, "linear"))
);
