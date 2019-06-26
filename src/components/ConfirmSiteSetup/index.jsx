import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    }
}));
const ConfirmSiteSetup = ({ data }) => {
    const classes = useStyles();
    const { siteName, siteDomain, sources, targets } = data;
    return (
        <div className={classes.container}>
            <Typography component="h6" variant="h6" align="center">
                {`Site Name: ${siteName}`}
            </Typography>
            <Typography component="h6" variant="h6" align="center">
                {`Site Domain: ${siteDomain}`}
            </Typography>
            {sources.map(({ name, selection }) => {
                return (
                    <div>
                        <Typography
                            component="h6"
                            variant="h6"
                            align="center"
                            key={name}
                        >
                            {`Source Name: ${name}`}
                        </Typography>
                        {selection.map((source, i) => {
                            return (
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    align="center"
                                    key={source}
                                >
                                    {`Source ${i + 1}: ${source}`}
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
                            align="center"
                            key={name}
                        >
                            {`Target Name: ${name}`}
                        </Typography>
                        {selection.map((source, i) => {
                            return (
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    align="center"
                                    key={source}
                                >
                                    {`Target ${i + 1}: ${source}`}
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
