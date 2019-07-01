import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomInput from "components/CustomInput/CustomInput.jsx";

const styles = {};

class AddBankAccount extends React.Component {
  state = {
    setAsDefault: false,
    accountHolderName: "",
    routingNumber: "",
    accountNumber: ""
  };

  isFormInvalid = () => {
    const { setAsDefault, agreeToTerms } = this.state;
    return !setAsDefault || !agreeToTerms;
  };

  handleChange = field => event =>
    this.setState({ [field]: event.target.value }, () =>
      this.props.injectState(this.state)
    );

  render() {
    const { classes } = this.props;
    const {
      setAsDefault,
      processing,
      accountHolderName,
      routingNumber,
      accountNumber
    } = this.state;
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
                <Grid container>
                  <Grid item xs={12}>
                    <CustomInput
                      labelText={<span>Account Holder Name</span>}
                      id="account-holder-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange("accountHolderName"),
                        placeholder: "Full Name",
                        value: accountHolderName
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={12}>
                    <CustomInput
                      labelText={<span>Account Number</span>}
                      id="account-number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange("accountNumber"),
                        placeholder: "Account Number",
                        value: accountNumber
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={12}>
                    <CustomInput
                      labelText={<span>Routing Number</span>}
                      id="routing-number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange("routingNumber"),
                        placeholder: "Routing Number",
                        value: routingNumber
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
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

AddBankAccount.propTypes = {
  classes: PropTypes.object,
  injectState: PropTypes.func
};

export default withStyles(styles)(AddBankAccount);
