// import * as UI from "@material-ui/icons";
// import React, { useState, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import gfm from "remark-gfm";
// import marked from "marked";
// import fs from "fs";

//**********************************************cipher challenge set*****************************************
import ceasarcipher from "../challenges/ciphers/challenges/caesar-cipher/docs/Caesar-cipher.md";
import ltn from "../challenges/ciphers/challenges/caesar-cipher/docs/1-Cryptography.md";
import term from "../challenges/ciphers/challenges/caesar-cipher/docs/Terminal_Use.md";

export const ChallengeSet1Data = [
  {
    label: "Basic Terminal Commands",
    cName: "tab",
    itembox1: term,
  },

  {
    label: "Challenge Description",
    cName: "tab",
    itembox1: ceasarcipher,
    // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
    //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
    // </p>,
  },

  {
    label: "Cryptography",
    cName: "tab",
    itembox1: ltn,
    // <p style={{marginTop:'10px', marginLeft:'10px'}}  >
    //     {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown1} /> */}
    // </p>,
  },
];
