import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import Button from "components/CustomButtons/Button";
import {
  DataSourcesAndTargetsQuery,
  CreateAdobeAnalyticsDataSourceMutation
} from "queries/data.gql";

import AdobeCompanyAccounts from "views/Forms/AdobeSteps/AdobeSelects/AdobeCompanyAccounts.jsx";
import AdobeReportSuites from "views/Forms/AdobeSteps/AdobeSelects/AdobeReportSuites.jsx";

class AdobeAnalyticsStep2 extends React.Component {
  state = {
    name: "",
    selectedGlobalCompanyId: "",
    selectedRsid: "",
    dimensions: "",
    metrics: ""
  };
  onChange = field => e => this.setState({ [field]: e.target.value });

  createAdobeAnalytics = async () => {
    const { mutate, history, authStore } = this.props;
    const {
      name,
      selectedGlobalCompanyId,
      selectedRsid,
      dimensions,
      metrics
    } = this.state;
    await mutate({
      variables: {
        name: name,
        globalCompanyId: selectedGlobalCompanyId,
        rsid: selectedRsid,
        dimensions: dimensions,
        metrics: metrics,
        authStoreId: authStore
      },
      refetchQueries: [{ query: DataSourcesAndTargetsQuery }]
    });
    return history.push("/dashboard/admin/data-sources");
  };

  componentDidMount() {
    const { history, authStore } = this.props;
    if (!authStore) {
      return history.push("/dashboard/admin/data-sources/adobe/analytics");
    }
  }

  render() {
    const {
      name,
      selectedGlobalCompanyId,
      selectedRsid,
      dimensions,
      metrics
    } = this.state;
    const { classes } = this.props;

    const selectSetting = {
      props: this.props,
      onChange: this.onChange,
      selectedGlobalCompanyId: selectedGlobalCompanyId,
      selectedRsid: selectedRsid
    };

    return (
      <Grid
        container
        spacing={24}
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <TextField
              id="name"
              style={{ width: "100%" }}
              label="Enter Adobe Data Source Name"
              value={name}
              onChange={this.onChange("name")}
              margin="normal"
            />
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <AdobeCompanyAccounts setting={selectSetting} />
        </Grid>
        <Grid item xs={9}>
          <AdobeReportSuites setting={selectSetting} />
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <TextField
              id="dimensions"
              style={{ width: "100%" }}
              label="Enter Dimensions. (Max of 2 comma separated)"
              value={dimensions}
              onChange={this.onChange("dimensions")}
              margin="normal"
            />
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <TextField
              id="metrics"
              style={{ width: "100%" }}
              label="Enter Metrics. (comma separated)"
              value={metrics}
              onChange={this.onChange("metrics")}
              margin="normal"
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Button color="google" onClick={this.createAdobeAnalytics}>
              Next
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

AdobeAnalyticsStep2.propTypes = {
  authStore: PropTypes.string,
  classes: PropTypes.object,
  history: PropTypes.object,
  mutate: PropTypes.func
};

export default withStyles(extendedFormsStyle)(
  compose(graphql(CreateAdobeAnalyticsDataSourceMutation))(
    withLoader(AdobeAnalyticsStep2, "linear")
  )
);
