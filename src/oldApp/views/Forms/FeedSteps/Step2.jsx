import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql } from "react-apollo";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import { DataSourcesQuery } from "queries/data.gql";
import { nameFromDataNode, descriptionFromDataNode } from "lib/utils";

const style = {
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

class Step2 extends React.Component {
  state = {
    dataSourceId: "",
    orgId: ""
  };

  isValidated = () => this.state.dataSourceId !== "";

  render() {
    const { classes, data, injectState } = this.props;
    const { dataSourceId } = this.state;

    return (
      <div>
        <h4 className={classes.infoText}>
          Which data source are you cooking with?
        </h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <InputLabel
                htmlFor="simple-select"
                className={classes.selectLabel}
              >
                Select a Data Source
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={dataSourceId}
                onChange={e => {
                  const dataSourceId = e.target.value;
                  const orgId = _.find(_.get(data, "dataSources.edges", []), {
                    node: { id: dataSourceId }
                  }).node.org.id;
                  this.setState({ dataSourceId, orgId }, () =>
                    injectState(this.state)
                  );
                }}
                inputProps={{
                  name: "simpleSelect",
                  id: "simple-select"
                }}
              >
                {_.map(_.get(data, "dataSources.edges"), ({ node }) => (
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value={node.id}
                    key={node.id || Math.random()}
                  >
                    {`${nameFromDataNode[node.__typename]}
                      ${descriptionFromDataNode(node)}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  injectState: PropTypes.func
};

export default withStyles(style)(
  graphql(DataSourcesQuery)(withLoader(Step2, "linear"))
);
