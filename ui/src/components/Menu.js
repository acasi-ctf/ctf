import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../pageLayout.js';
import ChallengeBar from "./AppBar";
import * as core from '@material-ui/core';

// import {List1Data, SubList1} from './MenuBarData';
import * as Data from './MenuBarData';
import {Link} from 'react-router-dom';
import './Menu.css'

// core(7): Drawer, AppBar, List, Divider, ListItem, ListItemIcon, ListItemText
// icons(4): Code, Home, Timeline, CollectionsBookmark

const drawerWidth = 240;
const appBarHeight = 0;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        Height: appBarHeight,
        marginLeft: drawerWidth,
        marginBottom: 65,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    body: {
        marginTop: appBarHeight,
    }
}));

export default function PermanentDrawerLeft() {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <core.AppBar position="fixed" className={classes.appBar} >
                <ChallengeBar/>
            </core.AppBar>
            <core.Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }} anchor="left" >
                <div className={classes.toolbar} />
                <core.Divider />
                {/* LIST 1 */}
                <core.List>
                    {Data.List1Data.map((item,index)=>{
                        return(
                            <core.ListItem button key={item.index} className={item.cName}>
                                <Link to={item.path}>
                                    <core.ListItemIcon>{item.icon}</core.ListItemIcon>
                                    <core.ListItemText primary={item.title} />   
                                </Link>
                            </core.ListItem>
                        )
                    })}
                </core.List>
                <core.Divider />
                {/* LIST 2 */}
                <core.List>
                    {/* SUBLIST 1 */}
                    {Data.SubList1.map((item,index)=>{
                        return(
                            <core.ListItem button key={item.index} className={item.cName}>
                                <Link to={item.path}>
                                    <core.ListItemIcon>{item.icon}</core.ListItemIcon>
                                    <core.ListItemText primary={item.title} />
                                </Link>
                            </core.ListItem>
                        )
                    })}
               
                    {/* SUBLIST 2 */}
                    {Data.SubList2.map((item,index)=>{
                        return(
                            <core.ListItem button key={item.index} className={item.cName}>
                                <Link to={item.path}>
                                    <core.ListItemIcon>{item.icon}</core.ListItemIcon>
                                    <core.ListItemText primary={item.title} />
                                </Link>
                            </core.ListItem>
                        )
                    })}
                </core.List>

                <core.Divider />
            </core.Drawer>
            {/* <main className={classes.content}>
                <React.Fragment>
                <Layout />
                </React.Fragment>
            </main> */}
        </div>
    );
}
