import * as UI from '@material-ui/icons';

export const staticMenuData = [
    /*{name:'Home', path:'/', icon: <UI.Home/>, cName:'nav-text'},*/
    {name:'Leader Board', path:'/leaderboard', icon: <UI.Timeline/>, cName:'nav-text'},
    {name:'Challenge Selection', path:'/', icon:<UI.ViewCarousel/>, cName:'nav-text'},
    {name:'Upload Challenge Set', path:'/admin/upload', icon:<UI.Unarchive/>, cName:'nav-text', adminOnly: true},
]
