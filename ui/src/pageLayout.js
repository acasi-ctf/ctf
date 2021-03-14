import React, {Component} from 'react';
import App from './App';
import Grid from '@material-ui/core/Grid'

export default class Layout extends Component {
    render() {
        return (
            <Grid container spacing={1} xs={12}>

                <Grid container item xs={6} direction="column">

                    <Grid container item xs={6}>Challenge info here</Grid>
                    <Grid container item xs={6}>Doc info here</Grid>
                </Grid>
                <Grid container item xs={6}><App/></Grid>
            </Grid>
        )
    }
}
