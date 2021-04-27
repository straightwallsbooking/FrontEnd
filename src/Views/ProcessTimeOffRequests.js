import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import RequestDetailsAndActions from '../components/RequestDetailsAndActions'
import RequestsList from '../components/RequestsList'
import { makeGetRequest, makePOSTRequest } from '../utils/request'

export class ProcessTimeOffRequests extends Component {
    constructor(props) {
        super(props)

        this.state = {
            requests: [],
            currentRequest: null
        }
    }
    handleClick = (id) => {
        this.setState({ ...this.state, currentRequest: this.state.requests.filter(r => r.id == id)[0] })
    }
    componentDidMount = async () => {
        await this.getMyEmployeesRequest()
    }
    acceptRequest = async (id) => {
        const response = await makePOSTRequest({ req_id: id }, '/manager/accept-request')
        if (response.status == 200) {
            await this.getMyEmployeesRequest()
        } else {

        }
    }
    rejectRequest = async (id) => {
        const response = await makePOSTRequest({ req_id: id }, '/manager/reject-request')
        if (response.status == 200) {
            await this.getMyEmployeesRequest()
        } else {

        }
    }
    getMyEmployeesRequest = async () => {
        const response = await makeGetRequest('', '/manager/my-employee-timeoff-requests')
        if (response.status == 200) {
            this.setState({
                ...this.state,
                requests: response.data.data.requests,
                currentRequest:  null
            })
        }
    }
    render() {
        return (
            <div>
                <Grid container spacing={2} >
                    <Grid item xs={6} lg={6}>
                        <RequestsList handleClick={this.handleClick} list={this.state.requests} />
                    </Grid>
                    <Grid item xs={6} lg={6}>
                        <RequestDetailsAndActions acceptRequest={this.acceptRequest} rejectRequest={this.rejectRequest} request={this.state.currentRequest} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ProcessTimeOffRequests
