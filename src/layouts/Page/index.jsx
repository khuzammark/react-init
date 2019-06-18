import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { Header, Footer } from 'dpcomponents';
import HeaderData from '../../DummyData/header';
import FooterData from '../../DummyData/footer';
import './styles.scss';

export default Component => {
    const PageLayout = ({ authenticated }) => {
        return (
            <Container maxWidth="xl" id="m-c">
                <Header {...{ ...HeaderData, authenticated }} />
                <Component authenticated={authenticated} />
                <Footer {...FooterData} className="m-f" />
            </Container>
        );
    };

    PageLayout.propTypes = {
        authenticated: PropTypes.bool.isRequired
    };

    return PageLayout;
};
