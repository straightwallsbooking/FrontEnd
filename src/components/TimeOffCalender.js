import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const daysofWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const today = moment()
export class TimeOffCalender extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: today
        }
    }
    getType = (date) =>{
        let background = "white"
        const {myTimeOffRequests} = this.props
        if(myTimeOffRequests){

        }
        return background
    }
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    render() {
        const {myTimeOffRequests} = this.props 
        let start = 0;
        return (
            <div>
                <FormControl >
                    <InputLabel htmlFor="age-native-simple">Month</InputLabel>
                    <Select
                        native
                        onChange={(e) => { this.setState({ current: moment(`2021-${parseInt(e.target.value) + 1}-01`) }) }}
                        inputProps={{
                            name: 'age',
                            id: 'age-native-simple',
                        }}
                        value={this.state.current.month()}
                    >
                        {this.months.map((e, i) => {
                            return <option value={i}>{e}</option>

                        })}
                    </Select>
                </FormControl>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead >
                            <TableRow>
                                {daysofWeek.map(day =>
                                    <TableCell align="center">{day}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[1, 2, 3, 4, 5].map((v, i) => {

                                return <TableRow>
                                    {[1, 2, 3, 4, 5, 6, 7].map((vv, ii) => {
                                        if (!start && moment(`2021-${this.state.current.month() + 1}-01`).day() == ii) {
                                            start += 1
                                            return <TableCell>{start}</TableCell>
                                        }
                                        else if (start && !(i == 4 && ii > moment(`2021-${this.state.current.month() + 1}-${moment(`2021-${this.state.current.month() + 1}-01`).daysInMonth()}`).day())) {
                                            start += 1
                                            return <TableCell>{start}</TableCell>
                                        }
                                        else {
                                            return <TableCell></TableCell>
                                        }
                                    })}
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default TimeOffCalender
