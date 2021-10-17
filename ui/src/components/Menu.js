import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../pageLayout.js';
import ChallengeBar from "./AppBar";
import * as core from '@material-ui/core';
import {staticMenuData} from './MenuBarData';
import {Link} from 'react-router-dom';
import SubMenu from './SubMenu.js';
import useFetchAuth from "../useFetchAuth";


// core(7): Drawer, AppBar, List, Divider, ListItem, ListItemIcon, ListItemText
// icons(4): Code, Home, Timeline, CollectionsBookmark

const drawerWidth = 240;
const appBarHeight = 0;
const APIpath = 'api/challenge-sets';

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



export default function MenuBar() {
    const classes = useStyles();

    const [title, setTitle] = useState("Home");

    //   API GET REQUEST For items that shows up in the mneu list
    const { data, error, loading } = useFetchAuth(APIpath);

    return (
        <div className={classes.root} >
            <core.AppBar position="fixed" className={classes.appBar}>
                <ChallengeBar name={title}/>
            </core.AppBar>


            <core.Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }} anchor="left" >
                <div className={classes.toolbar} />
                
                <core.Divider />
                {/* LIST 1 */}
                {/* Data in this list is read from local file */}
                <core.List>
                    {staticMenuData.map((item,index)=>{
                        return(
                            <core.ListItem key={index} style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <Link to={item.path} style={{textDecoration:'none'}} onClick={()=>{setTitle(item.name)}} >
                                    <div style={{display:'flex', flexDirection: 'row'}}>
                                        <core.ListItemIcon style={{minWidth:'0'}}>{item.icon}</core.ListItemIcon>
                                        <core.ListItemText style={{color:'#000000', marginLeft:'16px', marginRight:'25px'}}
                                        primary={<core.Typography style={{fontSize:'15px'}}>{item.name}</core.Typography>} />   
                                    </div>
                                </Link> 
                            </core.ListItem>
                        );
                    })}
                </core.List>

                <core.Divider />

                {/* LIST 2 */}
                {/* Data in this list is read over API */}
                <core.List >    
                    {data.map((item)=>{
                        return <SubMenu path={APIpath} listItem={item} key={item.id} changeTitle={title => setTitle(title)}/>;
                    })}
                </core.List>
               
                <core.Divider />
            </core.Drawer>
        </div>
    );
}
