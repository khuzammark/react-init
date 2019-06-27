import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    FormControl,
    InputLabel,
    Select,
    Input,
    MenuItem
} from '@material-ui/core';
import Theme from '../theme';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    formControl: {
        margin: theme.spacing(3, 3, 3, 0),
        minWidth: 300
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'normal',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center'
        }
    },
    formContainer: {
        [theme.breakpoints.down('sm')]: {
            width: 'fit-content',
            margin: '0 auto'
        }
    }
}));

const DropDown = ({ sets, handleSelect, row, single }) => {
    const classes = useStyles(Theme);
    return (
        <div className={`${classes.container} ${row ? classes.row : ''}`}>
            {sets.map(({ name, data, selection }) => {
                return (
                    <div className={classes.formContainer}>
                        <FormControl
                            className={classes.formControl}
                            fullWidth={!row}
                        >
                            <InputLabel htmlFor="select-multiple-chip">
                                {name}
                            </InputLabel>
                            <Select
                                multiple={!single}
                                value={selection}
                                name={name}
                                onChange={handleSelect}
                                input={<Input id="select-multiple-chip" />}
                            >
                                {data.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                );
            })}
        </div>
    );
};

DropDown.propTypes = {
    sets: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelect: PropTypes.func.isRequired,
    row: PropTypes.bool,
    single: PropTypes.bool
};

DropDown.defaultProps = {
    row: false,
    single: false
};

export default DropDown;
