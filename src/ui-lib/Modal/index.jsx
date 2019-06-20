import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/styles';
import Theme from '../theme';

const useStyles = makeStyles(() => ({
    root: {
        justifyContent: 'center'
    }
}));

const Modal = ({ message, confirmFunction, open }) => {
    const classes = useStyles(Theme);
    const handleClose = bool => {
        confirmFunction(bool);
    };
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={() => {
                    handleClose(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    disableSpacing="true"
                    classes={{ root: classes.root }}
                >
                    <Button
                        onClick={() => {
                            handleClose(true);
                        }}
                        variant="contained"
                        color="primary"
                        autoFocus
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    confirmFunction: PropTypes.func.isRequired
};

export default Modal;
