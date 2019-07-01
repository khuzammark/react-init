import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import _ from "lodash";
import moment from "moment";
import { withRouter } from "react-router";
import SweetAlert from "react-bootstrap-sweetalert";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Receipt from "@material-ui/icons/Receipt";
import Close from "@material-ui/icons/Close";
import Description from "@material-ui/icons/Description";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Table from "components/Table/Table.jsx";
import Badge from "components/Badge/Badge.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import { UserConsumer } from "contexts/UserContext";
import {
  SubmitPaymentFromSourceMutation,
  InvoicesQuery
} from "queries/billing.gql";

// for some reason, we need this to get the title of the card to be black.
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

const style = theme => ({
  selectMenu: {
    zIndex: 5600
  },
  selectMenuItem: {
    zIndex: 5700
  },
  alertText: {
    marginBottom: theme.spacing.unit * 5
  },
  ...extendedTablesStyle,
  ...sweetAlertStyle
});

class InvoicePage extends React.Component {
  state = {
    showPaymentModal: false,
    successModal: "",
    errorModal: "",
    selectedPaymentSource: ""
  };

  submitPayment = user => async () => {
    const { invoice, mutate } = this.props;
    this.setState({ paymentModalLoading: true });
    try {
      const {
        data: {
          submitPaymentFromSource: { ok, message }
        }
      } = await mutate({
        variables: {
          invoiceId: invoice.id,
          sourceId: this.getSourceId(user)
        },
        refetchQueries: [{ query: InvoicesQuery }]
      });
      if (ok) {
        this.setState({
          showPaymentModal: false,
          successModal: true,
          paymentModalLoading: false
        });
      } else {
        this.setState({
          showPaymentModal: false,
          errorModal: message,
          paymentModalLoading: false
        });
      }
    } catch (err) {
      this.setState({
        showPaymentModal: false,
        errorModal: err.toString(),
        paymentModalLoading: false
      });
    }
  };

  getSourceId = user => {
    const { selectedPaymentSource } = this.state;
    if (!selectedPaymentSource) {
      return _.find(this.getPaymentSources(user), "isDefault").id;
    } else {
      return selectedPaymentSource;
    }
  };

  getPaymentSources = user => {
    return _.concat(
      _.map(
        _.get(user, "creditCards"),
        ({ id, last4, funding, isDefault }) => ({
          id,
          name: `${_.startCase(funding)} Card ending in ${last4}`,
          isDefault
        })
      ),
      _.map(
        _.get(user, "bankAccounts"),
        ({ id, last4, bankName, isDefault }) => ({
          id,
          name: `${bankName} ending in ${last4}`,
          isDefault
        })
      )
    );
  };

