// import * as UI from '@material-ui/icons';
// import React, { useState, useEffect } from "react";
// import ReactMarkdown from 'react-markdown';
// import gfm from 'remark-gfm';
// import marked from 'marked';
// import fs from 'fs';

//**********************************************cipher challenge set*****************************************
import reverse from "../challenges/ciphers/challenges/reverse-cipher/docs/Reverse.md";
import crypto from "../challenges/ciphers/challenges/reverse-cipher/docs/1-Cryptography.md";
import term from "../challenges/ciphers/challenges/caesar-cipher/docs/Terminal_Use.md";

export const Challengedata = [
  {
    label: "Basic Terminal Commands",
    cName: "tab",
    itembox1: term,
  },
  {
    label: "Challenge Description",
    cName: "tab",
    itembox1: reverse,
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
