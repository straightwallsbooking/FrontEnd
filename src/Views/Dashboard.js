import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import ReportsAndActionTable from '../components/ReportsAndActionTable'
import UpcomingHolidaysTable from '../components/UpcomingHolidaysTable'
import ManagerReportsAndActions from '../components/ManagerReportsAndActions'
import MyCurrentApprovedTimeTable from '../components/MyCurrentApprovedTime'
import { makeGetRequest } from '../utils/request'


export class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: null,
            myTimeOffDetails: null,
            myTimeOffRequests: []
        }
    }
    getProfile = async () => {
        const res = await makeGetRequest("", "/profile")
        if (res.status != 200) {
            // handle later
        } else {
            this.setState({ ...this.state, profile: res.data.data })
        }
    }
    getMyTimeOffDetails = async () => {
        const res = await makeGetRequest("", "/timeoff/mytimeoffdetails")
        if (res.status != 200) {
            // handle later
        } else {
            this.setState({ ...this.state, myTimeOffDetails: res.data.data })
        }
    }
    getMyTimeOffRequests = async () => {

        const res = await makeGetRequest("", "/timeoff/mytimeoffrequests")
        if (res.status != 200) {
            // handle later
        } else {
            this.setState({ ...this.state, myTimeOffRequests: res.data.data })
        }
    }
    componentDidMount = async () => {
        await this.getProfile()
        await this.getMyTimeOffDetails()
        await this.getMyTimeOffRequests()
    }
    render() {
        return (
            <div>
                <Grid container spacing={3} >
                    <Grid item xs={6} lg={6}>
                        {this.state.myTimeOffDetails ?
                            <ReportsAndActionTable {...this.state} /> : null}
                    </Grid>
                    <Grid item xs={6} lg={6}>
                        <ManagerReportsAndActions />
                    </Grid>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={6} lg={6}>
                            <MyCurrentApprovedTimeTable {...this.state} /> 
                    </Grid>
                    <Grid item xs={6} lg={6}>
                        <UpcomingHolidaysTable />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Dashboard
