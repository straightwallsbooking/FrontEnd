import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import moment from 'moment'
import React from 'react'

export default function EmployeeInfo(props) {
    return (
        <div>
            <>
                <h3 className="mainHeading">{`${props?.employee?.first_name} ${props?.employee?.last_name}`}</h3>
                <p style={{ textAlign: "left", color: 'lightgray' }}>{props?.status}</p>
            </>
            <div >
                <Table className={'tbl'}>
                    <TableBody>
                        <TableRow>
                            <TableCell className={'tdl'}>
                                <h6>Hire Date</h6>
                            </TableCell>
                            <TableCell className={'tdl'}>
                               {`${props.employee?.hire_date}`}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={'tdl'}>
                                <h6>Phone</h6>
                            </TableCell>
                            <TableCell className={'tdl'}>
                                {props.employee?.phone}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={'tdl'}>
                                <h6>Leave Dates</h6>
                            </TableCell>
                            <TableCell className={'tdl'}>
                                {`${moment(props.timeOffRequest?.startDate).format('YYYY/MM/DD')} - ${moment(props.timeOffRequest?.endDate).format('YYYY/MM/DD')}`}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table></div>

        </div>
    )
}
