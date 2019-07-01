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

const GoogleWebmastersDataSource = ({
  classes,
  googleWebmastersDataSource,
  data,
  sendUpdate
}) => (
  <FormControl fullWidth className={classes.selectFormControl}>
    <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
      Select a Google Webmasters Site
    </InputLabel>
    <Select
      MenuProps={{
        className: classes.selectMenu
      }}
      classes={{
        select: classes.select
      }}
      value={googleWebmastersDataSource}
      onChange={e => {
        const { url, authId } = JSON.parse(e.target.value);
        sendUpdate({
          googleWebmastersDataSource: e.target.value,
          googleWebmastersDataSourceData: {
            site: url,
            googleWebmastersDataSourceAuthStoreId: authId
          }
        });
      }}
      inputProps={{
        name: "simpleSelect",
        id: "simple-select"
      }}
    >
      {_.map(
        _.flatten(
          _.map(_.get(data, "googleAuths.edges", []), ({ node }) =>
            _.map(_.get(node, "webmasterSites", []), ({ url }) => [
              node.id,
              url
            ])
          )
        ),
        ([authId, url]) => (
          <MenuItem
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected
            }}
            value={JSON.stringify({ url, authId })}
            key={url}
          >
            {url}
          </MenuItem>
        )
      )}
    </Select>
  </FormControl>
);

GoogleWebmastersDataSource.propTypes = {
  classes: PropTypes.object,
  sendUpdate: PropTypes.func,
  data: PropTypes.object,
  googleWebmastersDataSource: PropTypes.string
};

export default withStyles(styles)(
  graphql(GoogleAuthsIntegrationsQuery)(
    withLoader(GoogleWebmastersDataSource, "linear")
  )
);
