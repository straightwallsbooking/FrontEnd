import { Button, Container, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import RequestModal from './TimeoffRequestModal'


const useStyles = {
    first: {
        margin: "10px 0 0 0"
    },
    last: {
        margin: "10px 0 0 0",
        backgroundColor: "#5DBC90",
        color: "white",
        borderRadius: "20px",
        padding: "5px",
        textAlign: "center"
    },
    other: {
        margin: "10px 0 "
    },
    container: {
        borderBottom: "1px solid black"
    }
};
export class BalanceAsOfDate extends Component {
    today = new Date()
    constructor(props) {
        super(props)

        this.state = {
            openRequestModal: false
        }
    }
    closeModal = () => {
        this.setState({
            ...this.state,
            openRequestModal: false
        })
    }

    render() {
        const { myTimeOffDetails, requestTimeOff,setMyTimeOffDetails } = this.props
        return (
            <div style={{ margin: "0 10px", display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <Typography variant={'h4'} style={useStyles.first}>Balance As Of </Typography>
                <Typography style={useStyles.other}>{`${this.today.getDate()} / ${this.today.getMonth()} / ${this.today.getFullYear()}`}</Typography>
                <Typography variant={'h5'} style={useStyles.other}>Balance Per Plan</Typography>
                <Typography variant={'h6'} style={useStyles.other}>Vacation Time Off</Typography>
                <Container style={{ ...useStyles.other, ...useStyles.container }}>
                    <Typography >{myTimeOffDetails ? myTimeOffDetails.vacationBalance : "20"} Days</Typography>
                </Container>
                <Typography variant={'h6'} style={useStyles.other}>Casual Time Off</Typography>
                <Container style={{ ...useStyles.other, ...useStyles.container }}>
                    <Typography>{myTimeOffDetails ? myTimeOffDetails.casualBalance : "20"} Days</Typography>
                </Container>
                <Typography variant={'h6'} style={useStyles.other}>Sick Time Off</Typography>
                <Container style={{ ...useStyles.other, ...useStyles.container }}>
                    <Typography>{myTimeOffDetails ? myTimeOffDetails.sickBalance : "20"} Days</Typography>
                </Container>
                <Button onClick={() => this.setState({ ...this.state, openRequestModal: true })} style={useStyles.last}>Request Time Off</Button>
                <RequestModal  requestTimeOff={requestTimeOff} open={this.state.openRequestModal} closeModal={this.closeModal} />
            </div>
        )
    }
}

export default BalanceAsOfDate
