import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box } from '@material-ui/core';
import { Header, Footer } from 'dpcomponents';
import HeaderData from '../../DummyData/header';
import FooterData from '../../DummyData/footer';
import './styles.scss';

export default Component => {
    const PageLayout = ({ authenticated }) => {
        return (
            <Container maxWidth="xl" id="m-c">
                <Box height={100}>
                    <Header {...{ ...HeaderData, authenticated }} />
                    <Component authenticated={authenticated} />
                    <Footer {...FooterData} />
                </Box>
            </Container>
        );
    };

    PageLayout.propTypes = {
        authenticated: PropTypes.bool.isRequired
    };

    return PageLayout;
};
