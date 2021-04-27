import React, { Component } from 'react'
import { Button, Input } from '@material-ui/core'
import { makeGetRequest, makePOSTRequest } from '../utils/request'
import { Redirect, useHistory } from 'react-router-dom'
export class login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            isAuthenticated: false
        }
    }
    componentDidMount = async () => {
        const res = await makeGetRequest("", "/auth/checklogin")
        if (res.status == 200)
            this.setState({ ...this.state, isAuthenticated: true })
        else
            this.setState({ ...this.state, isAuthenticated: false })
    }
    login = async () => {
        try {
            const res = await makePOSTRequest({ email: this.state.email, password: this.state.password }, '/auth/login/');
            if (res.status == 200) {
                this.props.history.push({
                    pathname: '/dashboard',
                    isAuthenticated: true
                })
            }
        } catch (error) {

        }
    }
    render() {
        return (this.state.isAuthenticated ? <Redirect to="/dashboard" /> :
            <div style={{
                display:"flex",
                flexDirection:'column',
                gap:'25px',
                position: "absolute",
                left: "50%",
                top: "50%",
                WebkitTransform: "translate(-50%, -50%)",
                transform: "translate(-50%, -50%)"
            }}>
                <Input style={{borderRadius:'500px'}} type={"text"} onChange={(e) => { this.setState({ email: e.target.value }) }} ></Input>
                <Input type={"password"} onChange={(e) => { this.setState({ password: e.target.value }) }} ></Input>
                <Button color="primary" variant="outlined" onClick={this.login}>Login</Button>
            </div>
        )
    }
}

export default login
