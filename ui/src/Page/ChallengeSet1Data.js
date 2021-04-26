import * as UI from '@material-ui/icons';
import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import marked from 'marked';
import fs from 'fs';

//**********************************************cipher challenge set*****************************************
//import '../../../challenges';// ceasar challenge
// import '../challenges/ciphers/challenges/letter-to-number/docs/Letter-to-Number.md';//letter to number challenge
//comprehensive-challenge
//morse-code challenge
//reverse-cipher challenge

export const ChallengeSet1Data = [
    {label: 'Introduction',  cName:'tab', 
    itembox1:  '../challenges/ciphers/challenges/letter-to-number/docs/Letter-to-Number.md',
        // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
        //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
        // </p>, 
    },//END ITEM 1

    
]

