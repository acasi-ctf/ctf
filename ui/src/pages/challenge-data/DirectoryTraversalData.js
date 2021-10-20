// import * as UI from '@material-ui/icons';
// import React, { useState, useEffect } from "react";
// import ReactMarkdown from 'react-markdown';
// import gfm from 'remark-gfm';
// import marked from 'marked';
// import fs from 'fs';

//**********************************************cipher challenge set*****************************************
import dirtraverse from "../../challenges/web-based/challenges/directory-traversal/docs/DirTrav.md";
import dirtraverseDescription from "../../challenges/web-based/challenges/directory-traversal/docs/DirTravDescription.md";

export const Challengedata = [
  {
    label: "Challenge Description",
    cName: "tab",
    itembox1: dirtraverseDescription,
    // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
    //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
    // </p>,
  },
  {
    label: "Directory Traversal",
    cName: "tab",
    itembox1: dirtraverse,
    // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
    //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
    // </p>,
  },
];
