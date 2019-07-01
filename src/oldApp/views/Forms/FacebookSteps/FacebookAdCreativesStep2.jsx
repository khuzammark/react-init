import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import Button from "components/CustomButtons/Button";
import {
  DataSourcesAndTargetsQuery,
  CreateFacebookAdCreativesDataSourceMutation
} from "queries/data.gql";

import AdAccounts from "views/Forms/FacebookSteps/FacebookSelects/AdAccounts.jsx";

class FacebookAdCreativesStep2 extends React.Component {
  state = { adAccountName: "", selectedAdAccountId: "" };
  onChange = field => e => this.setState({ [field]: e.target.value });

  createFacebookAdCreative = async () => {
    const { mutate, history, authStore } = this.props;
    const { adAccountName, selectedAdAccountId } = this.state;
    await mutate({
      variables: {
        adAccountName: adAccountName,
        adAccountId: selectedAdAccountId,
        authStoreId: authStore
      },
      refetchQueries: [{ query: DataSourcesAndTargetsQuery }]
    });
    return history.push("/dashboard/admin/data-sources");
  };

  componentDidMount() {
    const { history, authStore } = this.props;
    if (!authStore) {
      return history.push("/dashboard/admin/data-sources/facebook/ads");
    }
  }

  render() {
    const { adAccountName, selectedAdAccountId } = this.state;
    const { classes } = this.props;

    const toMenuItem = ({ id, name }) => (
      <MenuItem key={id} value={id}>
        {name}
      </MenuItem>
    );

    const adAccountSetting = {
      props: this.props,
      toMenuItem: toMenuItem,
      onChange: this.onChange,
      selectedAdAccountId: selectedAdAccountId
    };

    return (
      <Grid
        container
        spacing={24}
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item xs={9}>
          <AdAccounts setting={adAccountSetting} />
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <TextField
              id="adAccountName"
              style={{ width: "100%" }}
              label="Enter Ad Account Descriptive Name"
              value={adAccountName}
              onChange={this.onChange("adAccountName")}
              margin="normal"
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Button color="google" onClick={this.createFacebookAdCreative}>
              Next
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

FacebookAdCreativesStep2.propTypes = {
  authStore: PropTypes.string,
  classes: PropTypes.object,
  history: PropTypes.object,
  mutate: PropTypes.func
};

export default withStyles(extendedFormsStyle)(
  compose(graphql(CreateFacebookAdCreativesDataSourceMutation))(
    withLoader(FacebookAdCreativesStep2, "linear")
  )
);
