import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Layout from './pageLayout.js';
import CodeIcon from '@material-ui/icons/Code';
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import ChallengeBar from "./components/AppBar";
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

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
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} >
                <ChallengeBar/>

            </AppBar>
            <Drawer

                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {['Home', 'Leaderboard'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <TimelineIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem button >
                        <ListItemIcon>
                            <CollectionsBookmarkIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Challenge Set 1
                        </ListItemText>
                    </ListItem>
                    {['Webpage Structure', 'Ciphers and Basic Encryption', 'Directory Traversal Attacks', 'SQL Injection', 'Cumulative Challenge'].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon><CodeIcon/></ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <React.Fragment>
                <Layout />
                </React.Fragment>
            </main>
        </div>
    );
}
