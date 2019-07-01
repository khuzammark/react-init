import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql, compose } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import Button from "components/CustomButtons/Button";
import {
  DataSourcesAndTargetsQuery,
  BigQueryProjectsQuery,
  CreateBigQueryDataTargetMutation
} from "queries/data.gql";

class GoogleBigQueryStep2 extends React.Component {
  state = {
    selectedProjectId: ""
  };

  onChange = field => e => this.setState({ [field]: e.target.value });

  getSelectedProject = () => {
    const { data } = this.props;
    const { selectedProjectId } = this.state;
    return _.find(_.get(data, "googleAuth.bigQueryProjects", []), {
      projectId: selectedProjectId
    });
  };

  createBigQueryTarget = async () => {
    const { mutate, history, authStore } = this.props;

    await mutate({
      variables: {
        authStoreId: authStore,
        ...this.getSelectedProject()
      },
      refetchQueries: [{ query: DataSourcesAndTargetsQuery }]
    });
    return history.push("/dashboard/admin/data-targets");
  };

  componentDidMount() {
    const { history, authStore } = this.props;
    if (!authStore) {
      return history.push("/dashboard/admin/data-targets/new/google/bigquery");
    }
  }

  render() {
    const { classes, data } = this.props;

    const projectMenuItems = _.map(
      _.get(data, "googleAuth.bigQueryProjects", []),
      ({ projectId, friendlyName }) => (
        <MenuItem key={projectId} value={projectId}>
          {friendlyName}
        </MenuItem>
      )
    );

    return (
      <Grid
        container
        spacing={24}
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel
              htmlFor="accountSelector"
              className={classes.selectLabel}
            >
              Select a Project
            </InputLabel>
            <Select
              value={_.get(this.getSelectedProject(), "projectId", "")}
              inputProps={{
                name: "projectSelector",
                id: "projectSelector"
              }}
              onChange={this.onChange("selectedProjectId")}
            >
              {projectMenuItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Button color="google" onClick={this.createBigQueryTarget}>
              Next
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

GoogleBigQueryStep2.propTypes = {
  authStore: PropTypes.string,
  classes: PropTypes.object,
  history: PropTypes.object,
  data: PropTypes.object,
  mutate: PropTypes.func
};

export default withStyles(extendedFormsStyle)(
  compose(
    graphql(BigQueryProjectsQuery, {
      options: ({ authStore }) => ({
        variables: { authStoreId: authStore }
      })
    }),
    graphql(CreateBigQueryDataTargetMutation)
  )(withLoader(GoogleBigQueryStep2, "linear"))
);
