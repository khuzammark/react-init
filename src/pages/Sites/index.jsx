import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Hero } from '../../ui-lib';

import Page from '../../layouts/Page';
import HeroData from '../../DummyData/hero';

const styles = theme => ({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        margin: theme.spacing(4, 0)
    }
});

class SitesIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleSelect = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const {
            props: { classes }
        } = this;
        return (
            <Fragment>
                <Hero {...HeroData} classes={classes.none} />
            </Fragment>
        );
    }
}

SitesIndex.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Page(withStyles(styles)(SitesIndex));
