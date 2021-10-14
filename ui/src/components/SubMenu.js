import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import * as core from '@material-ui/core';
import '../style/SubMenu.css';
import useFetchAuth from "../useFetchAuth";
import * as UI from '@material-ui/icons';
import { useGetAPI,useSetAPI } from '../APIContext';


const iconClosed = <UI.ArrowDropDown/>;
const iconOpened = <UI.ArrowDropUp/>;
const ChallengeSet_Icon = <UI.CollectionsBookmark/>;
const ChallengeIcon = <UI.Assignment/>;

export default function SubMenu(props) {
    const [subnav, setSubNav] = useState(false);
    const setAPI = useSetAPI();
    //set is each of the item in the list to challenge-set like cipher, web-based,...
    const set = props.listItem;

    const showSubmenu = (clickSub,title,slug) =>{
        //clickSub is to detect whether menu item is click or submenu item is clicked
        //clickSub = 0, menuItem is click, clickSub = 1, subMenu item is clicked
        if(clickSub){
            //submenu item 
            props.changeTitle(title);
            setAPI(props.path+"/"+set.slug+"/challenges/"+slug);
        }else{
            //menu item
            setSubNav(!subnav);
            if(data.length === 0){
                //items in list 1
                props.changeTitle(title);
            } else{
                //items in list 2                
            }
        }
    }

    //constructing the API path then fetch data from there
    const APIpath = props.path+"/"+set.slug+"/challenges";
    const { data, error, loading } = useFetchAuth(APIpath);
    return (
        <>
            <core.ListItem style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                <Link to={set.path?set.path:"."} style={{textDecoration:'none'}} onClick={()=>{showSubmenu(0, set.name,"")}} >
                    <div style={{display:'flex', flexDirection: 'row'}}>
                        <core.ListItemIcon style={{minWidth:'0'}}>{set.icon?set.icon:ChallengeSet_Icon}</core.ListItemIcon>
                        <core.ListItemText style={{color:'#000000', marginLeft:'16px', marginRight:'25px'}}
                        primary={<core.Typography style={{fontSize:'15px'}}>{set.name}</core.Typography>} />   
                        <div>
                            {(set.subMenu || data.length !==0) && subnav ? iconOpened:
                            ( set.subMenu || data.length !==0) ? iconClosed:
                            null}
                        </div>
                    </div>
                </Link> 
                {subnav && data.map((item)=>{
                    return (
                        <Link to={`/play/${set.slug}/${item.slug}`} key={item.id} className='subItem' onClick={()=>{showSubmenu(1, item.name, item.slug)}}>
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


