import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { Stepper, SimpleTable, Wizard, PricingCard } from '../../ui-lib';
import Page from '../../layouts/Page';
import LoginForm from '../../components/LoginForm';
import stepperData from '../../DummyData/stepper';
import pricingData from '../../DummyData/pricingCard';
import simpletableData from '../../DummyData/simpletable';

const styles = theme => {
    return {
        sideBarContainer: {
            maxWidth: theme.breakpoints.values.sm / 2
        },
        contentWrapper: {
            display: 'flex',
            flexDirection: 'row',
            height: 'fit-content',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            margin: theme.spacing(4)
        },
        contentContainer: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            overflow: 'auto'
        },
        cardContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignContent: 'center',
            margin: theme.spacing(4, 0)
        }
    };
};

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    onComplete = e => {
        const {
            props: { history }
        } = this;
        e.preventDefault();
        console.log('Values from state! ', this.state);
        history.push('/recipes');
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const {
            state: { email, password },
            props: { classes }
        } = this;
        return (
            <Fragment>
                <div className={classes.contentWrapper}>
                    <aside className={classes.sideBarContainer}>
                        <Stepper {...stepperData} />
                    </aside>
                    <div className={classes.contentContainer}>
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
                        <div className={classes.cardContainer}>
                            <PricingCard {...pricingData} />
                            <PricingCard {...pricingData} />
                            <PricingCard {...pricingData} />
                        </div>
                        <SimpleTable {...simpletableData} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

Account.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    classes: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Page(withStyles(styles)(Account));
