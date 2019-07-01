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

const FacebookAdsDataSource = ({
  classes,
  data,
  facebookAdsDataSource,
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
      value={facebookAdsDataSource}
      onChange={e => {
        const {
          accountId,
          accountName,
          authStoreId,
          campaignId,
          campaignName,
          adSetId,
          adSetName
        } = JSON.parse(e.target.value);
        sendUpdate({
          facebookAdsDataSource: e.target.value,
          facebookAdsDataSourceData: {
            facebookAdsDataSourceAuthStoreId: authStoreId,
            facebookAdsDataSourceAccountId: accountId,
            facebookAdsDataSourceAccountName: accountName,
            facebookAdsDataSourceCampaignId: campaignId,
            facebookAdsDataSourceCampaignName: campaignName,
            facebookAdsDataSourceAdSetId: adSetId,
            facebookAdsDataSourceAdSetName: adSetName
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
              _.map(
                adCampaigns,
                ({ id: campaignId, name: campaignName, adSets }) =>
                  _.map(adSets, ({ id: adSetId, name: adSetName }) => (
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
                        adSetId,
                        adSetName,
                        authStoreId: node.id
                      })}
                      key={`${node.id}-${accountId}-${campaignId}-${adSetId}`}
                    >
                      {`AdSet ${adSetName} (${adSetId}) in Campaign ${campaignName} (${campaignId}) for Account ${accountName} (${accountId})`}
                    </MenuItem>
                  ))
              )
          )
        )
      )}
    </Select>
  </FormControl>
);

FacebookAdsDataSource.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  facebookAdsDataSource: PropTypes.string,
  sendUpdate: PropTypes.func
};

export default withStyles(styles)(
  graphql(FacebookConfigsForAuthsQuery)(
    withLoader(FacebookAdsDataSource),
    "linear"
  )
);
