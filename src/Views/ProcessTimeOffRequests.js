import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import RequestDetailsAndActions from '../components/RequestDetailsAndActions'
import RequestsList from '../components/RequestsList'
import TimeOffRequestProcess from '../components/TimeOffRequestProcess'
import { makeGetRequest, makePOSTRequest } from '../utils/request'

export class ProcessTimeOffRequests extends Component {
    render() {
        return (
            <div>
                <TimeOffRequestProcess />
            </div>
        )
    }
}

export default ProcessTimeOffRequests
