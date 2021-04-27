import { Button, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import '../styles/requestDetails.css'

export default function EmployeeStatusList(props) {
    const { list, handleClick } = props
    const handleItemClick = (e) => {
        handleClick(e)
    }
    return (
        <div style={{ textAlign: "center", height: '80vh', overflowY: 'auto' }}>
            <div><label>Total Employees</label><span>{`: ${list?.length}`}</span> <label> {' & On Leave: '}  </label> <span>{`${list?.filter(l => l.status == 'Available').length}`}</span></div>
            {list.map((l, i) => {
                return (
                    <Button style={{ textTransform: 'none', display: 'block', border: "1px solid #0ff", margin: "0 auto", cursor: 'pointer' }} id={'itemclick'} onClick={() => handleItemClick(l.employee.id)}>

                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {`${l.employee.first_name} ${l.employee.last_name}`}
                                    </TableCell>
                                    <TableCell>
                                        {`${l.status}`}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Button>
                )
            })}
        </div>
    )
}
