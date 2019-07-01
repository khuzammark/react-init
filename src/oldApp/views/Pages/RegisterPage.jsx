import React from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";

import _ from "lodash";

import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Work from "@material-ui/icons/Work";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

import { OrgQuery, UserQuery, RegisterUserMutation } from "queries/users.gql";

const fieldDefaults = {
  value: "",
  valid: null,
  reason: ""
};

const defaultAlert = { type: null, message: "" };

class RegisterPage extends React.Component {
  state = {
    checked: [],
    loading: false,
    alert: { ...defaultAlert },
    email: { ...fieldDefaults },
    firstName: { ...fieldDefaults },
    lastName: { ...fieldDefaults },
    orgName: { ...fieldDefaults },
    password: { ...fieldDefaults }
  };

  onChange = field => e =>
    this.setState(
      { [field]: { ...this.state[field], value: e.target.value } },
      () =>
        _.isFunction(
          this[`${field}ChangeTrigger`] && this[`${field}ChangeTrigger`]()
        )
    );

  handleToggle = value => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  emailChangeTrigger = () => {
    const { client } = this.props;
    const {
      email: { value }
    } = this.state;
    let valid = true;
    let reason = "";
    if (_.isEmpty(value)) {
      valid = false;
    } else if (!_.includes(value, "@")) {
      valid = false;
      reason = "Please enter a valid email address.";
    }
    if (valid) {
      // todo: debounce?
      client
        .query({
          query: UserQuery,
          variables: { email: value }
        })
        .then(({ data: { user } }) => {
          if (_.isNull(user)) {
            this.setState({ email: { value, valid, reason } });
          } else {
            this.setState({
              email: {
                value,
                valid: false,
                reason: "A user exists with this email address."
              }
            });
          }
        });
    } else {
      this.setState({ email: { value, valid, reason } });
    }
  };

  validateRequired = (field, cb = () => {}) => () => {
    const { value } = this.state[field];
    let valid = true;
    let reason = "";
    if (_.isEmpty(value)) {
      valid = false;
      reason = "This field is required.";
    }
    this.setState({ [field]: { value, valid, reason } }, cb);
  };

  firstNameChangeTrigger = this.validateRequired("firstName");
  lastNameChangeTrigger = this.validateRequired("lastName");
  passwordChangeTrigger = this.validateRequired("password");

  orgNameChangeTrigger = () => {
    const {
      orgName: { value }
    } = this.state;
    let valid = true;
    let reason = "";
    if (_.isEmpty(value)) {
      valid = false;
      reason = "This field is required.";
      return this.setState({ orgName: { value, valid, reason } });
    }
    const { client } = this.props;
    client
      .query({
        query: OrgQuery,
        variables: { name: value }
      })
      .then(({ data: { org } }) => {
        if (_.isNull(org)) {
          this.setState({
            orgName: { value, valid: true, reason: "" }
          });
        } else {
          this.setState({
            orgName: {
              value,
              valid: false,
              reason: "This organization already exists."
            }
          });
        }
      });
  };

  renderAlert = () => {
    const {
      alert: { type, message }
    } = this.state;
    switch (type) {
      case null:
        return null;
      case "createSuccess":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title={message}
            onConfirm={() => {
              window.location.pathname = "/";
            }}
            onCancel={() => this.setState({ alert: { ...defaultAlert } })}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
          />
        );
      case "createError":
        return (
          <SweetAlert
            style={{ display: "block", marginTop: "-100px" }}
            title={message}
            onConfirm={() => this.setState({ alert: { ...defaultAlert } })}
            onCancel={() => this.setState({ alert: { ...defaultAlert } })}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.warning
            }
          />
        );
      default:
        return null;
    }
  };

  onSubmit = async () => {
    const { email, firstName, lastName, orgName, password } = this.state;
    const { client } = this.props;
    this.setState({ loading: true });
    try {
      const {
        error,
        data: {
          registerUser: { ok, token }
        }
      } = await client.mutate({
        mutation: RegisterUserMutation,
        variables: {
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
          orgName: orgName.value,
          password: password.value
        }
      });
      if (!ok || error) {
        this.setState({
          loading: false,
          alert: {
            type: "createError",
            message: `There was an error creating your user: ${error}`
          }
        });
      } else {
        localStorage.setItem("token", token);
        this.setState({
          loading: false,
          alert: {
            type: "createSuccess",
            message: "Successfully created your user. Welcome!"
          }
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        alert: {
          type: "createError",
          message: `There was an error creating registering your user: ${error}`
        }
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      email,
      firstName,
      lastName,
      orgName,
      password,
      checked,
      loading
    } = this.state;
    const fields = [email, firstName, lastName, orgName, password];
    const allValid =
      checked &&
      _.every(_.map(fields, "valid")) &&
      !_.some(_.map(fields, ({ value }) => _.isEmpty(value)));
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle} style={{ textAlign: "center" }}>
                Register
              </h2>
              {this.renderAlert()}
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} md={5}>
                    <form className={classes.form}>
                      <CustomInput
                        success={email.valid}
                        error={!email.valid}
                        helpText={email.reason}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          type: "email",
                          onChange: this.onChange("email"),
                          placeholder: "Email..."
                        }}
                      />
                      <CustomInput
                        success={firstName.valid}
                        error={!firstName.valid}
                        helpText={firstName.reason}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "First Name...",
                          onChange: this.onChange("firstName")
                        }}
                      />
                      <CustomInput
                        success={lastName.valid}
                        error={!lastName.valid}
                        helpText={lastName.reason}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "Last Name...",
                          onChange: this.onChange("lastName")
                        }}
                      />
                      <CustomInput
                        success={orgName.valid}
                        error={!orgName.valid}
                        helpText={orgName.reason}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Work className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "Organization Name",
                          onChange: this.onChange("orgName")
                        }}
                      />
                      <CustomInput
                        success={password.valid}
                        error={!password.valid}
                        helpText={password.reason}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          type: "password",
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.inputAdornmentIcon}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          placeholder: "Password...",
                          onChange: this.onChange("password")
                        }}
                      />
                      <FormControlLabel
                        classes={{
                          root: classes.checkboxLabelControl,
                          label: classes.checkboxLabel
                        }}
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(1)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked
                            }}
                          />
                        }
                        label={
                          <span>I agree to the terms and conditions.</span>
                        }
                      />
                      <div className={classes.center}>
                        {loading ? (
                          <CircularProgress />
                        ) : (
                          <Button
                            round
                            color="primary"
                            disabled={!allValid}
                            onClick={this.onSubmit}
                          >
                            Get started
                          </Button>
                        )}
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles({ ...registerPageStyle, ...sweetAlertStyle })(
  withApollo(RegisterPage)
);
