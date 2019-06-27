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
    Link,
    Drawer,
    IconButton
} from '@material-ui/core';
import KeyBoardRightIcon from '@material-ui/icons/KeyboardArrowRightSharp';
import Theme from '../theme';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(2, 0)
    },
    rootFix: {
        alignItems: 'normal'
    },
    connector: {
        height: '100%'
    },
    connectorRoot: {
        width: 'fit-content',
        alignSelf: 'center',
        padding: 0
    },
    line: {
        minHeight: 50
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
    content: {
        padding: theme.spacing(2, 1)
    },
    fname: {
        fontWeight: 800,
        fontSize: '.75rem',
        marginBottom: 0
    },
    cardDetail: {
        margin: theme.spacing(0.5, 0)
    }
}));

const StepCard = ({ label, links, detail, hideLabels }) => {
    const classes = useStyles(Theme);
    return (
        <Card className={`${classes.card} ${detail ? classes.cardDetail : ''}`}>
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
                    ? links.map(({ link, fieldName, value }) => {
                        return link ? (
                            <div>
                                {hideLabels ? null : (
                                    <Typography
                                        component="p"
                                        className={classes.fname}
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        {fieldName}
                                    </Typography>
                                )}
                                <Link
                                    key={`${fieldName} Link`}
                                    color="inherit"
                                    className={classes.link}
                                    href={link || '#'}
                                >
                                    <Typography
                                        component="p"
                                        className={classes.linkName}
                                        color="textSecondary"
                                        align="left"
                                        gutterBottom
                                    >
                                        {link}
                                    </Typography>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                {hideLabels ? null : (
                                    <Typography
                                        component="p"
                                        className={classes.fname}
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        {`${fieldName}`}
                                    </Typography>
                                )}
                                <Typography
                                    component="p"
                                    className={classes.linkName}
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    {value}
                                </Typography>
                            </div>
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
            link: PropTypes.string,
            fieldName: PropTypes.string.isRequired,
            value: PropTypes.string
        })
    ).isRequired,
    detail: PropTypes.bool.isRequired,
    hideLabels: PropTypes.bool.isRequired
};

const StepperComponent = ({ activeStep, steps, detail, hideLabels }) => {
    const classes = useStyles(Theme);
    const connector = (
        <StepConnector
            classes={{
                root: classes.connectorRoot,
                lineVertical: classes.connector,
                line: classes.line
            }}
        />
    );

    return detail ? (
        <div className={`${classes.root} ${classes.rootFix}`}>
            {steps.map(step => {
                return (
                    <StepCard
                        {...{ ...step, done: false, detail, hideLabels }}
                    />
                );
            })}
        </div>
    ) : (
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
                                {...{
                                    ...step,
                                    done: activeStep - 1 > index,
                                    detail,
                                    hideLabels
                                }}
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
    steps: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    detail: PropTypes.bool,
    hideLabels: PropTypes.bool
};

StepperComponent.defaultProps = {
    detail: false,
    hideLabels: false
};

const useDrawerStyles = makeStyles(theme => ({
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    },
    stepperMobileButton: {
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    stepperDesktop: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    }
}));

const TemporaryDrawer = ({ activeStep, steps, detail, hideLabels, drawer }) => {
    const classes = useDrawerStyles(Theme);
    const [state, setState] = React.useState(false);

    const toggleDrawer = e => {
        e.preventDefault();
        setState(!state);
    };

    return drawer ? (
        <div>
            <Drawer
                open={state}
                onClose={toggleDrawer}
                className={classes.stepperMobile}
            >
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleDrawer();
                    }}
                    onKeyDown={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleDrawer();
                    }}
                >
                    <StepperComponent
                        {...{ activeStep, steps, detail, hideLabels }}
                    />
                </div>
            </Drawer>
            <div className={classes.stepperMobileButton}>
                <IconButton
                    aria-controls="simple-menu"
                    color="primary"
                    aria-haspopup="true"
                    onClick={toggleDrawer}
                    className={classes.mobile}
                >
                    <KeyBoardRightIcon />
                </IconButton>
            </div>
            <div className={classes.stepperDesktop}>
                <StepperComponent
                    {...{ activeStep, steps, detail, hideLabels }}
                />
            </div>
        </div>
    ) : (
        <StepperComponent {...{ activeStep, steps, detail, hideLabels }} />
    );
};

TemporaryDrawer.propTypes = {
    activeStep: PropTypes.number.isRequired,
    steps: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    detail: PropTypes.bool,
    drawer: PropTypes.bool,
    hideLabels: PropTypes.bool
};

TemporaryDrawer.defaultProps = {
    detail: false,
    drawer: false,
    hideLabels: false
};

export default TemporaryDrawer;
