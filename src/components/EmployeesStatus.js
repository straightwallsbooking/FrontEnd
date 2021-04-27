import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import EmployeeInfo from './EmployeeInfo'
import EmployeeStatusList from './EmployeeStatusList'

export class EmployeesStatus extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             employee_selected: null
        }
    }
    handleClick =(e_id) =>{
        const temp = this.props.statuses?.filter(s=>{
            return s.employee.id==e_id
        })
        this.setState({ employee_selected : temp.length ? temp[0] : null})
    }
    render() {
        return (
            <div>
                <Grid container spacing={2} >
                    <Grid item xs={this.state.employee_selected ? 6 :12} lg={this.state.employee_selected ? 6 :12}>
                        <EmployeeStatusList handleClick={this.handleClick} list={this.props.statuses} />
                    </Grid>
                    {this.state.employee_selected ? 
                    <Grid item xs={6} lg={6}>
                        <EmployeeInfo {...this.state.employee_selected} />
                    </Grid> : null }
                </Grid>
            </div>
        )
    }
}

export default EmployeesStatus
