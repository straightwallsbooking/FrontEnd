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
import HolidayFeed from 'uk-bank-holidays';

const daysofWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const today = moment()
export class TimeOffCalender extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: today,
            myHolidays: []
        }
    }
    componentDidMount = async () => {
        let feed = new HolidayFeed();
        await feed.load();

        let endland = feed.divisions('england-and-wales');
        let pubH = endland.holidays().map(h => ({ date: h.date, name: h.title }))
        this.setState({ ...this.state, myHolidays: [...pubH] })

    }
    setMyRequests = () => {
        
        let myH = []
        if (this.props.myTimeOffRequests && this.props.myTimeOffRequests.length) {
            myH = [...this.props.myTimeOffRequests.filter(r=>r.status_id==6).map(r => {
                
                const h = []
                let tt = moment(r.startDate)
                let ee = moment(r.endDate).add(1, 'day')
                do {
                    h.push({ name: `${r.leave?.type} leave`, date: tt.format('YYYY-MM-DD') })
                    tt.add(1, 'day')
                } while (tt < ee)
                return h
            }).flat()]
        }
        return myH

    }
    getType = (date, dontCheck) => {
        let background = 'white'
        let title = null
        let isHoliday = false
        if ([...this.state.myHolidays, ...this.setMyRequests()].length && !dontCheck) {
            if ([0, 6].includes(moment(date).day())) {

                isHoliday = true
                background = '#8bed4f'
            }
            else{
                [...this.state.myHolidays, ...this.setMyRequests()].some(h => {
                    if (moment(h.date).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD')) {
                        // if(moment(date).format('YYYY-MM-DD')=='2021-04-19') 
                        isHoliday = true
                        title = h.name
                        background = '#0078d4'
                        return true
                    }
                    return false
                })

            }
        }
        return { background, title, isHoliday }
    }
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    render() {
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
                            {[1, 2, 3, 4, 5,6].map((v, i) => {

                                return <TableRow>
                                    {[1, 2, 3, 4, 5, 6, 7].map((vv, ii) => {

                                        if (!start && moment(`2021-${this.state.current.month() + 1}-01`).day() == ii) {
                                            start += 1
                                            const isHoliday = this.getType(`2021-${this.state.current.month() + 1 < 10 ? `0${this.state.current.month() + 1}` : this.state.current.month() + 1}-${start < 10 ? `0${start}` : start}`, start == 0)
                                            return <TableCell style={{ background: isHoliday.background, textAlign: "center" }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    {start}
                                                    {isHoliday.isHoliday ? <p style={{
                                                        marginBottom: 0,
                                                        fontVariant: "all-petite-caps",
                                                        fontSize: '6px',
                                                        fontWeight: '800'
                                                    }}>{isHoliday.title}</p> : null}
                                                </div>
                                            </TableCell>
                                        }
                                        else if (start && start<moment(`2021-${this.state.current.month() + 1}-01`).daysInMonth()) {
                                            start += 1
                                            const isHoliday = this.getType(`2021-${this.state.current.month() + 1 < 10 ? `0${this.state.current.month() + 1}` : this.state.current.month() + 1}-${start < 10 ? `0${start}` : start}`, start == 0)
                                            return <TableCell style={{ background: isHoliday.background, textAlign: "center" }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    {start}
                                                    {isHoliday.isHoliday ? <p style={{
                                                        marginBottom: 0,
                                                        fontVariant: "all-petite-caps",
                                                        fontSize: '6px',
                                                        fontWeight: '800'
                                                    }}>{isHoliday.title}</p> : null}
                                                </div>
                                            </TableCell>
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
