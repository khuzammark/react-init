import React, { Component, Fragment } from 'react';
import { Wizard } from 'dpcomponents';
import Page from '../../layouts/Page';
import LoginForm from '../../components/LoginForm';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    onComplete = e => {
        e.preventDefault();
        console.log('Values from state! ', this.state);
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const {
            state: { email, password }
        } = this;
        return (
            <Fragment>
                <Wizard
                    completeName="Login"
                    onComplete={this.onComplete}
                    steps={[
                        {
                            name: 'Login',
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

export default Page(Login);
