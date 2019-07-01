import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import { GoogleAuthBigQueryProjectsQuery } from "queries/auth/google.gql";

const styles = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class DataSourceSelectors extends React.Component {
  state = {
    bigQueryDataTarget: "",
    bigQueryDataTargetData: {}
  };
  render() {
    const { data, targets, classes, injectState } = this.props;
    const { bigQueryDataTarget } = this.state;
    return _.map(targets, target => {
      switch (target) {
        case "bigQueryDataTarget":
          return (
            <FormControl
              key={target}
              fullWidth
              className={classes.selectFormControl}
            >
              <InputLabel
                htmlFor="simple-select"
                className={classes.selectLabel}
              >
                Select a BigQuery Project
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={bigQueryDataTarget}
                onChange={e => {
                  const { authId, project, projectName } = JSON.parse(
                    e.target.value
                  );
                  this.setState(
                    {
                      bigQueryDataTarget: e.target.value,
                      bigQueryDataTargetData: {
                        project,
                        projectName,
                        bigQueryDataTargetAuthStoreId: authId
                      }
                    },
                    () => injectState(this.state)
                  );
                }}
                inputProps={{
                  name: "simpleSelect",
                  id: "simple-select"
                }}
              >
                {_.flatten(
                  _.map(_.get(data, "googleAuths.edges", []), ({ node }) =>
                    _.map(
                      _.get(node, "bigQueryProjects", []),
                      ({ projectId, friendlyName }) => (
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value={JSON.stringify({
                            authId: node.id,
                            project: projectId,
                            projectName: friendlyName
                          })}
                          key={projectId}
                        >
                          {friendlyName}
                        </MenuItem>
                      )
                    )
                  )
                )}
              </Select>
            </FormControl>
          );
        default:
          return null;
      }
    });
  }
}

DataSourceSelectors.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object,
  injectState: PropTypes.func,
  targets: PropTypes.array
};

export default withStyles(styles)(
  graphql(GoogleAuthBigQueryProjectsQuery)(
    withLoader(DataSourceSelectors, "linear")
  )
);
