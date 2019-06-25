import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Wizard, Stepper } from '../../../ui-lib';
import Page from '../../../layouts/Page';
import SiteDetailsForm from '../../../components/SiteDetailsForm';
import stepperData from '../../../DummyData/stepper';
import wizardData from '../../../DummyData/wizard';

const styles = theme => ({
    sideBarContainer: {
        maxWidth: theme.breakpoints.values.sm / 2
    },
    tableNavWrapper: {
        display: 'flex',
        felxDirection: 'wrap',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
    },
    tableContainer: {
        flexGrow: 1
    }
});

class SiteSetup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            siteName: '',
            siteDomain: ''
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
        const { classes } = this.props;
        const {
            state: { activeStep, siteName, siteDetails }
        } = this;
        return (
            <Fragment>
                <div className={classes.tableNavWrapper}>
                    <aside className={classes.sideBarContainer}>
                        <Stepper {...{ ...stepperData, activeStep }} />
                    </aside>
                    <div className={classes.tableContainer}>
                        <Wizard
                            completeName="Finish"
                            onComplete={this.onComplete}
                            steps={[
                                {
                                    name: 'SiteDetails',
                                    component: (
                                        <SiteDetailsForm
                                            handleChange={this.handleChange}
                                            siteName={siteName}
                                            siteDetails={siteDetails}
                                        />
                                    )
                                }
                            ]}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

SiteSetup.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired
};

const options = {
    showLinks: false
};

export default Page(withStyles(styles)(SiteSetup), options);
