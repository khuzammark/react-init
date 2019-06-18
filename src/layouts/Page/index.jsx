import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, makeStyles } from '@material-ui/core';
import { Header, Footer, mainTheme } from 'dpcomponents';
import HeaderData from '../../DummyData/header';
import FooterData from '../../DummyData/footer';
import './styles.scss';

const useStyles = makeStyles(theme => ({
    box: {
        padding: theme.spacing(8, 0, 0, 0)
    }
}));

export default Component => {
    const PageLayout = ({ authenticated }) => {
        const classes = useStyles(mainTheme);
        return (
            <Box height={100} className={classes.box}>
                <Header {...{ ...HeaderData, authenticated }} />
                <Container maxWidth="xl">
                    <Component authenticated={authenticated} />
                </Container>
                <Footer {...FooterData} />
            </Box>
        );
    };

    PageLayout.propTypes = {
        authenticated: PropTypes.bool.isRequired
    };

    return PageLayout;
};
