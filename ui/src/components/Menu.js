import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';



// import { makeStyles } from '@material-ui/core/styles';
import Layout from '../pageLayout.js';
import ChallengeBar from "./AppBar";
import * as core from '@material-ui/core';
import {staticMenuData} from './MenuBarData';
import {Link} from 'react-router-dom';
import SubMenu from './SubMenu.js';
import useFetchAuth from "../useFetchAuth";


const drawerWidth = 280;

const appBarHeight = 0;
const APIpath = 'api/challenge-sets';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    overflowX: 'hidden'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [displayFlagSubmit, setDisplayFlagSubmit ] = useState(false);
  const [title, setTitle] = useState("Home");

    //   API GET REQUEST For items that shows up in the mneu list
  const { data, error, loading } = useFetchAuth(APIpath);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resetFlagSubmit = ()=>{
    if(displayFlagSubmit){
      const inputSubmitFlag = document.getElementById('inputSubmitFlag');
      inputSubmitFlag.value = "";
      setDisplayFlagSubmit(false);
    }
  }

  const drawer = (
    <div>
      <div className="paddingtop" />
        {/* /* LIST 1 */}
        {/* Data in this list is read from local file */}
        <core.List>
          {staticMenuData.map((item,index)=>{return(
              <core.ListItem button key={index} style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                  <Link to={item.path} style={{textDecoration:'none'}} onClick={resetFlagSubmit} >
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
                return <SubMenu path={APIpath} listItem={item} key={item.id} 
                        changeTitle={title => setTitle(title)} displayInput={displayFlagSubmit} setDisplay={setDisplayFlagSubmit}/>;
            })}
        </core.List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} displayInput={displayFlagSubmit} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <ChallengeBar name={"Testing"} displayInput={displayFlagSubmit} setDisplay={setDisplayFlagSubmit} />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
