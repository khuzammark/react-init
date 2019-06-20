import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Card, CardContent, Avatar, Link } from '@material-ui/core';
import Theme from '../theme';

const useStyles = makeStyles(theme => ({
    avatar: {
        height: 100,
        width: 100,
        float: 'left',
        clear: 'both',
        display: 'inline-block',
        margin: theme.spacing(0, 2, 2, 0)
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: theme.spacing(2),
        maxWidth: theme.breakpoints.values.sm
    },
    header: {
        padding: theme.spacing(1, 0, 1, 1)
    },
    content: {
        padding: theme.spacing(1, 0, 1, 0)
    },
    author: {
        float: 'right'
    }
}));

const Testimonial = ({ quote, image, author, company, companyLink }) => {
    const classes = useStyles(Theme);
    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <Avatar
                    src={image}
                    className={classes.avatar}
                    alt={`${author} ${company}`}
                />
                <Typography gutterbottom="true">{quote}</Typography>
                <Typography
                    variant="caption"
                    inline="true"
                    aline="right"
                    className={classes.author}
                >
                    {`- ${author}, `}
                    <Link
                        color="default"
                        href={companyLink || '#'}
                        className={classes.link}
                    >
                        <em>{company}</em>
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

Testimonial.propTypes = {
    quote: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    companyLink: PropTypes.string.isRequired
};

export default Testimonial;
