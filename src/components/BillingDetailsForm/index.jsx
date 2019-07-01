import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, TextField } from "@material-ui/core";

const BillingForm = ({
  cardInformation: { cardName, cardNumber, expDate, cvv },
  handleChange
}) => {
  return (
    <Fragment>
      <Typography variant="h6" gutterbottom="true">
        Billing Details
      </Typography>
      <TextField
        required
        id="cardName"
        value={cardName}
        onChange={handleChange}
        label="Name on card"
        fullWidth
      />
      <TextField
        required
        id="cardNumber"
        value={cardNumber}
        onChange={handleChange}
        label="Card number"
        fullWidth
      />
      <TextField
        required
        value={expDate}
        id="expDate"
        onChange={handleChange}
        label="Expiry date"
        fullWidth
      />
      <TextField
        required
        id="cvv"
        onChange={handleChange}
        value={cvv}
        label="CVV"
        helperText="Last three digits on signature stripe"
        fullWidth
      />
    </Fragment>
  );
};

BillingForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  cardInformation: PropTypes.shape({
    cardName: PropTypes.string.isRequired,
    cardNumbder: PropTypes.string.isRequired,
    expDate: PropTypes.string.isRequired,
    cvv: PropTypes.number.isRequired
  }).isRequired
};

export default BillingForm;
