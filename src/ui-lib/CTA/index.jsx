import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Box } from '@material-ui/core';
import CTAButton from '../CTAButton';
import Theme from '../theme';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        backgroundColor: theme.palette.secondary.light,
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(4, 1),
        [theme.breakpoints.down('xl')]: {
            margin: theme.spacing(0, 0, 0, -4)
        },
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(0, 0, 0, -3)
        },
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(0, 0, 0, -2)
        }
    },
    left: {
        maxWidth: theme.breakpoints.values.sm,
        padding: theme.spacing(4, 2),
        textAlign: 'left'
    },
    right: {
        maxWidth: theme.breakpoints.values.sm,
        padding: theme.spacing(0, 2, 4),
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        padding: theme.spacing(0, 0, 2)
    },
    subtext: {
        fontSize: 20
    }
}));

const CTA = ({ mainText, subText, action: { name, link } }) => {
    const classes = useStyles(Theme);
    return (
        <Box width={1} className={classes.container}>
            <div className={classes.left}>
                <Typography
                    color="primary"
                    component="h2"
                    variant="h2"
                    align="left"
                    gutterbottom="true"
                    className={classes.header}
                >
                    {mainText.toUpperCase()}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="primary"
                    align="left"
                    className={classes.subtext}
                    paragraph
                >
                    {subText}
                </Typography>
            </div>
            <div className={classes.right}>
                <CTAButton link={link} name={name} color="primary" />
            </div>
        </Box>
    );
};

CTA.propTypes = {
    mainText: PropTypes.string.isRequired,
    subText: PropTypes.string.isRequired,
    action: PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired
};

export default CTA;
