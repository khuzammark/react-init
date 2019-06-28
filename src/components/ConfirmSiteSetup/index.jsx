import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    type: {
        fontWeight: 'normal'
    }
}));
const ConfirmSiteSetup = ({ data }) => {
    const classes = useStyles();
    const { siteName, siteDomain, sources, targets } = data;
    return (
        <div className={classes.container}>
            <Typography
                component="h6"
                variant="h6"
                align="left"
                className={classes.type}
            >
                <b>Site Name: </b>
                {siteName}
            </Typography>
            <Typography
                component="h6"
                variant="h6"
                align="left"
                className={classes.type}
            >
                <b>Site Domain: </b>
                {siteDomain}
            </Typography>
            {sources.map(({ name, selection }) => {
                return (
                    <div>
                        <Typography
                            component="h6"
                            variant="h6"
                            align="left"
                            className={classes.type}
                            key={name}
                        >
                            <b>Source Name: </b>
                            {name}
                        </Typography>
                        {selection.map((source, i) => {
                            return (
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    align="left"
                                    className={classes.type}
                                    key={source}
                                >
                                    <b>{`Source ${i + 1}: `}</b>
                                    {source}
                                </Typography>
                            );
                        })}
                    </div>
                );
            })}
            {targets.map(({ name, selection }) => {
                return (
                    <div>
                        <Typography
                            component="h6"
                            variant="h6"
                            align="left"
                            className={classes.type}
                            key={name}
                        >
                            <b>Target Name: </b>
                            {name}
                        </Typography>
                        {selection.map((source, i) => {
                            return (
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    align="left"
                                    className={classes.type}
                                    key={source}
                                >
                                    <b>{`Target ${i + 1}: `}</b>
                                    {source}
                                </Typography>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

ConfirmSiteSetup.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            siteName: PropTypes.string.isRequired,
            siteDomain: PropTypes.string.isRequired,
            sources: PropTypes.array.isRequired,
            targets: PropTypes.array.isRequired
        })
    ).isRequired
};

export default ConfirmSiteSetup;
