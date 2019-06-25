import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Typography,
    Card,
    CardHeader,
    CardActions,
    CardContent
} from '@material-ui/core';
import CTAButton from '../CTAButton';
import Theme from '../theme';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 350,
        padding: theme.spacing(0),
        margin: theme.spacing(2)
    },
    actions: {
        justifyContent: 'space-evenly',
        padding: theme.spacing(2)
    },
    header: {
        padding: theme.spacing(2, 2, 0)
    },
    content: {
        padding: theme.spacing(2)
    },
    button: {
        textAlign: 'center',
        width: 180,
        height: 60
    }
}));

const RecipeIndex = ({ title, price, authenticated, links, description }) => {
    const classes = useStyles(Theme);
    const filteredLinks = links.filter(({ auth }) =>
        authenticated ? auth : !auth
    );
    return (
        <Card className={classes.card}>
            <CardHeader
                title={title}
                subheader={`$${price}`}
                className={classes.header}
            />
            <CardContent className={classes.content}>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                {filteredLinks.map(({ name, link }, index) => (
                    <CTAButton
                        name={name}
                        key={`${name} RI`}
                        link={link}
                        color={index ? 'primary' : 'grey'}
                        mini
                    />
                ))}
            </CardActions>
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
    ).isRequired
};

export default RecipeIndex;
