import React, { Component } from 'react'
import TodayIcon from '@material-ui/icons/Today';
import { Button, IconButton } from '@material-ui/core';
import { makeGetRequest } from '../utils/request';
import { useHistory } from 'react-router';

export default function Header() {
    const history = useHistory()
    return (
        <div style={{ height: '60px', display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
                <IconButton onClick={() => history.push('/')}><TodayIcon /></IconButton>
                <h4 style={{color:'#ff7e10'}}>Straight Walls</h4>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '50%' }}>
                <Button onClick={async () => {
                    await makeGetRequest("", "/auth/logout");
                    await makeGetRequest("", '/auth/checklogin')
                    history.push('/')
                }} >Logout</Button>

            </div>
        </div>
    )
}
