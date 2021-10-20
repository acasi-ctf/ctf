import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import * as core from '@material-ui/core';
import '../style/SubMenu.css';
import useFetchAuth from "../useFetchAuth";
import * as UI from '@material-ui/icons';


const iconClosed = <UI.ArrowDropDown/>;
const iconOpened = <UI.ArrowDropUp/>;
const ChallengeSet_Icon = <UI.CollectionsBookmark/>;
const ChallengeIcon = <UI.Assignment/>;

export default function SubMenu(props) {
    const [subnav, setSubNav] = useState(false);
    const item = props.item;
    const showSubmenu = () =>{
        setSubNav(!subnav);
        // props.changeTitle(item.title);
    }
    //constructing the API path then fetch data from there
    const APIpath = props.path+"/"+item.slug+"/challenges";
    const { data, error, loading } = useFetchAuth(APIpath);
    console.log(data);
    return (
        <>
            <core.ListItem style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                
                <Link to={item.path?item.path:"."} style={{textDecoration:'none'}} onClick={()=>{setSubNav(!subnav)}} >
                    <div style={{display:'flex', flexDirection: 'row'}}>
                        <core.ListItemIcon style={{minWidth:'0'}}>{item.icon?item.icon:ChallengeSet_Icon}</core.ListItemIcon>
                        <core.ListItemText style={{color:'#000000', marginLeft:'16px', marginRight:'25px'}}
                        primary={<core.Typography style={{fontSize:'15px'}}>{item.name}</core.Typography>} />   
                        <div>
                            {(item.subMenu || data.length !==0) && subnav ? iconOpened:
                            ( item.subMenu || data.length !==0) ? iconClosed:
                            null}
                        </div>
                    </div>
                    
                </Link> 
                {subnav && data.map((item)=>{
                    return (
                        // <Link to={item.path} key={item.id} className='subItem'>
                        <Link to={"."} key={item.id} className='subItem' >
                            <div style={{display:'flex', flexDirection:'row'}}>
                                <core.ListItemIcon style={{minWidth:'0'}}>{ChallengeIcon}</core.ListItemIcon>
                                <core.ListItemText style={{marginLeft:'16px', marginRight:'25px'}} 
                                primary={<core.Typography style={{fontSize:'13px'}}>{item.name}</core.Typography>} />
                            </div>
                        </Link>
                    )    
                })}
            </core.ListItem>
        </>
    );
};


