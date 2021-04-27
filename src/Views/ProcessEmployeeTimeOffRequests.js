import { Grid, InputLabel, Select } from '@material-ui/core'
import React, { Component } from 'react'
import RequestDetailsAndActions from '../components/RequestDetailsAndActions'
import RequestsList from '../components/RequestsList'
import TimeOffRequestProcess from '../components/TimeOffRequestProcess'
import { makeGetRequest, makePOSTRequest } from '../utils/request'

export class ProcessEmployeeTimeOffRequests extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employee_id: '',
            employees: []
        }
    }
    componentDidMount = async () => {
        const response = await makeGetRequest('', '/manager/my-employees')
        if (response.status == 200) this.setState({ ...this.state, employees: response.data.data,employee_id: response.data.data.length ? response.data.data[0].id : '' })
    }
    render() {
        return (
            <div style={{display:'flex',flexDirection:'column',gap:'25px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px',justifyContent:'center'}}>
                <InputLabel htmlFor="age-native-simple">Select Employee</InputLabel>
                <Select
                    native
                    // placeholder="asd"
                    // defaultValue="Se"
                    onChange={(e) => { this.setState({ ...this.state, employee_id: e.target.value }) }}
                    inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                    }}
                    // value={this.state.employee_id}
                >
                    {this.state.employees.map((e, i) => {
                        return <option value={e.id}>{`${e.first_name} ${e.last_name}`}</option>
                    })}
                </Select>
                </div>
                {this.state.employee_id ?
                    <TimeOffRequestProcess employee_id={this.state.employee_id} /> : null}
            </div>
        )
    }
}

export default ProcessEmployeeTimeOffRequests
