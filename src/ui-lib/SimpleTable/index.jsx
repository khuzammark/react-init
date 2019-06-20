import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@material-ui/core/';
import Theme from '../theme';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        maxWidth: theme.breakpoints.values.sm
    },
    cellLink: {
        textDecoration: 'none'
    }
}));

const SimpleTable = ({ header, rows }) => {
    const classes = useStyles(Theme);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {header.map(headerName => {
                            return (
                                <TableCell align="left">{headerName}</TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name} hover="true">
                            <TableCell
                                component="a"
                                scope="row"
                                href={row.link || '#'}
                                className={classes.cellLink}
                            >
                                {row.name}
                            </TableCell>
                            <TableCell
                                align="left"
                                component="a"
                                href={row.link || '#'}
                                className={classes.cellLink}
                            >
                                {row.linkName}
                            </TableCell>
                            <TableCell align="left">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={e => {
                                        e.preventDefault();
                                        row.action();
                                    }}
                                    className={classes.link}
                                >
                                    {row.actionName}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

SimpleTable.propTypes = {
    header: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default SimpleTable;
