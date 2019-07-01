import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql } from "react-apollo";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import { FacebookConfigsForAuthsQuery } from "queries/auth/facebook.gql";
import styles from "./styles";

const FacebookAdInsightsDataSource = ({
  classes,
  data,
  facebookAdInsightsDataSource,
  sendUpdate
}) => (
  <FormControl fullWidth className={classes.selectFormControl}>
    <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
      Select an Account for Facebook Ad Creatives
    </InputLabel>
    <Select
      MenuProps={{
        className: classes.selectMenu
      }}
      classes={{
        select: classes.select
      }}
      value={facebookAdInsightsDataSource}
      onChange={e => {
        const {
          accountId,
          accountName,
          authStoreId,
          campaignId,
          campaignName
        } = JSON.parse(e.target.value);
        sendUpdate({
          facebookAdInsightsDataSource: e.target.value,
          facebookAdInsightsDataSourceData: {
            facebookAdInsightsDataSourceAuthStoreId: authStoreId,
            facebookAdInsightsDataSourceAccountId: accountId,
            facebookAdInsightsDataSourceAccountName: accountName,
            facebookAdInsightsDataSourceCampaignId: campaignId,
            facebookAdInsightsDataSourceCampaignName: campaignName
          }
        });
      }}
      inputProps={{
        name: "simpleSelect",
        id: "simple-select"
      }}
    >
      {_.flatten(
        _.map(_.get(data, "facebookAuths.edges", []), ({ node }) =>
          _.map(
            _.get(node, "adAccounts", []),
            ({ id: accountId, name: accountName, adCampaigns }) =>
              _.map(adCampaigns, ({ id: campaignId, name: campaignName }) => (
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value={JSON.stringify({
                    accountId,
                    accountName,
                    campaignId,
                    campaignName,
                    authStoreId: node.id
                  })}
                  key={`${node.id}-${accountId}-${campaignId}`}
                >
                  {`Campaign ${campaignName} (${campaignId}) for Account ${accountName} (${accountId})`}
                </MenuItem>
              ))
          )
        )
      )}
    </Select>
  </FormControl>
);

FacebookAdInsightsDataSource.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  facebookAdInsightsDataSource: PropTypes.string,
  sendUpdate: PropTypes.func
};

export default withStyles(styles)(
  graphql(FacebookConfigsForAuthsQuery)(
    withLoader(FacebookAdInsightsDataSource),
    "linear"
  )
);
