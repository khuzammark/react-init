import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Box } from '@material-ui/core';
import ReactPlayer from 'react-player';
import CTAButton from '../CTAButton';
import Theme from '../theme';

const useStyles = makeStyles(theme => ({
    container: {
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
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
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(16, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
    heroButtons: {
        marginTop: theme.spacing(0, 4, 4)
    },
    player: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0
    },
    image: {
        position: 'absolute',
        top: 0 /* vertical alignment */,
        bottom: 0,
        zIndex: 0,
        minWidth: '100%'
    },
    content: {
        zIndex: 2,
        position: 'relative',
        color: theme.palette.secondary.contrastText
    },
    subtext: {
        padding: theme.spacing(4, 2),
        fontSize: 20,
        maxWidth: theme.breakpoints.values.md
    },
    link: {
        margin: theme.spacing(0, 0, 2),
        height: 70,
        width: 200,
        fontFamily: 'CircularStd'
    }
}));

const wrapVideo = (components, media, classes) => {
    return (
        <ReactPlayer
            url={media}
            playing
            volume={0}
            muted
            loop
            width="100%"
            height="100%"
            controls={false}
            className={classes.player}
        />
    );
};

const Hero = ({ mainText, subText, action, media, video }) => {
    const classes = useStyles(Theme);
    const contents = (
        <div className={classes.content}>
            <Typography
                color="primary"
                component="h1"
                variant="h1"
                align="center"
                gutterbottom
            >
                {mainText.toUpperCase()}
            </Typography>
            <Typography
                variant="subtitle1"
                component="p"
                color="primary"
                align="center"
                className={classes.subtext}
                paragraph
            >
                {subText}
            </Typography>
            <div className={classes.heroButtons}>
                <Grid container spacing={1} justify="center">
                    <Grid item>
                        <CTAButton
                            link={action.link}
                            name={action.name}
                            color="secondary"
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
    return (
        <Box width={1} className={classes.container}>
            <div className={classes.heroContent}>
                {video ? (
                    wrapVideo(contents, media, classes)
                ) : (
                    <img
                        src={media}
                        alt="CIFL Hero"
                        className={classes.image}
                    />
                )}
                {contents}
            </div>
        </Box>
    );
};

Hero.propTypes = {
    mainText: PropTypes.string.isRequired,
    subText: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
    action: PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired,
    video: PropTypes.bool.isRequired
};

export default Hero;
