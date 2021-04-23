import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { DatePicker } from './DatePicker';
import { makeGetRequest } from '../utils/request';
import { Button, Select, TextareaAutosize } from '@material-ui/core';

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
    const [reason, setreason] = React.useState("")
    const [to, setTo] = React.useState(new Date())
    const [from, setFrom] = React.useState(new Date())
    
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
    const onChangeTo = (date) =>{
        setTo(date)
    }
    const onChangeFrom = (date) =>{
        setFrom(date)
    }
    const initiateRequest= () =>{
        if(!to || !from || !typeSelected){

        }else{
            props.requestTimeOff(to,from,typeSelected,reason)
            handleClose()
        }
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div>
                <label>From </label>
                <DatePicker value={from} onChange={onChangeFrom} />
                <label>To</label>
                <DatePicker value={to} onChange={onChangeTo} />
            </div>
            <div>
                <label>Type</label>
                <Select
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
            </div>
            <div>
                <label>Reason for request</label>
                <TextareaAutosize value={reason} onChange={(e)=>setreason(e.target.value)}></TextareaAutosize>
            </div>
            <div>
                <Button onClick={initiateRequest}>Submit</Button>
                <Button onClick={handleClose}>Cancel</Button>
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
