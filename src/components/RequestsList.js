import { Button } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import '../styles/requestDetails.css'

export default function RequestsList(props) {
    const { list, handleClick } = props
    const handleItemClick = (e) => {
        handleClick(e)
    }
    return (
        <div style={{textAlign:"center",height:'80vh',overflowY:'auto'}}>
            <div>Total Requests <span>{list?.length}</span></div>
            {list.map(l => {
                const diffDays = moment().diff(moment(l.requestStartTime), 'days')
                return (
                    <Button style={{ textTransform:'none',display:'block', border: "1px solid #0ff", margin: "0 auto", cursor: 'pointer' }} id={'itemclick'}  onClick={()=>handleItemClick(l.id)}>
                        <h4 className='mainHeading'>{`Time Off Request of ${l.employee?.first_name} ${l.employee?.last_name}`} </h4>
                        <p style={{ textAlign: "left", color: 'lightgray' }}>{diffDays > 0 ? `${diffDays} Day(s) Ago` : 'Today'}</p>
                    </Button>
                )
            })}
        </div>
    )
}
