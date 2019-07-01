import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql, compose } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import { AdobeCompanyAccountsQuery } from "queries/data.gql";

class AdobeCompanyAccounts extends React.Component {
  render() {
    const { setting, adobeCompanyAccounts } = this.props;

    const toMenuItem = ({ globalCompanyId, companyName }) => (
      <MenuItem key={globalCompanyId} value={globalCompanyId}>
        {companyName}
      </MenuItem>
    );

    const globalCompanyAccountMenuItems = _.map(
      _.get(adobeCompanyAccounts, "adobeAuth.adobeGlobalCompanyAccounts", []),
      toMenuItem
    );

    return (
      <FormControl
        fullWidth
        className={setting.props.classes.selectFormControl}
      >
        <InputLabel
          htmlFor="globalCompanyAccountSelector"
          className={setting.props.classes.selectLabel}
        >
          Select an Adobe Global Company Account
        </InputLabel>
        <Select
          value={setting.selectedGlobalCompanyId}
          inputProps={{
            name: "globalCompanyAccountSelector",
            id: "globalCompanyAccountSelector"
          }}
          onChange={setting.onChange("selectedGlobalCompanyId")}
        >
          {globalCompanyAccountMenuItems}
        </Select>
      </FormControl>
    );
  }
}

AdobeCompanyAccounts.propTypes = {
  authStore: PropTypes.string,
  setting: PropTypes.object,
  adobeCompanyAccounts: PropTypes.object
};

export default withStyles(extendedFormsStyle)(
  compose(
    graphql(AdobeCompanyAccountsQuery, {
      options: ({ setting }) => ({
        variables: { authStoreId: setting.props.authStore }
      }),
      name: "adobeCompanyAccounts"
    })
  )(withLoader(AdobeCompanyAccounts, "linear"))
);
