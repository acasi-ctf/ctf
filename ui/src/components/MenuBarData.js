import * as UI from '@material-ui/icons';


export const List1Data = [
    {title:'Home', path:'/', icon: <UI.Home/>, cName:'nav-text'},
    {title:'Leader Board', path:'/LeaderBoard', icon: <UI.Timeline/>, cName:'nav-text'},
    {title:'Challenge Selection', path:'/selection', icon:<UI.ViewCarousel/>, cName:'nav-text'}
]

export const SubList1 = [
    {
        title:'Cipher', 
        path:'#', //consider to this would make more sense
        icon: <UI.CollectionsBookmark/>, 
        cName:'nav-text',
        iconClosed: <UI.ArrowDropDown/>,
        iconOpened: <UI.ArrowDropUp/>,
        subMenu:[
            {
                title: 'Caesar Cipher',
                path: '/caesar',
                icon: <UI.Assignment/>
            },
            {
                title: 'Letter To Number',
                path: '/letter-to-number',
                icon: <UI.Assignment/>
            },
            {
                title: 'Morse Code',
                path: '/morse-code',
                icon: <UI.Assignment/>
            },
            {
                title: 'Reverse Cipher',
                path: '/reverse-cipher',
                icon: <UI.Assignment/>
            },
            {
                title: 'Comprehensive Challenge',
                path: '/comprehensive-challenge',
                icon: <UI.Assignment/>
            }
        ]
    },
    {
        title:'Web-Based', 
        path:'#', 
        icon: <UI.CollectionsBookmark/>, 
        cName:'nav-text',
        iconClosed: <UI.ArrowDropDown/>,
        iconOpened: <UI.ArrowDropUp/>,
        subMenu:[
            {
                title: 'Directory Traversal',
                path: '/directory-traversal',
                icon: <UI.Assignment/>
            },
            {
                title: 'Web Structure',
                path: '/web-structure',
                icon: <UI.Assignment/>
            }
        ]
    },
]


