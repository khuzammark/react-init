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
import { GoogleAuthsIntegrationsQuery } from "queries/auth/google.gql";
import styles from "./styles";

const GoogleAnalyticsDataSource = ({
  classes,
  googleAnalyticsDataSource,
  data,
  sendUpdate
}) => (
  <FormControl fullWidth className={classes.selectFormControl}>
    <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
      Select a Google Analytics Profile
    </InputLabel>
    <Select
      MenuProps={{
        className: classes.selectMenu
      }}
      classes={{
        select: classes.select
      }}
      value={googleAnalyticsDataSource}
      onChange={e => {
        const { authStoreId, account, profile, property } = JSON.parse(
          e.target.value
        );
        sendUpdate({
          googleAnalyticsDataSource: e.target.value,
          googleAnalyticsDataSourceData: {
            accountId: account.id,
            accountName: account.name,
            profileId: profile.id,
            profileName: profile.name,
            webPropertyId: property.id,
            webPropertyName: property.name,
            googleAnalyticsDataSourceAuthStoreId: authStoreId
          }
        });
      }}
      inputProps={{
        name: "simpleSelect",
        id: "simple-select"
      }}
    >
      {_.flatten(
        _.map(_.get(data, "googleAuths.edges", []), ({ node }) =>
          _.map(_.get(node, "analyticsAccounts", []), account =>
            _.map(account.webProperties, property =>
              _.map(property.profiles, profile => (
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value={JSON.stringify({
                    authStoreId: node.id,
                    account,
                    profile,
                    property
                  })}
                  key={`${node.id}${account.id}${property.id}${profile.id}`}
                >
                  {`${account.name} | ${property.name} | ${profile.name}`}
                </MenuItem>
              ))
            )
          )
        )
      )}
    </Select>
  </FormControl>
);

GoogleAnalyticsDataSource.propTypes = {
  classes: PropTypes.object,
  sendUpdate: PropTypes.func,
  data: PropTypes.object,
  googleAnalyticsDataSource: PropTypes.string
};

export default withStyles(styles)(
  graphql(GoogleAuthsIntegrationsQuery)(
    withLoader(GoogleAnalyticsDataSource, "linear")
  )
);
