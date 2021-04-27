import { Button, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import moment from 'moment'
import React, { Component } from 'react'
import '../styles/requestDetails.css'

export class RequestDetailsAndActions extends Component {
    style = {
        repeatedDiv: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop:"30px"
        }
    }
    render() {
        const { request } = this.props
        if (request) {
            const diffDays = request ? moment().diff(moment(request.requestStartTime), 'days') : 0
            const firstDay = request ? moment(request.startDate).format('DD/MM/YYYY') : 'Today'
            return (
                <>
                    <>
                        <h3 className="mainHeading">Review Time Off Request: </h3>
                        <p style={{ textAlign: "left", color: 'lightgray' }}>{diffDays > 0 ? `${diffDays} Day(s) Ago` : 'Today'}</p>
                    </>
                    <div >
                        <Table className={'tbl'}>
                            <TableBody>
                                <TableRow>
                                    <TableCell className={'tdl'}>
                                        <h6>For</h6>
                                    </TableCell>
                                    <TableCell className={'tdl'}>
                                        {`${request?.employee.first_name} ${request?.employee.last_name}`}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={'tdl'}>
                                        <h6>Status</h6>
                                    </TableCell>
                                    <TableCell className={'tdl'}>
                                        {request?.status?.name}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table></div>
                    <div>
                        <h3 className='mainHeading'>Details To Review</h3>
                    </div>
                    <div>
                        <Table className={'tbl'}>
                            <TableBody>
                                <TableRow>
                                    <TableCell className={'tdl'}><h6>First Day of Time Off:</h6></TableCell>
                                    <TableCell className={'tdl'}>{`${firstDay}`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={'tdl'}><h6>Total Days::</h6></TableCell>
                                    <TableCell className={'tdl'}>{request?.totalDays}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={'tdl'}><h6>Leave Type:</h6></TableCell>
                                    <TableCell className={'tdl'}>{request?.leave?.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={'tdl'}><h6>Leave Reason</h6></TableCell>
                                    <TableCell className={'tdl'}>{request?.reason}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div style={this.style.repeatedDiv}>
                        <Button style={{textTransform:'none'}} variant="contained" onClick={()=>this.props.acceptRequest(request.id)} color="primary">Accept</Button>
                        <Button variant="contained" style={{textTransform:'none'}} onClick={()=>this.props.rejectRequest(request.id)} color="secondary">Reject</Button>
                    </div>
                </>
            )
        } else {
            return null
        }
    }
}

export default RequestDetailsAndActions
