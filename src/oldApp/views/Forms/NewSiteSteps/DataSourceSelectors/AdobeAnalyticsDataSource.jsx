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
import { AdobeAuthsIntegrationsQuery } from "queries/auth/adobe.gql";
import styles from "./styles";

const AdobeAnalyticsDataSource = ({
  classes,
  adobeAnalyticsDataSource,
  data,
  sendUpdate
}) => (
  <FormControl fullWidth className={classes.selectFormControl}>
    <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
      Select a Adobe Analytics Profile
    </InputLabel>
    <Select
      MenuProps={{
        className: classes.selectMenu
      }}
      classes={{
        select: classes.select
      }}
      value={adobeAnalyticsDataSource}
      onChange={e => {
        const { authStoreId, account } = JSON.parse(e.target.value);
        sendUpdate({
          adobeAnalyticsDataSource: e.target.value,
          adobeAnalyticsDataSourceData: {
            name: account.name,
            globalCompanyId: account.globalCompanyId,
            rsid: account.rsid,
            dimensions: account.dimensions,
            metrics: account.metrics,
            adobeAnalyticsDataSourceAuthStoreId: authStoreId
          }
        });
      }}
      inputProps={{
        name: "simpleSelect",
        id: "simple-select"
      }}
    >
      {_.flatten(
        _.map(_.get(data, "adobeAuths.edges", []), ({ node }) =>
          _.map(_.get(node, "adobeCompanyAccounts", []), account => (
            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected
              }}
              value={JSON.stringify({
                authStoreId: node.id,
                account
              })}
              key={`${node.id}${account.id}`}
            >
              {`${account.name}`}
            </MenuItem>
          ))
        )
      )}
    </Select>
  </FormControl>
);

AdobeAnalyticsDataSource.propTypes = {
  classes: PropTypes.object,
  sendUpdate: PropTypes.func,
  data: PropTypes.object,
  adobeAnalyticsDataSource: PropTypes.string
};

export default withStyles(styles)(
  graphql(AdobeAuthsIntegrationsQuery)(
    withLoader(AdobeAnalyticsDataSource, "linear")
  )
);
