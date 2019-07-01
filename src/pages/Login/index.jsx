import React, { Component, Fragment } from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { graphql } from "react-apollo";
import { Wizard, Snackbar } from "../../ui-lib";
import Page from "../../layouts/Page";
import LoginForm from "../../components/LoginForm";
import { TokenAuthMutation } from "../../queries/users.gql";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: null
    };
  }

  onComplete = async e => {
    const {
      props: { history }
    } = this;
    e.preventDefault();
    try {
      const {
        data: {
          tokenAuth: { token }
        },
        errors
      } = await this.props.mutate({ variables: this.state });
      if (errors) {
        this.setState({ errors });
        return;
      }
      localStorage.setItem("token", token);
      const fromPath = localStorage.getItem("fromPath");
      localStorage.removeItem("fromPath");
      history.push("/recipes");
    } catch (err) {
      this.setState({
        errors: [err.toString().replace("Error: GraphQL error: ", "")]
      });
    }
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  clearError = () => {
    this.setState({
      errors: null
    });
  };

  render() {
    const {
      state: { email, password, errors }
    } = this;
    return (
      <Fragment>
        {errors ? (
          <Snackbar
            open={true}
            message={errors}
            link={{ link: "/login", name: "Try Again" }}
            variant="error"
            closeFn={this.clearError}
          />
        ) : null}
        <Wizard
          completeName="Login"
          onComplete={this.onComplete}
          steps={[
            {
              name: "Login",
              component: (
                <LoginForm
                  handleChange={this.handleChange}
                  email={email}
                  password={password}
                />
              )
            }
          ]}
        />
      </Fragment>
    );
  }
}

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

export default Page(graphql(TokenAuthMutation)(Login));
