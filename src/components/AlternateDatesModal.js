import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { DatePicker } from './DatePicker';
import { makeGetRequest } from '../utils/request';
import { Button, Select, Table, TableBody, TableCell, TableHead, TableRow, TextareaAutosize } from '@material-ui/core';
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
        background: '#9a9da1',
        textAlign:'center'
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

export default function AlternateDatesModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const handleClose = () => {
        props.closeModal()
    };
    const { startDate, endDate } = props
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h4>Your Request Can Not Be Approved Because of Constraints Check, Please Tell Us If The Alternate Dates Given Are Suitable For You</h4>
            <Table>
                <TableHead style={{ textAlign: 'center' }}>
                    <TableRow>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{moment(props.startDate).format('YYYY-MM-DD')}</TableCell>
                        <TableCell>{moment(props.endDate).format('YYYY-MM-DD')}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button onClick={() => { props.requestTimeOff(startDate, endDate, 1, 'Alternate accepted'); props.closeModal() }}>Accept</Button>
            <Button onClick={props.closeModal}>Reject</Button>
            <AlternateDatesModal />
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
