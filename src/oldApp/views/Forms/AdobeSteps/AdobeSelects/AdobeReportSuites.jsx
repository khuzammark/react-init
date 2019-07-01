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
import { AdobeReportSuitesQuery } from "queries/data.gql";

class AdobeReportSuites extends React.Component {
  render() {
    const { setting, adobeReportSuites } = this.props;

    const toMenuItem = ({ rsid }) => (
      <MenuItem key={rsid} value={rsid}>
        {rsid}
      </MenuItem>
    );

    const adobeReportSuiteMenuItems =
      setting.selectedGlobalCompanyId !== ""
        ? _.map(
            _.get(adobeReportSuites, "adobeAuth.adobeReportSuites", []),
            toMenuItem
          )
        : "";

    return (
      <FormControl
        fullWidth
        className={setting.props.classes.selectFormControl}
      >
        <InputLabel
          htmlFor="adobeReportSuiteselector"
          className={setting.props.classes.selectLabel}
        >
          Select an Adobe Report Suite
        </InputLabel>
        <Select
          value={setting.selectedRsid}
          inputProps={{
            name: "adobeReportSuiteselector",
            id: "adobeReportSuiteselector"
          }}
          onChange={setting.onChange("selectedRsid")}
        >
          {adobeReportSuiteMenuItems}
        </Select>
      </FormControl>
    );
  }
}

AdobeReportSuites.propTypes = {
  authStore: PropTypes.string,
  setting: PropTypes.object,
  adobeReportSuites: PropTypes.object
};

export default withStyles(extendedFormsStyle)(
  compose(
    graphql(AdobeReportSuitesQuery, {
      options: ({ setting }) => ({
        variables: {
          authStoreId: setting.props.authStore,
          globalCompanyId: setting.selectedGlobalCompanyId
        }
      }),
      name: "adobeReportSuites"
    })
  )(withLoader(AdobeReportSuites, "linear"))
);
