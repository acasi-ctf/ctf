// import * as UI from '@material-ui/icons';
// import React, { useState, useEffect } from "react";
// import ReactMarkdown from 'react-markdown';
// import gfm from 'remark-gfm';
// import marked from 'marked';
// import fs from 'fs';

//**********************************************cipher challenge set*****************************************
import ltn from '../challenges/ciphers/challenges/letter-to-number/docs/Letter-to-Number.md';
import crypto from '../challenges/ciphers/challenges/letter-to-number/docs/1-Cryptography.md';

export const Challengedata = [
    {label: 'Challenge Description',  cName:'tab', 
    itembox1: ltn,
        // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
        //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
        // </p>, 
    },

    {label: 'Document 1',  cName:'tab', 
    itembox1:  crypto,
        // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
        //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
        // </p>, 
    },

]

