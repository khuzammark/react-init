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

const FacebookAdCreativesDataSource = ({
  classes,
  data,
  facebookAdCreativesDataSource,
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
      value={facebookAdCreativesDataSource}
      onChange={e => {
        const { accountId, accountName, authStoreId } = JSON.parse(
          e.target.value
        );
        sendUpdate({
          facebookAdCreativesDataSource: e.target.value,
          facebookAdCreativesDataSourceData: {
            facebookAdCreativesDataSourceAuthStoreId: authStoreId,
            facebookAdCreativesDataSourceAccountId: accountId,
            facebookAdCreativesDataSourceAccountName: accountName
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
            ({ id: accountId, name: accountName }) => (
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value={JSON.stringify({
                  accountId,
                  accountName,
                  authStoreId: node.id
                })}
                key={`${node.id}-${accountId}`}
              >
                {`${accountName} (${accountId})`}
              </MenuItem>
            )
          )
        )
      )}
    </Select>
  </FormControl>
);

FacebookAdCreativesDataSource.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  facebookAdCreativesDataSource: PropTypes.string,
  sendUpdate: PropTypes.func
};

export default withStyles(styles)(
  graphql(FacebookConfigsForAuthsQuery)(
    withLoader(FacebookAdCreativesDataSource),
    "linear"
  )
);
