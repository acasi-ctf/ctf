import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {maxHeight} from "@material-ui/system";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}

            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root} >
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    width = {maxHeight}

                >
                    <Tab label="HTML" {...a11yProps(0)} />
                    <Tab label="CSS" {...a11yProps(1)} />
                    <Tab label=".js" {...a11yProps(2)} />
                    <Tab label="MD5" {...a11yProps(3)} />
                    <Tab label="hashing" {...a11yProps(4)} />
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} />
                </Tabs>
            </AppBar >
            <TabPanel value={value} index={0} style={{overflowY: 'scroll'}}>
                 Hypertext Markup Language is the standard markup language for anything design to be displayed in a browser. The style can then be modified using a CSS document.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
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
                officia deserunt mollit anim id est laborum.
            </TabPanel>
            <TabPanel value={value} index={1} style={{overflowY: 'scroll'}}>
                Cascading style sheets is what is used to make HTML pretty.
            </TabPanel>
            <TabPanel value={value} index={2} style={{overflowY: 'scroll'}}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3} style={{overflowY: 'scroll'}}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4} style={{overflowY: 'scroll'}}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5} style={{overflowY: 'scroll'}}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6} style={{overflowY: 'scroll'}}>
                Item Seven
            </TabPanel>
        </div>
    );
}
