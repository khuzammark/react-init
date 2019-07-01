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
import { FacebookAdAccountsQuery } from "queries/data.gql";

class AdAccounts extends React.Component {
  render() {
    const { setting, facebookAdAccounts } = this.props;
    const adAccountMenuItems = _.map(
      _.get(facebookAdAccounts, "facebookAuth.adAccounts", []),
      setting.toMenuItem
    );

    return (
      <FormControl
        fullWidth
        className={setting.props.classes.selectFormControl}
      >
        <InputLabel
          htmlFor="adAccountSelector"
          className={setting.props.classes.selectLabel}
        >
          Select a Facebook Ad Account
        </InputLabel>
        <Select
          value={setting.selectedAdAccountId}
          inputProps={{
            name: "adAccountSelector",
            id: "adAccountSelector"
          }}
          onChange={setting.onChange("selectedAdAccountId")}
        >
          {adAccountMenuItems}
        </Select>
      </FormControl>
    );
  }
}

AdAccounts.propTypes = {
  authStore: PropTypes.string,
  setting: PropTypes.object,
  facebookAdAccounts: PropTypes.object
};

export default withStyles(extendedFormsStyle)(
  compose(
    graphql(FacebookAdAccountsQuery, {
      options: ({ setting }) => ({
        variables: { authStoreId: setting.props.authStore }
      }),
      name: "facebookAdAccounts"
    })
  )(withLoader(AdAccounts, "linear"))
);
