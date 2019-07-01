import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Warning from "@material-ui/icons/Warning";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { userShouldEnableBilling } from "lib/utils";

const BillingWarning = ({ user }) =>
  userShouldEnableBilling(user) ? (
    <GridItem xs={12}>
      <GridContainer alignItems="center" justify="center">
        <GridItem xs={8}>
          <SnackbarContent
            message={
              <React.Fragment>
                Please <Link to="/dashboard/billing">enable billing</Link> to
                add more sites.
              </React.Fragment>
            }
            icon={Warning}
            color="rose"
            place="tc"
          />
        </GridItem>
      </GridContainer>
    </GridItem>
  ) : null;

BillingWarning.propTypes = {
  user: PropTypes.object.isRequired
};

export default BillingWarning;
