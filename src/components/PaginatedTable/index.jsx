import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { format } from 'date-fns';
import { TableBody, IconButton, Menu, MenuItem } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from '../../ui-lib/Link';

const headRows = [
    {
        id: 'recipe',
        label: 'Recipe'
    },
    { id: 'site', label: 'Site' },
    {
        id: 'updated',
        label: 'Last Updated'
    },
    { id: 'status', label: 'Status' }
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        return onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align="left"
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell key="actions" align="center">
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85)
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark
            },
    spacer: {
        flex: '1 1 100%'
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: '0 0 auto'
    }
}));

const EnhancedTableToolbar = () => {
    const classes = useToolbarStyles();

    return (
        <Toolbar className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                    My Sites
                </Typography>
            </div>
            <div className={classes.spacer} />
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    mobile: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
}));

const EnhancedTable = ({
    sites,
    sortAlphabetically,
    sortDate,
    sortStatus,
    history
}) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('recipe');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
        if (property === 'recipe' || property === 'site') {
            sortAlphabetically(sites, property, !isDesc);
        } else if (property === 'updated') {
            sortDate(sites, !isDesc);
        } else if (property === 'status') {
            sortStatus(sites, !isDesc);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
    };

    const mapStatus = code => {
        switch (code) {
        case 1:
            return 'Active';
        case 2:
            return 'Paused';
        default:
            return 'Error';
        }
    };

    function handleClick(event) {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    }

    function handleClose(e) {
        e.stopPropagation();
        e.preventDefault();
        setAnchorEl(null);
    }

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, sites.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {sites
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <Fragment>
                                            <TableRow
                                                hover
                                                key={row.site}
                                                onClick={() => {
                                                    history.push(
                                                        `/recipes/detail/${row.recipeId}`
                                                    );
                                                }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                >
                                                    {row.recipe}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.site}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {format(
                                                        row.updated,
                                                        'MM/DD/YYYY'
                                                    )}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {mapStatus(row.status)}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        aria-controls="simple-menu"
                                                        color="primary"
                                                        aria-haspopup="true"
                                                        onClick={handleClick}
                                                        className={
                                                            classes.mobile
                                                        }
                                                    >
                                                        <MoreIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleClose}
                                                    >
                                                        {[
                                                            {
                                                                name: 'Pause',
                                                                link: '#'
                                                            },
                                                            {
                                                                name: 'Delete',
                                                                link: '#'
                                                            },
                                                            {
                                                                name:
                                                                    'BigQuery',
                                                                link: '#'
                                                            },
                                                            {
                                                                name: 'Add',
                                                                link: '#'
                                                            }
                                                        ].map(
                                                            ({
                                                                name,
                                                                link
                                                            }) => (
                                                                <MenuItem
                                                                    onClick={
                                                                        handleClose
                                                                    }
                                                                    key={`${name} mobile`}
                                                                >
                                                                    <Link
                                                                        color="primary"
                                                                        link={
                                                                            link
                                                                        }
                                                                        href={
                                                                            link
                                                                        }
                                                                        name={
                                                                            name
                                                                        }
                                                                        className={
                                                                            classes.link
                                                                        }
                                                                    />
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </Menu>
                                                </TableCell>
                                            </TableRow>
                                        </Fragment>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sites.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

EnhancedTable.propTypes = {
    sites: PropTypes.arrayOf(
        PropTypes.shape({
            site: PropTypes.string.isRequired,
            recipe: PropTypes.string.isRequired,
            status: PropTypes.number.isRequired,
            updated: PropTypes.instanceOf(Date).isRequired
        }).isRequired
    ).isRequired,
    sortAlphabetically: PropTypes.func.isRequired,
    sortDate: PropTypes.func.isRequired,
    sortStatus: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired
};

export default EnhancedTable;
