import React, { Component } from 'react'
import MyCurrentApprovedTimeTable from '../components/MyCurrentApprovedTime'
import { makeGetRequest } from '../utils/request'

export class OutstandingRequests extends Component {
    constructor(props) {
        super(props)

        this.state = {
            myTimeOffRequests: []
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
        await this.getMyTimeOffRequests()
    }
    render() {
        return (
            <div>
                {this.state.myTimeOffRequests.length ?
             <MyCurrentApprovedTimeTable label={"My Outstanding Time Off Requests"}  myTimeOffRequests = {this.state.myTimeOffRequests.filter(r=>r.status_id==1)} /> : <h4>No Outstanding Requests Found</h4>   } 
            </div>
        )
    }
}

export default OutstandingRequests
