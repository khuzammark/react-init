import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { format, compareDesc } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const InvoiceTable = ({ invoices }) => {
  const classes = useStyles();
  const getStatus = status => (status ? "Paid" : "Error");
  const sorted = invoices.sort((a, b) => compareDesc(a.date, b.date));
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="left">Plan</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Amount</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map(invoice => (
            <TableRow key={invoice.date}>
              <TableCell component="th" scope="row">
                {format(invoice.date, "MM/DD/YYYY")}
              </TableCell>
              <TableCell align="left">{invoice.name}</TableCell>
              <TableCell align="left">{invoice.quantity}</TableCell>
              <TableCell align="left">{invoice.amount}</TableCell>
              <TableCell align="left">{getStatus(invoice.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

InvoiceTable.propTypes = {
  invoices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      plan: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      status: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired
};

export default InvoiceTable;
