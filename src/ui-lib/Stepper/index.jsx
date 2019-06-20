import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Typography,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    Card,
    CardHeader,
    Link
} from '@material-ui/core';
import Theme from '../theme';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    connector: {
        height: '100%'
    },
    connectorRoot: {
        width: 'fit-content',
        alignSelf: 'center',
        margin: theme.spacing(2, 0),
        minHeight: 30
    },
    card: {},
    stepLabel: {
        alignItems: 'flex-start'
    },
    stepIcon: {
        margin: theme.spacing(1, 0, 0, 1)
    },
    header: {
        padding: theme.spacing(1, 2, 0),
        borderBottom: `1px solid ${theme.palette.grey[500]}`
    },
    title: {
        fontWeight: 'bold'
    },
    link: {
        display: 'flex',
        flexDirection: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    linkName: {
        padding: theme.spacing(1)
    },
    content: {
        padding: theme.spacing(2)
    }
}));

const StepCard = ({ label, links }) => {
    const classes = useStyles(Theme);
    return (
        <Card className={classes.card}>
            <CardHeader
                title={
                    <Typography
                        component="p"
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                    >
                        {label}
                    </Typography>
                }
                className={classes.header}
            />
            <div className={classes.content}>
                {links
                    ? links.map(({ link, linkName, Icon }) => {
                        return (
                            <Link
                                key={`${linkName} Link`}
                                color="inherit"
                                className={classes.link}
                                href={link || '#'}
                            >
                                <Icon />{' '}
                                <Typography
                                    component="p"
                                    className={classes.linkName}
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    {linkName}
                                </Typography>
                            </Link>
                        );
                    })
                    : null}
            </div>
        </Card>
    );
};

StepCard.propTypes = {
    label: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string.isRequired,
            linkName: PropTypes.string.isRequired,
            Icon: React.propTypes.node.isRequired
        })
    ).isRequired
};

const StepperComponent = ({ activeStep, steps }) => {
    const classes = useStyles(Theme);
    const connector = (
        <StepConnector
            classes={{
                root: classes.connectorRoot,
                line: classes.connector,
                lineVertical: classes.connector
            }}
        />
    );

    return (
        <div className={classes.root}>
            <Stepper
                activeStep={activeStep}
                orientation="vertical"
                className={classes.stepper}
                connector={connector}
            >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            className={classes.stepLabel}
                            StepIconProps={{
                                classes: { root: classes.stepIcon }
                            }}
                        >
                            <StepCard
                                {...{ ...step, done: activeStep - 1 > index }}
                            />
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

StepperComponent.propTypes = {
    activeStep: PropTypes.number.isRequired,
    steps: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default StepperComponent;
