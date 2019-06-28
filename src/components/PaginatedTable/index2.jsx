import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { format } from 'date-fns';
import {
    TableBody,
    IconButton,
    Menu,
    MenuItem,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from '../../ui-lib/Link';
import Theme from '../../ui-lib/theme';
import './styles.scss';

const MenuComponent = ({ handleClose, handleClick, classes, anchorEl }) => {
    return (
        <Fragment>
            <IconButton
                aria-controls="simple-menu"
                color="primary"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.mobile}
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
                        name: 'BigQuery',
                        link: '#'
                    },
                    {
                        name: 'Add',
                        link: '#'
                    }
                ].map(({ name, link }) => (
                    <MenuItem onClick={handleClose} key={`${name} mobile`}>
                        <Link
                            color="primary"
                            link={link}
                            href={link}
                            name={name}
                            className={classes.link}
                        />
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
};

MenuComponent.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    anchorEl: PropTypes.node.isRequired
};

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
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions' }
];

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: theme.spacing(1, 8, 4)
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750,
        borderCollapse: 'separate'
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    mobile: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    tBody: {
        borderCollapse: 'collapse'
    },
    tRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: theme.spacing(1, 8, 4),
        alignItems: 'center'
    },
    toolRoot: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(1)
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: '0 0 auto'
    },
    rname: {
        fontWeight: 800,
        fontSize: '.75rem',
        marginBottom: 0
    },
    sname: {
        fontWeight: 800,
        fontSize: '125%',
        marginBottom: 0
    }
}));

const EnhancedTable = ({
    sites,
    sortAlphabetically,
    sortDate,
    sortStatus,
    history
}) => {
    const classes = useStyles(Theme);
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

    const createSortHandler = property => event => {
        return handleRequestSort(event, property);
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
                <Toolbar className={classes.toolRoot}>
                    <Typography variant="h6" id="tableTitle">
                        My Sites
                    </Typography>
                </Toolbar>
                <div className={classes.tableWrapper}>
                    <Table aria-labelledby="tableTitle" size="medium" id="tbl">
                        <TableHead>
                            <div className={classes.header}>
                                {headRows.map(row => (
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                ))}
                            </div>
                        </TableHead>
                        <TableBody id="t-body">
                            {sites
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map(row => {
                                    return (
                                        <TableRow
                                            hover
                                            key={row.site}
                                            onClick={() => {
                                                history.push(
                                                    `/recipes/detail/${row.recipeId}`
                                                );
                                            }}
                                        >
                                            <div className={classes.tRow}>
                                                <div className="t-cell">
                                                    <Typography
                                                        component="p"
                                                        className={
                                                            classes.rname
                                                        }
                                                        color="textSecondary"
                                                        gutterBottom
                                                    >
                                                        {row.recipe}
                                                    </Typography>
                                                </div>
                                                <div className="t-cell">
                                                    <Typography
                                                        component="p"
                                                        className={
                                                            classes.sname
                                                        }
                                                        color="textSecondary"
                                                        gutterBottom
                                                    >
                                                        {row.site}
                                                    </Typography>
                                                </div>
                                                <div className="t-cell">
                                                    {format(
                                                        row.updated,
                                                        'MM/DD/YYYY'
                                                    )}
                                                </div>
                                                <div className="t-cell status">
                                                    {mapStatus(row.status)}
                                                </div>
                                                <div className="t-cell action">
                                                    <MenuComponent
                                                        handleClose={
                                                            handleClose
                                                        }
                                                        handleClick={
                                                            handleClick
                                                        }
                                                        classes={classes}
                                                        anchorEl={anchorEl}
                                                    />
                                                </div>
                                            </div>
                                        </TableRow>
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
