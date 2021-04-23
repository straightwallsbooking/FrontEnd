import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import BalanceAsOfDate from '../components/BalanceAsOfDate'
import TimeOffCalender from '../components/TimeOffCalender'
import { makeGetRequest, makePOSTRequest } from '../utils/request'

export class RequestTimeOff extends Component {
    constructor(props) {
        super(props)

        this.state = {
            myTimeOffDetails: null,
            myTimeOffRequests: null,
            requestDone: { error: null, done: null }
        }
    }
    componentDidMount = async () => {
        this.getMyTimeOffDetails()
        this.getMyTimeOffRequests()
    }
    getMyTimeOffDetails = async () => {
        const res = await makeGetRequest("", "/timeoff/mytimeoffdetails")
        if (res.status != 200) {
            // handle later
        } else {
            this.setState({ ...this.state, myTimeOffDetails: res.data.data })
        }
    }
    setMyTimeOffDetails = (myTimeOffDetails) => {

        this.setState({ ...this.state, myTimeOffDetails })
    }
    getMyTimeOffRequests = async () => {

        const res = await makeGetRequest("", "/timeoff/mytimeoffrequests")
        if (res.status != 200) {
            // handle later
        } else {
            this.setState({ ...this.state, myTimeOffRequests: res.data.data })
        }
    }
    requestTimeOff = async (startDate, endDate, type_id, reason) => {
        this.setState({ ...this.state, requestDone: { error: null, done: null } })
        try {
            const res = await makePOSTRequest({ startDate, endDate, type_id, reason }, '/timeoff/timeoffrequest')
            this.setMyTimeOffDetails(res.data.data.timeOffDetails)
            this.setState({ ...this.state, requestDone: { error: null, done: res.data.message } })
        } catch (err) {
            this.setState({ ...this.state, requestDone: { error: err.message, done: null } })
        }
    }
    render() {
        // debugger
        return (
            <div>
                {this.state.requestDone.done || this.state.requestDone.error ?
                    <p style={{ background: this.state.requestDone.done ? "#5DBC90" : "red" }}>{this.state.requestDone.done || this.state.requestDone.error}</p> : null}
                <Grid container spacing={1} >
                    <Grid item xs={3} lg={3}>
                        <BalanceAsOfDate myTimeOffDetails={this.state.myTimeOffDetails} requestTimeOff={this.requestTimeOff} ></BalanceAsOfDate>
                    </Grid>
                    <Grid item xs={9} lg={9}>
                        <TimeOffCalender myTimeOffRequests={this.state.myTimeOffRequests} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default RequestTimeOff
