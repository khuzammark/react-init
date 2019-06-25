import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    AppBar,
    IconButton,
    Toolbar,
    Menu,
    MenuItem
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import Theme from '../theme';
import Logo from '../Logo';
import Link from '../Link';

const useStyles = makeStyles(theme => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'fixed',
        top: 0,
        margin: '0 auto'
    },
    toolbar: {
        flexWrap: 'wrap'
    },
    bold: {
        fontWeight: 'bold'
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        [theme.breakpoints.up('xs')]: {
            width: 300
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    mobile: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    }
}));

const Header = ({ showLinks, authenticated, links, logo, history }) => {
    const classes = useStyles(Theme);
    const filteredLinks = links.filter(({ auth }) =>
        authenticated ? auth : !auth
    );
    const [anchorEl, setAnchorEl] = React.useState(null);
    const currentPage = history.location.pathname;
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }
    return (
        <React.Fragment>
            <AppBar
                id="header-ui-lib"
                position="static"
                color="primary"
                elevation={0}
                className={`${classes.root} ${classes.appBar}`}
            >
                <Toolbar className={classes.toolbar} color="primary">
                    <Logo src={logo} />
                    <nav className={classes.nav}>
                        {showLinks
                            ? filteredLinks.map(({ name, link }) => {
                                return (
                                    <Link
                                        href={link}
                                        color="secondary"
                                        button={false}
                                        bold={currentPage.includes(link)}
                                        link={link}
                                        key={`${name} desktop`}
                                        name={name}
                                        className={classes.link}
                                    />
                                );
                            })
                            : null}
                    </nav>
                    {showLinks ? (
                        <React.Fragment>
                            <IconButton
                                aria-controls="simple-menu"
                                color="secondary"
                                aria-haspopup="true"
                                onClick={handleClick}
                                className={classes.mobile}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {filteredLinks.map(({ name, link }) => (
                                    <MenuItem
                                        onClick={handleClose}
                                        key={`${name} mobile`}
                                    >
                                        <Link
                                            color="primary"
                                            link={link}
                                            href={link}
                                            name={name}
                                            className={classes.link}
                                        />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </React.Fragment>
                    ) : null}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

Header.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    showLinks: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            auth: PropTypes.bool.isRequired,
            link: PropTypes.string.isRequired
        })
    ).isRequired,
    logo: PropTypes.string
};

Header.defaultProps = {
    logo: ''
};

export default Header;
