import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    textAlign: "center"
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(link) {
  return { link };
}

const rows = [
  createData(<Link to='/manageractions/processrequests'>Process Employee Time Off Requests</Link>),
  createData('View All Time Off Requests with Employee Filter'),
  createData('View All Employees Time Off Status On A Selected Date')
];

const useStyles = makeStyles({
  table: {
  },
  tableLabel: {
    textAlign: 'left'
  },
  tableContainer: {
    border: "1px black solid",
    padding: "14px",
    width: "auto"
  },
  totalLeavesRow: {

  }
});


export default function ManagerReportsAndActions() {
  const classes = useStyles();

  return (
    <>
      <Typography>{"Manager Reports & Actions"}</Typography>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableBody style={{ border: "2px solid black" }}>
            {rows.map((row) => (
              <StyledTableRow key={row.link}>
                <StyledTableCell style={{ borderBottom: "2px solid black" }} component="th" scope="row">
                  {row.link}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> </>
  )
}
