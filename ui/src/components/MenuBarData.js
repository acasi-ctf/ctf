import * as UI from '@material-ui/icons';


export const List1Data = [
    {title:'Home', path:'/', icon: <UI.Home/>, cName:'nav-text'},
    {title:'Leader Board', path:'/LeaderBoard', icon: <UI.Timeline/>, cName:'nav-text'},
    {title:'Challenge Selection', path:'/selection', icon:<UI.ViewCarousel/>, cName:'nav-text'}
]

export const SubList1 = [
    {
        title:'Challenge Set 1', 
        path:'#', //consider to this would make more sense
        icon: <UI.CollectionsBookmark/>, 
        cName:'nav-text',
        iconClosed: <UI.ArrowDropDown/>,
        iconOpened: <UI.ArrowDropUp/>,
        subMenu:[
            {
                title: 'Challenge 1',
                path: '/challenge_1',
                icon: <UI.Assignment/>
            },
            {
                title: 'Challenge 2',
                path: '/challenge_2',
                icon: <UI.Assignment/>
            },
            {
                title: 'Challenge 3',
                path: '/challenge_3',
                icon: <UI.Assignment/>
            }
        ]
    },
    {
        title:'Challenge Set 2', 
        path:'#', 
        icon: <UI.CollectionsBookmark/>, 
        cName:'nav-text',
        iconClosed: <UI.ArrowDropDown/>,
        iconOpened: <UI.ArrowDropUp/>,
        subMenu:[
            {
                title: 'Challenge 1',
                path: '/challenge_4',
                icon: <UI.Assignment/>
            },
            {
                title: 'Challenge 2',
                path: '/challenge_5',
                icon: <UI.Assignment/>
            },
            {
                title: 'Challenge 3',
                path: '/challenge_6',
                icon: <UI.Assignment/>
            }
        ]
    },
    {title:'Challenge Set 3', path:'#', icon: <UI.CollectionsBookmark/>, cName:'nav-text'},
]


