import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import AlternateDatesModal from '../components/AlternateDatesModal'
import BalanceAsOfDate from '../components/BalanceAsOfDate'
import TimeOffCalender from '../components/TimeOffCalender'
import { makeGetRequest, makePOSTRequest } from '../utils/request'

export class RequestTimeOff extends Component {
    constructor(props) {
        super(props)

        this.state = {
            myTimeOffDetails: null,
            myTimeOffRequests: null,
            requestDone: { error: null, done: null },
            alternate:{startDate:null,endDate:null},
            openAlternateModal : false,
        }
    }
    componentDidMount = async () => {
        this.getMyTimeOffDetails()
        this.getMyTimeOffRequests()
    }
    handleAlternateClose = () =>{
        this.setState({...this.state,openAlternateModal:false})
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
            if (!res.data.data.request) {
                this.setState({...this.state,alternate:{startDate:res.data.data.alternate.startDate,endDate:res.data.data.alternate.endDate},openAlternateModal:true})
            } else {
                this.setState({ ...this.state, requestDone: { error: null, done: res.data.message }, myTimeOffRequests:[...this.state.myTimeOffRequests,res.data.data.request] })
            }
            this.setMyTimeOffDetails(res.data.data.timeOffDetails)
        } catch (err) {
            this.setState({ ...this.state, requestDone: { error: err.message, done: null } })
        }
    }
    render() {
        return (
            <div>
                {this.state.requestDone.done || this.state.requestDone.error ?
                    <p style={{ background: this.state.requestDone.done ? "#5DBC90" : "red" }}>{this.state.requestDone.done || this.state.requestDone.error}</p> : null}
                <Grid container spacing={1} >
                    <Grid item xs={3} lg={3}>
                        <BalanceAsOfDate closeModal= {this.handleAlternateClose} startDate={this.state.alternate.startDate} endDate={this.state.alternate.endDate} open={this.state.openAlternateModal}  myTimeOffRequests={this.state.myTimeOffRequests} myTimeOffDetails={this.state.myTimeOffDetails} requestTimeOff={this.requestTimeOff} ></BalanceAsOfDate>
                    </Grid>
                    <Grid item xs={9} lg={9}>
                        <TimeOffCalender myTimeOffRequests={this.state.myTimeOffRequests} />
                    </Grid>
                </Grid>
                {/* <AlternateDatesModal closeModal= {this.handleAlternateClose} startDate={this.state.alternate.startDate} endDate={this.state.alternate.endDate} open={this.state.openAlternateModal} /> */}
            </div>
        )
    }
}

export default RequestTimeOff
