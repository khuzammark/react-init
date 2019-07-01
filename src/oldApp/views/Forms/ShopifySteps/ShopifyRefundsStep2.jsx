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
  CreateShopifyRefundsMutation,
  ShopifyRefundsQuery
} from "queries/data.gql";

class ShopifyRefundsStep2 extends React.Component {
  state = {
    selectedOrderId: ""
  };

  onChange = field => e => this.setState({ [field]: e.target.value });

  getDropdownState = () => {
    const { data } = this.props;
    const { selectedOrderId } = this.state;
    const selectedOrder = _.find(data.shopifyAuth.shopifyRecentOrders, {
      orderId: selectedOrderId
    });

    return {
      selectedOrder
    };
  };

  createShopifyRefunds = async () => {
    const { mutate, history, authStore } = this.props;
    const { selectedOrder } = this.getDropdownState();
    await mutate({
      variables: {
        orderId: selectedOrder.orderId,
        orderName: selectedOrder.orderName,
        authStoreId: authStore
      },
      refetchQueries: [{ query: DataSourcesAndTargetsQuery }]
    });
    return history.push("/dashboard/admin/data-sources");
  };

  componentDidMount() {
    const { history, authStore } = this.props;
    if (!authStore) {
      return history.push("/dashboard/admin/data-sources/shopify/refunds");
    }
  }

  render() {
    const { classes, data } = this.props;
    const { selectedOrderId } = this.state;

    const toMenuItem = ({ orderId, orderName }) => (
      <MenuItem key={orderId} value={orderId}>
        {orderName}
      </MenuItem>
    );

    const orderMenuItems = _.map(
      _.get(data, "shopifyAuth.shopifyRecentOrders", []),
      toMenuItem
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
            <InputLabel htmlFor="orderSelector" className={classes.selectLabel}>
              Select a Shopify Order
            </InputLabel>
            <Select
              value={selectedOrderId}
              inputProps={{
                name: "orderSelector",
                id: "orderSelector"
              }}
              onChange={this.onChange("selectedOrderId")}
            >
              {orderMenuItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <Button color="google" onClick={this.createShopifyRefunds}>
              Next
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

ShopifyRefundsStep2.propTypes = {
  authStore: PropTypes.string,
  classes: PropTypes.object,
  history: PropTypes.object,
  data: PropTypes.object,
  mutate: PropTypes.func
};

export default withStyles(extendedFormsStyle)(
  compose(
    graphql(ShopifyRefundsQuery, {
      options: ({ authStore }) => ({
        variables: { authStoreId: authStore }
      })
    }),
    graphql(CreateShopifyRefundsMutation)
  )(withLoader(ShopifyRefundsStep2, "linear"))
);
