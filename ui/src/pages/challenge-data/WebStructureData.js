// import * as UI from '@material-ui/icons';
// import React, { useState, useEffect } from "react";
// import ReactMarkdown from 'react-markdown';
// import gfm from 'remark-gfm';
// import marked from 'marked';
// import fs from 'fs';

//**********************************************cipher challenge set*****************************************
import WebStructureDescript from '../../challenges/web-based/challenges/web-structure/docs/WebStructureDescript.md'
import BrowserTools from '../../challenges/web-based/challenges/web-structure/docs/BrowserTools.md';
import CSS from '../../challenges/web-based/challenges/web-structure/docs/CSS.md'
import HTML from '../../challenges/web-based/challenges/web-structure/docs/HTML.md'
import PHP from '../../challenges/web-based/challenges/web-structure/docs/PHP.md'



export const Challengedata = [
    {label: 'Challenge Description',  cName:'tab', 
    itembox1: WebStructureDescript,
        // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
        //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
        // </p>, 
    },
    {label: 'BrowserTools',  cName:'tab', 
    itembox1: BrowserTools,
        // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
        //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
        // </p>, 
    },
    {label: 'CSS',  cName:'tab', 
    itembox1: CSS,
        // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
        //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
        // </p>, 
    },
    {label: 'HTML',  cName:'tab', 
    itembox1: HTML,
        // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
        //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
        // </p>, 
    },
    {label: 'PHP',  cName:'tab', 
    itembox1: PHP,
        // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
        //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
        // </p>, 
    },
]

