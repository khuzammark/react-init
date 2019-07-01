import React from "react";
import PropTypes from "prop-types";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomInput from "components/CustomInput/CustomInput.jsx";

const styles = () => ({
  customFormLabel: {
    marginTop: 15
  }
});

class AddCreditCard extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    setAsDefault: false
  };

  handleChange = field => e =>
    this.setState({ [field]: e.target.value }, () =>
      this.props.injectState(this.state)
    );

  render() {
    const { classes } = this.props;
    const { firstName, lastName, setAsDefault, processing } = this.state;
    if (processing) {
      return (
        <Grid container justify="center">
          <Grid item className={classes.progress}>
            <CircularProgress />
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid
        container
        alignItems="stretch"
        justify="flex-start"
        className={classes.cardContainer}
      >
        <Grid item xs={11}>
          <form onSubmit={this.handleSubmit}>
            <Grid container direction="column" spacing={16}>
              <Grid item>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel shrink className={classes.customFormLabel}>
                        CARD NUMBER
                      </InputLabel>
                      <CardNumberElement
                        className={`${classes.customInput} ${
                          classes.stripeInput
                        }`}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className={classes.expirationDateInput}>
                    <FormControl fullWidth>
                      <InputLabel shrink className={classes.customFormLabel}>
                        EXPIRATION DATE
                      </InputLabel>
                      <CardExpiryElement
                        className={`${classes.customInput} ${
                          classes.stripeInput
                        }`}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={12}>
                    <CustomInput
                      labelText={<span>Card Holder First Name</span>}
                      id="card-holder-first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange("firstName"),
                        placeholder: "First Name",
                        value: firstName
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.lastNameInput}>
                    <CustomInput
                      labelText={<span>Last Name</span>}
                      id="card-holder-last-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange("lastName"),
                        placeholder: "Last Name",
                        value: lastName
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel shrink className={classes.customFormLabel}>
                        Security Code
                      </InputLabel>
                      <CardCVCElement
                        className={`${classes.customInput} ${
                          classes.stripeInput
                        }`}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  classes={{ label: classes.checkBoxLabel }}
                  control={
                    <Checkbox
                      classes={{ root: classes.checkboxRoot }}
                      checked={setAsDefault}
                      onChange={event =>
                        this.setState({ setAsDefault: event.target.checked })
                      }
                      value="setAsDefault"
                    />
                  }
                  label="Set as Default Payment Method"
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

AddCreditCard.propTypes = {
  classes: PropTypes.object,
  injectState: PropTypes.func
};

export default withStyles(styles)(AddCreditCard);
