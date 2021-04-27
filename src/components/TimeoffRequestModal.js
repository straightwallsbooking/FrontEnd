import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { DatePicker } from './DatePicker';
import { makeGetRequest } from '../utils/request';
import { Button, Select, Table, TableBody, TableCell, TableRow, TextareaAutosize } from '@material-ui/core';
import moment from 'moment';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TimeoffRequestModal(props) {
    const classes = useStyles();
    const [holidayTypes, setholidayTypes] = React.useState([])
    const [typeSelected, settypeSelected] = React.useState(null)
    const [errorMessage, seterrorMessage] = React.useState("")
    const [reason, setreason] = React.useState("")
    const [to, setTo] = React.useState(new Date())
    const [from, setFrom] = React.useState(new Date())
    const { myTimeOffRequests } = props
    const getHolidayTypes = async () => {
        try {
            const res = await makeGetRequest("", '/holidayTypes')
            setholidayTypes(res.data.data)
        } catch (err) {
            return { error: err.message, data: null }
        }
    }
    React.useEffect(() => {
        getHolidayTypes()
    }, [])
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const handleClose = () => {
        props.closeModal()
    };
    const onChangeTo = (date) => {
        setTo(date)
    }
    const onChangeFrom = (date) => {
        setFrom(date)
    }
    const initiateRequest = () => {

        if (!to || !from || !typeSelected) {
            seterrorMessage("To, From and Type Are Required Field")
        } else if ((moment(from) > moment(to)) || moment(from) < moment()) {
            seterrorMessage("Please select a valid range")
        }
        else {
            let leaveExist = false
            let t = moment(from)
            let e = moment(to).add(1, 'day')
            do {
                if (
                    myTimeOffRequests.filter(r => {
                        let ll = false
                        let tt = moment(r.startDate)
                        let ee = moment(r.endDate).add(1, 'day')
                        do {
                            if (tt.format('YYYY-MM-DD') == t.format('YYYY-MM-DD')) {
                                ll = true
                                break
                            }
                            tt.add(1, 'day')
                        } while (tt < ee)
                        return ll

                    }
                    ).length
                ) {
                    leaveExist = true
                    break
                }
                t.add(1, 'day')
            } while (t <= e)
            if (!leaveExist) {
                props.requestTimeOff(from, to, typeSelected, reason)
                handleClose()
            } else {
                seterrorMessage('Some of the dates are already holidays as per your schedule, please choose different range')
            }
        }
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            {errorMessage ? <p style={{ color: 'red' }}>{errorMessage}</p> : null}
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>From
                        </TableCell>
                        <TableCell><DatePicker value={from} onChange={onChangeFrom} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>To
                        </TableCell>
                        <TableCell> <DatePicker value={to} onChange={onChangeTo} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Type
                        </TableCell>
                        <TableCell> <Select
                            native
                            onChange={(e) => { settypeSelected(e.target.value) }}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                            }}
                            value={typeSelected}
                        >
                            {holidayTypes.map((e, i) => {
                                return <option value={e.id}>{e.type}</option>

                            })}
                        </Select>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Reason for request
                        </TableCell>
                        <TableCell> <TextareaAutosize value={reason} onChange={(e) => setreason(e.target.value)}></TextareaAutosize>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>

            <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
                <Button color="primary" variant="contained" onClick={initiateRequest}>Submit</Button>
                <Button onClick={handleClose} variant="contained" color="secondary">Cancel</Button>
            </div>
            <TimeoffRequestModal />
        </div>
    );

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
