import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import Theme from '../theme';

const useStyles = makeStyles(theme => ({
    link: {
        margin: theme.spacing(0, 0, 2),
        padding: theme.spacing(1, 1),
        height: 70,
        width: 200,
        fontFamily: 'CircularStd',
        alignSelf: 'center',
        [theme.breakpoints.down('md')]: {
            width: 180,
            height: 70,
            fontSize: 14
        }
    },
    mini: {
        width: 170,
        height: 60
    },
    textMini: {
        fontSize: 16
    }
}));

const MUIButton = ({ link, name, color, mini }) => {
    const classes = useStyles(Theme);
    const CollisionLink = React.forwardRef((props, ref) => (
        <RouterLink innerRef={ref} to={link || '#'} {...props} />
    ));
    let titleColor;
    let backgroundColor;
    const {
        palette: {
            grey: { '300': grey300, '600': grey600 }
        }
    } = Theme;
    switch (color) {
    case 'primary':
        titleColor = 'secondary';
        backgroundColor = 'primary';
        break;
    case 'secondary':
        titleColor = 'primary';
        backgroundColor = 'secondary';
        break;
    default:
        titleColor = grey600;
        backgroundColor = grey300;
        break;
    }

    return (
        <Button
            variant="contained"
            size={mini ? 'small' : 'large'}
            color={backgroundColor}
            component={CollisionLink}
            className={`${classes.link} ${mini ? classes.mini : null}`}
        >
            <Typography
                component="h6"
                variant="h6"
                color={titleColor}
                noWrap
                classes
                align="center"
                gutterBottom="true"
                className={mini ? classes.textMini : classes.textLarge}
            >
                {name}
            </Typography>
        </Button>
    );
};

MUIButton.propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    mini: PropTypes.bool
};

MUIButton.defaultProps = {
    mini: null
};

export default MUIButton;
