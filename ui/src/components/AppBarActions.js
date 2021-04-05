import React from 'react';
import Button from '@material-ui/core/Button';
import {useAuth0} from "@auth0/auth0-react";
import {Avatar, Tooltip} from "@material-ui/core";

export default function AppBarActions() {
    const {user, loginWithPopup, logout, isAuthenticated} = useAuth0();

    let authComponentStyle = {marginLeft: '15px'};
    let authComponent = isAuthenticated ? <>
        <Tooltip title="Logout" aria-label="logout">
            <Avatar src={user.picture} style={authComponentStyle}
                    onClick={() => logout()}/>
        </Tooltip>
    </> : <>
        <Button variant="contained" color="white" disableElevation
                style={authComponentStyle}
                onClick={() => loginWithPopup()}>
            Login
        </Button>
    </>;

    return (
        <div style={{display: "flex"}}>
            <Button variant="contained" color="white" disableElevation
                    href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_aeIPNQMjkAwIjtk"
                    target="_blank"> Report Issue
            </Button>
            {authComponent}
        </div>
    );
}
