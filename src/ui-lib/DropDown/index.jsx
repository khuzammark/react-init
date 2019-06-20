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
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        maxWidth: theme.breakpoints.values.sm
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    }
}));

const DropDown = ({ sets, handleSelect }) => {
    const classes = useStyles(Theme);
    return (
        <div className={classes.container}>
            {sets.map(({ name, data, selection }) => {
                return (
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-chip">{name}</InputLabel>
                        <Select
                            multiple
                            value={selection}
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
                );
            })}
        </div>
    );
};

DropDown.propTypes = {
    sets: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelect: PropTypes.func.isRequired
};

export default DropDown;