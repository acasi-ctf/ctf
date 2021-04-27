// import * as UI from '@material-ui/icons';
// import React, { useState, useEffect } from "react";
// import ReactMarkdown from 'react-markdown';
// import gfm from 'remark-gfm';
// import marked from 'marked';
// import fs from 'fs';

//**********************************************cipher challenge set*****************************************
import comprehensive from "../challenges/ciphers/challenges/comprehensive-challenge/docs/Mixed-Challenge-1.md";
import crypto from "../challenges/ciphers/challenges/comprehensive-challenge/docs/1-Cryptography.md";

export const Challengedata = [
  {
    label: "Challenge Description",
    cName: "tab",
    itembox1: comprehensive,
    // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
    //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
    // </p>,
  },
  {
    label: "Cryptography",
    cName: "tab",
    itembox1: crypto,
    // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
    //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
    // </p>,
  },
];
