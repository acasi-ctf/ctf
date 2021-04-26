import React,{useState, useEffect} from 'react';
import './ChallengeSet1.css';
import * as core from '@material-ui/core';
import {ChallengeSet1Data} from './ChallengeSet1Data';
import {useLocation, Link, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import Terminal from '../components/Terminal';
import marked from 'marked';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';




import ltn from '../challenges/web-based/challenges/web-structure/docs/HTML.md';

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
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const [txt, setMarkdown] = useState("");
    
    
    useEffect(() => {
        fetch(ltn)
            .then((res) => res.text())
            .then((text) => {
                setMarkdown(text)
            });
    }, []);


   const handleContent = () => {
        console.log("CLICKEDDDDD!!!!");
    };

    return (
        <div style={{display:'flex', flexDirection:'row', position:'fixed'}}>
            <div className='ChallengeSet1'>
                <core.AppBar position="static" color="default">
                    <core.Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto" aria-label="simple auto tabs example">
                        {ChallengeSet1Data.map((item,index)=>{
                            return(
                                // <core.Tab key={item.index} label={item.label} {...a11yProps(item.index)} component={Link} to={`${item.topic}/${item.label}`} />
                                <core.Tab key={item.index} label={item.label} onClick={handleContent} {...a11yProps(item.index)}/>
                            )
                        })}
                    </core.Tabs>
                </core.AppBar>
                
                {/* <ReactMarkdown source={ChallengeSet1Data[value].itembox1}/> */}
     
                <TabPanel className='box1' value={value} index={value} style={{overflowY: 'scroll', marginTop:'5px', marginLeft: '5px'}}>
                    {/* {ChallengeSet1Data[value].itembox1}  */}
                    <ReactMarkdown remarkPlugins={[gfm]} children={txt}/>
                </TabPanel>

            </div>
            <Terminal />
        </div>
    )
}