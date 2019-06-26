import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Wizard, Stepper } from '../../../ui-lib';
import Page from '../../../layouts/Page';
import SiteDetailsForm from '../../../components/SiteDetailsForm';
import SiteSourcesForm from '../../../components/SiteSourcesForm';
import BigQueryForm from '../../../components/BigQueryForm';
import ConfirmSiteSetup from '../../../components/ConfirmSiteSetup';
import stepperData from '../../../DummyData/stepper';

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
            siteName: '',
            siteDomain: '',
            sources: [
                {
                    name: 'Select A Google Analytics Profile',
                    data: ['Profile 1', 'Profile 2', 'Profile 3'],
                    selection: []
                }
            ],
            targets: [
                {
                    name: 'Select A BigQuery Project',
                    data: ['Project 1', 'Project 2', 'Project 3'],
                    selection: []
                }
            ]
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

    handleSelect = (collection, e) => {
        const {
            state: { [collection]: oldSources }
        } = this;
        this.setState({
            [collection]: oldSources.map(source => {
                if (source.name === e.target.name) {
                    return { ...source, selection: [...e.target.value] };
                }
                return source;
            })
        });
    };

    render() {
        const { classes } = this.props;
        const {
            state: { siteName, siteDetails, sources, targets }
        } = this;
        return (
            <Fragment>
                <div className={classes.tableNavWrapper}>
                    <aside className={classes.sideBarContainer}>
                        <Stepper {...{ ...stepperData, detail: true }} />
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
                                },
                                {
                                    name: 'SiteSources',
                                    component: (
                                        <SiteSourcesForm
                                            handleSelect={e => {
                                                this.handleSelect('sources', e);
                                            }}
                                            sources={sources}
                                        />
                                    )
                                },
                                {
                                    name: 'TargetSource',
                                    component: (
                                        <BigQueryForm
                                            handleSelect={e => {
                                                this.handleSelect('targets', e);
                                            }}
                                            sources={targets}
                                        />
                                    )
                                },
                                {
                                    name: 'Confirm',
                                    component: (
                                        <ConfirmSiteSetup data={this.state} />
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
