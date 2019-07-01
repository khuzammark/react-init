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
import { FacebookAdSetsQuery } from "queries/data.gql";

class AdSets extends React.Component {
  render() {
    const { setting, facebookAdSets } = this.props;

    const adSetMenuItems =
      setting.selectedAdCampaignId !== ""
        ? _.map(
            _.get(facebookAdSets, "facebookAuth.adSets", []),
            setting.toMenuItem
          )
        : "";

    return (
      <FormControl
        fullWidth
        className={setting.props.classes.selectFormControl}
      >
        <InputLabel
          htmlFor="adSetSelector"
          className={setting.props.classes.selectLabel}
        >
          Select a Facebook Ad Set
        </InputLabel>
        <Select
          value={setting.selectedAdSetId}
          inputProps={{
            name: "adSetSelector",
            id: "adSetSelector"
          }}
          onChange={setting.onChange("selectedAdSetId")}
        >
          {adSetMenuItems}
        </Select>
      </FormControl>
    );
  }
}

AdSets.propTypes = {
  authStore: PropTypes.string,
  setting: PropTypes.object,
  facebookAdSets: PropTypes.object
};

export default withStyles(extendedFormsStyle)(
  compose(
    graphql(FacebookAdSetsQuery, {
      options: ({ setting }) => ({
        variables: {
          authStoreId: setting.props.authStore,
          adAccountId: setting.selectedAdAccountId,
          adCampaignId: setting.selectedAdCampaignId
        }
      }),
      name: "facebookAdSets"
    })
  )(withLoader(AdSets, "linear"))
);
