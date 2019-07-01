import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import { Redirect } from 'react-router';
import SweetAlert from 'react-bootstrap-sweetalert';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

// @material-ui/icons
import Email from '@material-ui/icons/Email';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

import { UserConsumer } from 'contexts/UserContext';

import sweetAlertStyle from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx';
import loginPageStyle from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx';
import { TokenAuthMutation } from 'queries/users.gql';

const StyledAlert = withStyles(sweetAlertStyle)(({ classes, ...props }) => (
  <SweetAlert
    {...props}
    confirmBtnCssClass={`${classes.button} ${classes.warning}`}
  />
));

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden',
      email: '',
      password: ''
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: '' });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  onSubmit = async e => {
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
      localStorage.setItem('token', token);
      const fromPath = localStorage.getItem('fromPath');
      localStorage.removeItem('fromPath');
      window.location.pathname = fromPath || '/dashboard';
    } catch (err) {
      this.setState({
        errors: [err.toString().replace('Error: GraphQL error: ', '')]
      });
    }
  };
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <UserConsumer>
        {user => {
          if (!_.isNull(user) && !_.isEmpty(user)) {
            return <Redirect to="/dashboard" />;
          }
          const alert =
            errors && errors.length ? (
              <StyledAlert
                style={{ display: 'block', marginTop: '-100px', color: '#333' }}
                title={errors.join('. ')}
                onConfirm={() => this.setState({ errors: [] })}
                onCancel={() => this.setState({ errors: [] })}
              />
            ) : null;
          return (
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={4}>
                  {alert}
                  <form action="#" method="GET" onSubmit={this.onSubmit}>
                    <Card login className={classes[this.state.cardAnimaton]}>
                      <CardHeader
                        className={`${classes.cardHeader} ${
                          classes.textCenter
                        }`}
                        color="rose"
                      >
                        <h4 className={classes.cardTitle}>Log in</h4>
                      </CardHeader>
                      <CardBody>
                        <CustomInput
                          labelText="Email..."
                          id="email"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: e =>
                              this.setState({ email: e.target.value }),
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            )
                          }}
                        />
                        <CustomInput
                          labelText="Password"
                          id="password"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: e =>
                              this.setState({ password: e.target.value }),
                            type: 'password',
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputAdornmentIcon}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            )
                          }}
                        />
                      </CardBody>
                      <CardFooter className={classes.justifyContentCenter}>
                        <Button
                          type="submit"
                          color="rose"
                          simple
                          size="lg"
                          block
                        >
                          {"Let's Go"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </GridItem>
              </GridContainer>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  mutate: PropTypes.func,
  history: PropTypes.object
};

export default graphql(TokenAuthMutation)(
  withStyles(loginPageStyle)(LoginPage)
);
