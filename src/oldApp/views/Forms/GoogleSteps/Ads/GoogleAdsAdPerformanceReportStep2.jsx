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
  CreateGoogleAdsAdPerformanceReportDataSourceMutation
} from "queries/data.gql";

class GoogleAdsAdPerformanceReportStep2 extends React.Component {
  state = { accountId: "", accountName: "" };

  onChange = field => e => this.setState({ [field]: e.target.value });

  createGoogleAdsAdPerformanceReport = async () => {
    const { mutate, history, authStore } = this.props;
    const { accountId, accountName } = this.state;
    await mutate({
      variables: {
        accountId: accountId,
        accountName: accountName,
        authStoreId: authStore
      },
      refetchQueries: [{ query: DataSourcesAndTargetsQuery }]
    });
    return history.push("/dashboard/admin/data-sources");
  };

  render() {
    const { classes } = this.props;
    const { accountId, accountName } = this.state;

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
              id="api-key"
              style={{ width: "100%" }}
              label="Enter Adwords Account ID(from google)"
              value={accountId}
              onChange={e => this.setState({ accountId: e.target.value })}
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth className={classes.selectFormControl}>
            <TextField
              id="accountName"
              style={{ width: "100%" }}
              label="Enter Name Account Name for Data Source"
              value={accountName}
              onChange={e => this.setState({ accountName: e.target.value })}
              margin="normal"
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Button
              color="google"
              onClick={this.createGoogleAdsAdPerformanceReport}
            >
              Submit
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

GoogleAdsAdPerformanceReportStep2.propTypes = {
  authStore: PropTypes.string,
  classes: PropTypes.object,
  history: PropTypes.object,
  data: PropTypes.object,
  mutate: PropTypes.func
};

export default withStyles(extendedFormsStyle)(
  compose(graphql(CreateGoogleAdsAdPerformanceReportDataSourceMutation))(
    withLoader(GoogleAdsAdPerformanceReportStep2, "linear")
  )
);
