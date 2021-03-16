import React, {Component} from 'react';
import Terminal from './Terminal';
import Grid from '@material-ui/core/Grid'
import {maxWidth} from "@material-ui/system";
import ScrollableTabsButtonAuto from "./components/Tabs";


export default class Layout extends Component {

    render() {
        return (
            <Grid container spacing={1} xs={12} >

                <Grid container item xs={6}  borderWidth={1} spacing={1} borderColor = "black" border={1} >
                    <div>

                    <Grid container item xs={8} borderWidth={1} width={maxWidth} minHeight = {100} style={{height: '40%'}}>

                        <ScrollableTabsButtonAuto />
                    </Grid>
                    </div>
                    <div>
                    <Grid container item xs={12} width={maxWidth} style={{backgroundColor: 'white', overflowY:'scroll', height: '100%'}} borderWidth = {2} >

                            <p id='challenge'>
                                Challenge – Crypto
                            </p>
                            <p>
                                Crypto is learning about encryption technology. There are classical ciphers and modern ciphers.
                                Passwords are a part of information security. The algorithm will always be made public, and we believe weak
                                passwords can be more dangerous to security than a password free system. Learning cryptography is not only
                                for attacking a target but also helps us protect our information.
                            </p>

                            <p>
                                Challenge – 1:

                                In this challenge, you will face the classical cipher combination. The flag is enciphered in three different ways.
                                For each deciphering, you will be given a hint. If you have no idea what the flag is, you can try and input whatever
                                you would like, maybe you will get lucky. Have at it!
                            </p>



                    </Grid>
                    </div>

                </Grid>
                <Grid container item xs={6}><Terminal/></Grid>
            </Grid>
        )
    }
}

