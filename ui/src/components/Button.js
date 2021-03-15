import React from 'react';
import Button from '@material-ui/core/Button';

export default function IssueButton() {
    return (
        <div style={{ display: "flex" }}>
        <Button variant="contained" color="white" disableElevation  style={{ marginLeft: 'auto' }}
            href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_aeIPNQMjkAwIjtk" target = "_blank">           Report Issue
        </Button>
        </div>
    );
}
