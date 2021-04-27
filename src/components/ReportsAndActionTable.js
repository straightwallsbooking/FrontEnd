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
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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
  }
});


function createData(icon, action) {
  return { icon, action };
}

export default function ReportsAndActionTable(props) {
  const classes = useStyles();
  const { vacationBalance, casualBalance, sickBalance } = props.myTimeOffDetails
  const rows = [
    createData(<EventAvailableIcon />, `Available Time Off Balance: ${vacationBalance} Days Vacation Time & ${casualBalance + sickBalance} Days other`),
    createData(<VisibilityIcon />, <Link to='/outstandingrequests'>{"View My Outstanding Time Off Requests"}</Link>),
    createData(<AddCircleOutlineIcon />, <Link to='/requesttimeoff'>{"Request Time off"}</Link>),
  ];
  return (<>
    <Typography > Reports And Actions</Typography>
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell style={{ borderRight: "2px solid black", textAlign: "center" }} component="th" scope="row">
                {row.icon}
              </StyledTableCell>
              <StyledTableCell align="right">{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>)
}
