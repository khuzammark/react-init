import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Toolbar } from '@material-ui/core';
import Link from '../Link';
import Theme from '../theme';

const useStyles = makeStyles(theme => ({
    footer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        padding: theme.spacing(4, 2),
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    copyright: {
        flexGrow: 1
    },
    linkWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down('xl')]: {
            width: 200
        },
        [theme.breakpoints.down('sm')]: {
            width: 150
        }
    },
    link: {
        color: theme.palette.secondary.main
    }
}));

const Footer = ({ links, authenticated }) => {
    const classes = useStyles(Theme);
    const filteredLinks = links.filter(({ auth }) =>
        authenticated ? auth : !auth
    );
    return (
        <Toolbar className={classes.footer}>
            <Typography className={classes.copyright}>
                © Coding Is For Losers
            </Typography>
            <div className={classes.linkWrapper}>
                {filteredLinks.map(({ link, name }) => (
                    <Link
                        link={link}
                        href={link}
                        key={name}
                        color="secondary"
                        name={name}
                        className={classes.link}
                    />
                ))}
            </div>
        </Toolbar>
    );
};

Footer.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            auth: PropTypes.bool.isRequired,
            link: PropTypes.string.isRequired
        })
    ).isRequired,
    authenticated: PropTypes.bool.isRequired
};

export default Footer;
