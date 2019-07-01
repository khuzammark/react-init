/* eslint-disable */
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { useQuery } from "react-apollo-hooks";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import LinearProgress from "@material-ui/core/LinearProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { ShopifyAuthsQuery } from "queries/auth/shopify.gql";
import styles from "./styles";

function ShopifyDataSource({ classes, source, sendUpdate, sourceData }) {
  const { data, loading } = useQuery(ShopifyAuthsQuery);
  if (loading) {
    return <LinearProgress />;
  }
  return (
  <FormControl fullWidth className={classes.selectFormControl}>
    <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
      {`Select a Shopify Shop for the ${_.startCase(source)}`}
    </InputLabel>
    <Select
      MenuProps={{
        className: classes.selectMenu
      }}
      classes={{
        select: classes.select
      }}
      value={sourceData[`${source}Auth`]}
      onChange={e => {
        sendUpdate({
          shopifyDataSourceData: {
            ...sourceData,
            [`${source}Auth`]: e.target.value,
          }
        });
      }}
      inputProps={{
        name: "simpleSelect",
        id: "simple-select"
      }}
    >
      {_.map(_.get(data, "shopifyAuths.edges", []), ({ node }) => (
        <MenuItem
          classes={{
            root: classes.selectMenuItem,
            selected: classes.selectMenuItemSelected
          }}
          value={node.id}
          key={node.id}
        >
          {node.userAuth.shop}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
}

ShopifyDataSource.propTypes = {
  source: PropTypes.string,
  sendUpdate: PropTypes.func,
  sourceData: PropTypes.object
};

export default withStyles(styles)(ShopifyDataSource);
