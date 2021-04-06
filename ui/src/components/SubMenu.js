import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import * as core from '@material-ui/core'
import './SubMenu.css'


export default function SubMenu({item}) {
    const [subnav, setSubNav] = useState(false)

    const showSubmenu = () =>{setSubNav(!subnav)}
    return (
        <>
            <core.ListItem style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                <Link to={item.path} style={{textDecoration:'none'}} onClick={item.subMenu && showSubmenu}>
                    <div style={{display:'flex', flexDirection: 'row'}}>
                        <core.ListItemIcon style={{minWidth:'0'}}>{item.icon}</core.ListItemIcon>
                        <core.ListItemText style={{color:'#000000', marginLeft:'16px', marginRight:'25px'}} primary={<core.Typography style={{fontSize:'15px'}}>{item.title}</core.Typography>} />   
                        <div>
                            {item.subMenu && subnav ? 
                            item.iconOpened: item.subMenu ? 
                            item.iconClosed:null}
                        </div>
                    </div>
                    
                </Link> 
                {subnav && item.subMenu.map((item, index)=>{
                    return (
                        <Link to={item.path} key={index} className='subItem'>
                            <div style={{display:'flex', flexDirection:'row'}}>
                                <core.ListItemIcon style={{minWidth:'0'}}>{item.icon}</core.ListItemIcon>
                                <core.ListItemText style={{marginLeft:'16px', marginRight:'25px'}} primary={<core.Typography style={{fontSize:'13px'}}>{item.title}</core.Typography>} />
                            </div>
                        </Link>
                    )    
                })}
            </core.ListItem>
        </>
    );
};


