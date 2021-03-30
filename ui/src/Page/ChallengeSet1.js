import React,{useState} from 'react';
import './ChallengeSet1.css';
import * as core from '@material-ui/core';
import {ChallengeSet1Data} from './ChallengeSet1Data';
import {useLocation, Link, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`scrollable-auto-tabpanel-${index}`} aria-labelledby={`scrollable-auto-tab-${index}`} {...other}>
            <core.Box style={{padding: 0}} p={3}>
                <core.Typography>{children}</core.Typography>
            </core.Box>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function ChallengeSet1() {

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className='ChallengeSet1'>
                <core.AppBar position="static" color="default">
                    <core.Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto" aria-label="simple auto tabs example">
                        {ChallengeSet1Data.map((item,index)=>{
                            return(
                                // <core.Tab key={item.index} label={item.label} {...a11yProps(item.index)} component={Link} to={`${item.topic}/${item.label}`} />
                                <core.Tab key={item.index} label={item.label} {...a11yProps(item.index)}/>
                            )
                        })}
                    </core.Tabs>
                </core.AppBar>

                <TabPanel className='box1' value={value} index={value} style={{overflowY: 'scroll'}}>
                    {ChallengeSet1Data[value].itembox1}
                </TabPanel>
                <TabPanel className='box2' value={value} index={value} style={{overflowY: 'scroll'}}>
                    {ChallengeSet1Data[value].itembox2}
                </TabPanel>
            </div>
        </div>
    )
}