  getModal = () => {
    const { classes, invoice } = this.props;
    const {
      showPaymentModal,
      paymentModalLoading,
      errorModal,
      successModal
    } = this.state;
    if (showPaymentModal) {
      if (paymentModalLoading) {
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-200px" }}
            title="Processing Payment..."
            showConfirm={false}
            onConfirm={() => {}}
          >
            <LinearProgress />
          </SweetAlert>
        );
      }
      return (
        <UserConsumer>
          {user => (
            <SweetAlert
              style={{ display: "block", marginTop: "-200px" }}
              title="Pay Invoice"
              onConfirm={this.submitPayment(user)}
              onCancel={() => this.setState({ showPaymentModal: false })}
              confirmBtnCssClass={`${classes.button} ${classes.info}`}
              cancelBtnCssClass={`${classes.button} ${classes.cancel}`}
              confirmBtnText="Submit Payment"
              showCancel
            >
              <React.Fragment>
                <Typography variant="body2" className={classes.alertText}>
                  {`This will authorize a charge for $${parseFloat(
                    invoice.remainingBalance
                  ).toFixed(2)} to the payment source you choose below.`}
                </Typography>
                <FormControl fullWidth className={classes.selectFormControl}>
                  <InputLabel
                    htmlFor="source-select"
                    className={classes.selectLabel}
                  >
                    Select a Payment Source
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    value={this.getSourceId(user)}
                    onChange={e =>
                      this.setState({ selectedPaymentSource: e.target.value })
                    }
                    inputProps={{
                      name: "sourceSelect",
                      id: "source-select"
                    }}
                  >
                    {_.map(this.getPaymentSources(user), ({ id, name }) => (
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value={id}
                        key={id}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </React.Fragment>
            </SweetAlert>
          )}
        </UserConsumer>
      );
    }
    if (errorModal) {
      return (
        <SweetAlert
          style={{ display: "block", marginTop: "-200px" }}
          title="There was an error processing your payment"
          onConfirm={() => this.setState({ errorModal: "" })}
          confirmBtnCssClass={`${classes.button} ${classes.danger}`}
          type="error"
        >
          <Typography variant="body2">{errorModal}</Typography>
        </SweetAlert>
      );
    }
    if (successModal) {
      return (
        <SweetAlert
          style={{ display: "block", marginTop: "-200px" }}
          title="Payment Succeeded!"
          onConfirm={() => this.setState({ successModal: "" })}
          type="success"
          confirmBtnCssClass={`${classes.button} ${classes.success}`}
        />
      );
    }
  };

  render() {
    const { classes, history, invoice } = this.props;
    const chargesData = _.map(
      _.get(invoice, "charges.edges", []),
      ({ node: { name, rate, quantity } }) => [
        name,
        `$${rate.toFixed(2)}`,
        quantity,
        `$${(rate * quantity).toFixed(2)}`
      ]
    );

    const paymentsData = _.map(
      _.get(invoice, "payments.edges", []),
      ({ node: { amount, created } }) => [
        `$${amount.toFixed(2)}`,
        moment(created).format("lll")
      ]
    );

    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info" icon>
              <GridContainer justify="space-between">
                <GridItem>
                  <CardIcon color="primary">
                    <Receipt />
                  </CardIcon>
                </GridItem>
                <GridItem>
                  <h4 className={classes.cardIconTitle}>
                    {`Invoice -- ${invoice.name}`}
                  </h4>
                </GridItem>
                <GridItem>
                  <Button
                    justIcon
                    round
                    style={{ paddingTop: "5px" }}
                    onClick={() => history.push("/dashboard/billing")}
                  >
                    <Close />
                  </Button>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>
              <GridContainer direction="column">
                {this.getModal()}
                <GridItem xs={12}>
                  <Card>
                    <CardHeader color="rose" icon>
                      <CardIcon color="rose">
                        <Description />
                      </CardIcon>
                      <h4 className={classes.cardIconTitle}>Details</h4>
                    </CardHeader>
                    <CardBody>
                      <Table
                        tableHeaderColor="primary"
                        tableHead={[
                          "Invoice Date",
                          "Due Date",
                          "Invoice Amount",
                          "Amount Due",
                          "Status",
                          ""
                        ]}
                        tableData={[
                          [
                            moment(invoice.created).format("lll"),
                            moment(invoice.dueDate).format("ll"),
                            `$${parseFloat(invoice.totalAmount).toFixed(2)}`,
                            `$${parseFloat(invoice.remainingBalance).toFixed(
                              2
                            )}`,
                            <Badge
                              key={invoice.id}
                              color={
                                invoice.status === "BALANCE DUE"
                                  ? "danger"
                                  : "success"
                              }
                            >
                              {invoice.status}
                            </Badge>,
                            invoice.remainingBalance > 0 ? (
                              <Button
                                round
                                color="primary"
                                onClick={() =>
                                  this.setState({ showPaymentModal: true })
                                }
                              >
                                Pay Invoice
                              </Button>
                            ) : null
                          ]
                        ]}
                      />
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12}>
                  <Card>
                    <CardHeader color="rose" icon>
                      <CardIcon color="rose">
                        <Assignment />
                      </CardIcon>
                      <h4 className={classes.cardIconTitle}>Charges</h4>
                    </CardHeader>
                    <CardBody>
                      <Table
                        tableHeaderColor="primary"
                        tableHead={["Name", "Rate", "Quantity", "Subtotal"]}
                        tableData={chargesData}
                      />
                    </CardBody>
                  </Card>
                </GridItem>
                {_.isEmpty(paymentsData) ? null : (
                  <GridItem xs={12}>
                    <Card>
                      <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                          <Receipt />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Payments</h4>
                      </CardHeader>
                      <CardBody>
                        <Table
                          tableHeaderColor="primary"
                          tableHead={["Amount", "Payment Date"]}
                          tableData={paymentsData}
                        />
                      </CardBody>
                    </Card>
                  </GridItem>
                )}
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

InvoicePage.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  invoice: PropTypes.object,
  mutate: PropTypes.func
};

export default withStyles(style)(
  withRouter(
    graphql(SubmitPaymentFromSourceMutation)(withLoader(InvoicePage, "linear"))
  )
);
