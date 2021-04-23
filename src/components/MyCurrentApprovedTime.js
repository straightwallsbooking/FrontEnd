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


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize:14
    },
    root:{
      textAlign:"center"
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      border: "2px solid black"
    },
  }))(TableRow);
  
  
  
  
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
    totalLeavesRow:{
      
    }
  });
  
  
  
  function createData(startDate,endDate,type,totalDays) {
    return { startDate,endDate,type,totalDays};
  }
export default function MyCurrentApprovedTimeTable(props) {
    const classes = useStyles();
    const approvedReqs = props.myTimeOffRequests.filter((req) => req.status_id === 6)
    const rows = approvedReqs.map(req=>createData(req.startDate,req.endDate,req.leave?.type,req.totalDays))
    return (
      <>
      <Typography >My Current Approved Time Off Requests</Typography>
        <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead style={{border:"2px solid black"}}>
          <TableRow>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell align="right">End Date</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Total Days</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.startDate}>
              <StyledTableCell style={{borderRight:"2px solid black"}} component="th" scope="row">
                {row.startDate}
              </StyledTableCell>
              <StyledTableCell style={{borderRight:"2px solid black"}} align="right">{row.endDate}</StyledTableCell>
              <StyledTableCell style={{borderRight:"2px solid black"}} align="right">{row.type}</StyledTableCell>
              <StyledTableCell align="right">{row.totalDays}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Typography className={classes.totalLeavesRow}>{rows.length ? "Total: 12" : "No requests found" }</Typography>
    </TableContainer> </>
    )
}
