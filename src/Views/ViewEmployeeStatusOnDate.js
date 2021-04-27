import { Grid, InputLabel, Select } from '@material-ui/core'
import React, { Component } from 'react'
import { DatePicker } from '../components/DatePicker'
import EmployeesStatus from '../components/EmployeesStatus'
import RequestDetailsAndActions from '../components/RequestDetailsAndActions'
import RequestsList from '../components/RequestsList'
import TimeOffRequestProcess from '../components/TimeOffRequestProcess'
import { makeGetRequest, makePOSTRequest } from '../utils/request'

export class ViewEmployeeStatusOnDate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date_selected: new Date(),
            statuses : []
        }
    }
    componentDidMount = async () => {
        await this.onChangeDate(new Date())
    }
    onChangeDate = async (d = this.state.date_selected) => {
        const response = await makePOSTRequest({ date: d }, 'manager/my-employees-status-on-date/')
        if (response.status == 200) this.setState({ ...this.state, statuses: response.data.data,date_selected:d })
    }
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                    <InputLabel htmlFor="age-native-simple">Select Date</InputLabel>
                    <DatePicker value={this.state.date_selected} onChange={(e) => this.onChangeDate(e)} />
                </div>
                {this.state.statuses.length ?
                    <EmployeesStatus statuses={this.state.statuses} /> : "No Employees Found"}
            </div>
        )
    }
}

export default ViewEmployeeStatusOnDate
