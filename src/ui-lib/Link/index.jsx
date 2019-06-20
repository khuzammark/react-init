import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Theme from '../theme';

const LinkComponent = ({ name, link, color }) => {
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
    return (
        <Button color={linkColor} component={CollisionLink}>
            <Typography component="p" variant="body1">
                {name}
            </Typography>
        </Button>
    );
};

LinkComponent.propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default LinkComponent;
