import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Typography,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Collapse,
    IconButton
} from '@material-ui/core';
import clsx from 'clsx';
import { ExpandMore } from '@material-ui/icons';
import ReactPlayer from 'react-player';
import CTAButton from '../CTAButton';
import Theme from '../theme';

const useStyles = makeStyles(theme => ({
    card: {
        padding: theme.spacing(8, 4),
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(4, 2)
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2, 1)
        }
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap-reverse'
        }
    },
    actions: {
        padding: theme.spacing(5, 2),
        justifyContent: 'space-evenly',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        padding: theme.spacing(2, 1, 0, 2)
    },
    content: {
        padding: theme.spacing(2, 1, 0, 2)
    },
    button: {
        textAlign: 'center',
        margin: theme.spacing(0, 1, 0, 0)
    },
    container: {
        minWidth: 300,
        [theme.breakpoints.down('lg')]: {
            minWidth: 150
        }
    },
    player: {
        alignSelf: 'center',
        outline: 'none',
        padding: theme.spacing(1, 1, 0, 1),
        margin: 0,
        maxWidth: theme.breakpoints.values.sm
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    grey: {
        color: theme.palette.grey[300],
        backgroundColor: theme.palette.grey[600],
        height: 60,
        width: 180
    }
}));

const RecipeIndex = ({
    title,
    price,
    authenticated,
    links,
    description,
    details,
    video
}) => {
    const classes = useStyles(Theme);
    const filteredLinks = links.filter(({ auth }) =>
        authenticated ? auth : !auth
    );
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }
    return (
        <Card className={classes.card}>
            <div className={classes.wrapper}>
                <div className={classes.container}>
                    <CardHeader
                        title={
                            <Typography variant="h2" component="h2">
                                {title}
                            </Typography>
                        }
                        subheader={`$${price}`}
                        className={classes.header}
                    />

                    <CardContent className={classes.content}>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        {filteredLinks.map(({ name, link }, index) => (
                            <CTAButton
                                name={name}
                                link={link}
                                mini
                                color={index ? 'primary' : null}
                                className={!index ? classes.grey : null}
                            />
                        ))}
                        {details ? (
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="Show more"
                            >
                                <ExpandMore />
                            </IconButton>
                        ) : null}
                    </CardActions>
                </div>
                <ReactPlayer
                    url={video}
                    playing={false}
                    volume={1}
                    width="100%"
                    height="100%"
                    controls
                    className={classes.player}
                />
            </div>
            {details ? (
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>{details}</Typography>
                    </CardContent>
                </Collapse>
            ) : null}
        </Card>
    );
};

RecipeIndex.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    authenticated: PropTypes.bool.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            auth: PropTypes.bool.isRequired,
            link: PropTypes.string.isRequired
        })
    ).isRequired,
    details: PropTypes.string,
    video: PropTypes.bool
};

RecipeIndex.defaultProps = {
    details: '',
    video: false
};

export default RecipeIndex;
