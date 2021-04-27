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
import HolidayFeed from 'uk-bank-holidays';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  root: {
    textAlign: "center"
  }

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    border: "2px solid black"
  },
}))(TableRow);

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData('Date 1', "Cristmas"),
  createData('Date 2', "Eid"),
  createData('Date 3', "Holi"),

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
    width: "auto",
    height: '210px',
  }
});



export default function UpcomingHolidaysTable() {
  const classes = useStyles();
  const [holidays, setHolidays] = React.useState([])
  React.useEffect(() => {
   const ss = async () =>{
    let feed = new HolidayFeed();
    await feed.load();

    let endland = feed.divisions('england-and-wales');
    let pubH = endland.holidays(new Date())
    // .filter(h=>!h.title.includes('bank') && !h.title.includes('Bank'))
    .map(h => createData(h.date,h.title))
    setHolidays([...pubH])
   }
   ss()
  }, [])

  return (
    <>
      <Typography > My Upcoming Holidays</Typography>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead style={{ border: "2px solid black" }}>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell style={{ borderRight: "2px solid black" }} component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></>
  )
}
