import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";
import { UserConsumer } from "contexts/UserContext.jsx";
import SetupBillingForm from "views/Forms/SetupBillingForm.jsx";
import InvoicesTable from "views/Tables/InvoicesTable.jsx";
import InvoicePage from "views/Pages/Console/InvoicePage.jsx";
import { withLoader } from "components/ConnectedLoadingComponent/ConnectedLoadingComponent";
import { InvoicesQuery } from "queries/billing.gql";

const BillingPage = ({ data, match }) => (
  <UserConsumer>
    {user => {
      if (!user.billingEnabled) {
        return <SetupBillingForm />;
      }
      const invoiceId = _.get(match, "params.invoiceId");
      if (invoiceId) {
        const foundInvoiceEdge = _.find(
          _.get(data, "invoices.edges"),
          ({ node: { id } }) => id === invoiceId
        );
        if (foundInvoiceEdge) {
          return <InvoicePage invoice={foundInvoiceEdge.node} />;
        }
      }
      return <InvoicesTable data={data} />;
    }}
  </UserConsumer>
);

BillingPage.propTypes = {
  data: PropTypes.object,
  match: PropTypes.object
};

export default graphql(InvoicesQuery)(
  withRouter(withLoader(BillingPage, "linear"))
);
