import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

export function withLoader(
  Component,
  loaderVariant = "circular",
  dataSource = "data"
) {
  /* eslint-disable react/display-name */
  return props => (
    <ConnectedLoadingComponent
      {...props}
      variant={loaderVariant}
      dataSource={dataSource}
    >
      <Component {...props} />
    </ConnectedLoadingComponent>
  );
}

export default class ConnectedLoadingComponent extends React.Component {
  render() {
    const { variant, dataSource } = this.props;
    if (_.get(this.props, `${dataSource}.loading`, false)) {
      switch (variant) {
        case "linear":
          return <LinearProgress />;
        default:
          return <CircularProgress />;
      }
    }
    return this.props.children;
  }
}

ConnectedLoadingComponent.propTypes = {
  dataSource: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.string
};

ConnectedLoadingComponent.defaultProps = {
  dataSource: "data"
};

ConnectedLoadingComponent.defaultProps = {
  variant: "circular"
};
