import React, { Component, Fragment } from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { Wizard } from "ui-lib";
import Page from "layouts/Page";
import RegisterForm from "components/RegisterForm";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      organization: "",
      agreeTOS: false
    };
  }

  onComplete = e => {
    const {
      props: { history }
    } = this;
    e.preventDefault();
    console.log("Values from state! ", this.state);
    history.push("/recipes");
  };

  handleChange = e => {
    e.preventDefault();
    const {
      target: { name, value }
    } = e;

    this.setState({
      [name]: name === "agreeTOS" ? value === "yes" : value
    });
  };

  render() {
    const {
      state: { email, password, firstName, lastName, organization, agreeTOS }
    } = this;
    return (
      <Fragment>
        <Wizard
          completeName="Get Started"
          onComplete={this.onComplete}
          steps={[
            {
              name: "Register",
              component: (
                <RegisterForm
                  handleChange={this.handleChange}
                  email={email}
                  password={password}
                  firstName={firstName}
                  lastName={lastName}
                  organization={organization}
                  agreeTOS={agreeTOS}
                />
              )
            }
          ]}
        />
      </Fragment>
    );
  }
}

Register.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

export default Page(Register);
