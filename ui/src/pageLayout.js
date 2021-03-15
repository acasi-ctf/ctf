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

                    <Grid container item xs={12} borderWidth={1} width={maxWidth} minHeight = {100} style={{height: '50%'}}>

                        <ScrollableTabsButtonAuto />
                    </Grid>


                    <Grid container item xs={12} width={maxWidth} style={{backgroundColor: 'white', overflowY:'scroll', height: '50%'}} borderWidth = {0} >
                        <div>This is your challenge description!
                            <p id='challenge' style={{
                                height: '50%'
                            }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehe
                                nderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
                                r. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehe
                                nderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
                                r. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehe
                                nderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
                                r. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehe
                                nderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
                                r. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehe
                                nderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
                                r. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehe
                                nderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu
                                r. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.</p>


                        </div>
                    </Grid>


                </Grid>
                <Grid container item xs={6}><Terminal/></Grid>
            </Grid>
        )
    }
}

