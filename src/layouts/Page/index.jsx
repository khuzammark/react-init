import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, makeStyles } from '@material-ui/core';
import { Header, Footer, mainTheme } from 'dpcomponents';
import HeaderData from '../../DummyData/header';
import FooterData from '../../DummyData/footer';
import './styles.scss';

const useStyles = makeStyles(theme => ({
    box: {
        padding: theme.spacing(8, 0, 0, 0),
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    footerWrapper: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }
}));

export default Component => {
    const PageLayout = props => {
        const classes = useStyles(mainTheme);
        return (
            <Box height={1} className={classes.box}>
                <Header {...{ ...HeaderData, ...props }} />
                <Container maxWidth="xl">
                    <Component {...props} />
                </Container>
                <div className={classes.footerWrapper}>
                    <Footer {...{ ...FooterData, ...props }} />
                </div>
            </Box>
        );
    };

    PageLayout.propTypes = {
        authenticated: PropTypes.bool.isRequired
    };

    return PageLayout;
};
