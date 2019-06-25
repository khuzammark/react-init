import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Theme from '../theme';

const useStyles = makeStyles(() => ({
    link: {
        display: 'inline-block'
    }
}));

const LinkComponent = ({ name, link, color, button, bold }) => {
    const classes = useStyles();
    const CollisionLink = React.forwardRef((props, ref) => (
        <RouterLink innerRef={ref} to={link || '#'} {...props} />
    ));
    const {
        palette: {
            grey: { '100': hundred }
        }
    } = Theme;
    let linkColor;

    switch (color) {
    case 'primary':
        linkColor = 'primary';
        break;
    case 'secondary':
        linkColor = 'secondary';
        break;
    default:
        linkColor = hundred;
        break;
    }
    return button ? (
        <Button color={linkColor} component={CollisionLink}>
            <Typography
                component="p"
                variant="body1"
                style={{ fontWeight: bold ? 'bold' : 'normal' }}
            >
                {name}
            </Typography>
        </Button>
    ) : (
        <Link
            color={linkColor}
            component={CollisionLink}
            href={link}
            className={classes.link}
        >
            <Typography
                component="p"
                variant="body1"
                style={{ fontWeight: bold ? 'bold' : 'normal' }}
            >
                {name}
            </Typography>
        </Link>
    );
};

LinkComponent.propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    button: PropTypes.bool,
    bold: PropTypes.bool
};

LinkComponent.defaultProps = {
    button: true,
    bold: false
};

export default LinkComponent;
